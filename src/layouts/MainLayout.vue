<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar class="q-my-md row items-center no-wrap q-px-md">
        <div class="col">
          <template v-if="mode === 'title'">
            <div class="text-h5 text-black oswald">
              {{ title }}
            </div>
          </template>

          <template v-else>
            <q-input
              rounded
              standout
              v-model="searchInput"
              bg-color="green-2"
              color="white"
              label="Найти..."
            >
              <template #prepend>
                <q-btn icon="menu" round flat />
              </template>
              <template #append>
                <q-btn icon="search" round flat />
              </template>
            </q-input>
          </template>
        </div>

        <div class="row no-wrap">
          <q-btn round flat class="text-black" icon="center_focus_strong" @click="startCamera" />

          <div v-if="stream" class="fixed-full" style="z-index: 9999; background: black">
            <video
              ref="videoPlayer"
              autoplay
              playsinline
              class="full-width full-height"
              style="object-fit: cover"
            ></video>

            <q-card v-if="arObject" flat bordered class="ar-detection-card rounded-borders">
              <q-card-section class="q-pa-sm">
                <div class="column">
                  <div class="text-subtitle1 oswald text-black text-weight-bold self-center">
                    ИИ нашел
                  </div>
                  <div class="text-body2 text-green-10 inter text-italic ar-wrap-text">
                    {{ arObject.kind || arObject.type || 'Объект распознан' }}
                  </div>
                  <div class="inter text-caption text-black ar-wrap-text">
                    Статус: {{ arObject.status || 'Требует уточнения' }}
                  </div>
                </div>

                <div class="row q-col-gutter-sm q-mt-xs">
                  <div class="col-6">
                    <q-list dense bordered class="fit bg-grey-2 rounded-borders">
                      <q-item class="q-px-sm">
                        <q-item-section>
                          <q-item-label class="text-caption oswald text-weight-bold text-black">
                            Категория
                          </q-item-label>
                          <q-item-label
                            class="text-body2 text-green-10 inter text-capitalize ar-wrap-text"
                          >
                            {{ arObject.type || 'Не определена' }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <div class="col-6">
                    <q-list dense bordered class="fit bg-grey-2 rounded-borders">
                      <q-item class="q-px-sm">
                        <q-item-section>
                          <q-item-label class="text-caption text-weight-bold oswald text-black">
                            Сканирование
                          </q-item-label>
                          <q-item-label class="text-caption inter text-black ar-wrap-text">
                            {{ lastScanAt || 'только что' }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>

                  <div class="col-12">
                    <q-list dense bordered class="bg-grey-2 rounded-borders">
                      <q-item class="q-px-sm">
                        <q-item-section>
                          <q-item-label class="text-caption text-weight-bold oswald text-black">
                            Описание
                          </q-item-label>
                          <q-item-label class="text-caption inter text-black ar-wrap-text">
                            {{ arObject.extra || 'Детали появятся после следующего сканирования.' }}
                          </q-item-label>
                          <q-item-label class="text-caption inter text-grey-8 ar-wrap-text">
                            Зона: {{ bboxSummary }}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </div>
              </q-card-section>

              <q-btn
                class="absolute-top-right q-ma-sm"
                flat
                round
                dense
                icon="close"
                @click="arObject = null"
              />
            </q-card>

            <canvas ref="canvas" style="display: none"></canvas>

            <div class="absolute-bottom full-width flex justify-center q-pb-xl">
              <q-btn
                round
                size="35px"
                color="white"
                text-color="black"
                icon="visibility"
                :loading="loading"
                @click="captureAndScan"
              >
                <template v-slot:loading>
                  <q-spinner-eye color="primary" />
                </template>
              </q-btn>
            </div>

            <q-btn
              round
              color="white"
              text-color="black"
              icon="arrow_back"
              class="absolute-top-left q-ma-md camera-close-btn"
              @click="stopCamera"
            />
          </div>
          <q-btn round flat class="text-black" icon="person" :to="{ name: 'profile' }" />
        </div>
      </q-toolbar>
    </q-header>

    <q-footer v-if="!stream" class="bg-white">
      <q-toolbar class="row justify-around">
        <q-btn round flat class="text-black" icon="map" :to="{ name: 'map' }" />
        <q-btn round flat class="text-black" icon="leaderboard" :to="{ name: 'leaderboard' }" />
        <q-btn round flat class="text-black" icon="checklist" :to="{ name: 'quests' }" />
        <q-btn round flat class="text-black" icon="settings" :to="{ name: 'profileSettings' }" />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToolbarStore } from 'src/stores/toolbar';
import { useScanPointsStore } from 'src/stores/scanPoints'; // Проверь: scanPoint или scanPoints?
import { storeToRefs } from 'pinia';
import axios from 'axios';

const toolbar = useToolbarStore();
const scanStore = useScanPointsStore();

const { mode, title } = storeToRefs(toolbar);

const searchInput = ref('');
const videoPlayer = ref<HTMLVideoElement | null>(null);
const stream = ref<MediaStream | null>(null);
const canvas = ref<HTMLCanvasElement | null>(null);
const arObject = ref<any>(null);
const loading = ref(false);

const SERVER_URL = 'https://prologue-tassel-august.ngrok-free.dev/scan';

const captureAndScan = async () => {
  if (!videoPlayer.value || !canvas.value) return;
  loading.value = true;

  try {
    const v = videoPlayer.value;
    const c = canvas.value;
    c.width = v.videoWidth;
    c.height = v.videoHeight;

    const ctx = c.getContext('2d');
    if (ctx) ctx.drawImage(v, 0, 0, c.width, c.height);

    c.toBlob(
      async (blob) => {
        if (!blob) {
          loading.value = false;
          return;
        }

        const formData = new FormData();
        formData.append('file', blob, 'image.jpg');

        try {
          const response = await axios.post(SERVER_URL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });

          if (response.data && response.data.bbox) {
            arObject.value = response.data;

            // Получаем геопозицию и сохраняем в стор
            // Получаем геопозицию и сохраняем в стор
            console.log('Запрос геолокации запущен...');

            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log('--- GPS ДАННЫЕ ПОЛУЧЕНЫ ---');
                console.log('Широта:', position.coords.latitude);
                console.log('Долгота:', position.coords.longitude);

                const newPoint = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                  type: response.data.type,
                  kind: response.data.kind,
                  extra: response.data.extra,
                  status: response.data.status,
                };

                console.log('Объект для сохранения:', newPoint);

                // Сохраняем в стор
                scanStore.addPoint(newPoint);

                console.log('Точка добавлена в стор. Всего точек:', scanStore.points.length);
                console.log('Текущий массив точек:', JSON.parse(JSON.stringify(scanStore.points)));
              },
              (geoErr) => {
                console.error('--- ОШИБКА GPS ---');
                switch (geoErr.code) {
                  case 1:
                    console.error('Пользователь запретил доступ к геолокации');
                    break;
                  case 2:
                    console.error('Позиция недоступна (проверьте GPS/сеть)');
                    break;
                  case 3:
                    console.error('Таймаут ожидания координат');
                    break;
                  default:
                    console.error('Неизвестная ошибка GPS:', geoErr.message);
                }
              },
              { enableHighAccuracy: true, timeout: 10000 }, // настройки для точности
            );
          } else {
            arObject.value = null;
          }
        } catch (axiosError) {
          console.error('Ошибка сервера или сети:', axiosError);
          arObject.value = null;
        } finally {
          loading.value = false; // Выключаем спиннер здесь
        }
      },
      'image/jpeg',
      0.7,
    );
  } catch (criticalError) {
    console.error('Критическая ошибка камеры:', criticalError);
    loading.value = false;
  }
};

const arStyle = computed(() => {
  if (!arObject.value || !arObject.value.bbox || arObject.value.bbox.length < 4) {
    return { display: 'none' };
  }
  const [y1, x1, y2, x2] = arObject.value.bbox;
  const left = ((x1 + x2) / 2) * 100;
  const top = ((y1 + y2) / 2) * 100;

  return {
    position: 'absolute',
    left: `${left}%`,
    top: `${top}%`,
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    transition: 'all 0.3s ease-out',
  };
});

const startCamera = async () => {
  try {
    const constraints = {
      video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } },
      audio: false,
    };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    stream.value = mediaStream;
    setTimeout(() => {
      if (videoPlayer.value) videoPlayer.value.srcObject = stream.value;
    }, 50);
  } catch (err) {
    console.error(err);
  }
};

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach((track) => track.stop());
    stream.value = null;
  }
};
</script>

<style scoped>
.ar-detection-card {
  position: absolute;
  top: calc(env(safe-area-inset-top, 0px) + 72px);
  left: 50%;
  z-index: 10000;
  width: calc(100vw - 24px);
  max-width: 360px;
  max-height: calc(100vh - 168px);
  overflow-y: auto;
  overflow-x: hidden;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(76, 175, 80, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22);
}

.ar-wrap-text {
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  line-height: 1.35;
}

.camera-close-btn {
  z-index: 10001;
}

@media (min-width: 600px) {
  .ar-detection-card {
    top: 16px;
    width: calc(100vw - 160px);
    max-width: 420px;
    max-height: calc(100vh - 96px);
  }
}

@media (max-height: 620px) {
  .ar-detection-card {
    top: calc(env(safe-area-inset-top, 0px) + 56px);
    max-height: calc(100vh - 132px);
  }
}

.ar-debug-pre {
  margin: 12px 0 0;
  white-space: pre-wrap;
  word-break: break-word;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.45;
}

.ar-anchor {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
}
.eco-card {
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  border: 2px solid #4caf50;
  overflow: hidden;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
}
.line-height-1 {
  line-height: 1;
}
.ar-pointer {
  width: 2px;
  height: 20px;
  background: #4caf50;
  margin-right: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
@keyframes pulse-border {
  0% {
    border-color: #4caf50;
  }
  50% {
    border-color: #81c784;
  }
  100% {
    border-color: #4caf50;
  }
}
</style>

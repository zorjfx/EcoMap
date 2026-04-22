<template>
  <q-layout>
    <q-page-container>
      <q-page class="column items-center">
        <q-img src="src/media/profilebg.png" style="height: 49vh">
          <q-card class="fit transparent column items-center q-pa-none">
            <q-toolbar class="row justify-between transparent">
              <div class="q-ma-none q-pa-none row justify-start">
                <q-btn icon="arrow_back" @click="goBack" rounded flat></q-btn>
                <q-btn icon="share" rounded flat></q-btn>
              </div>
              <q-btn icon="settings" rounded flat></q-btn>
            </q-toolbar>
            <q-icon name="account_circle" class="q-mb-md" size="9em"></q-icon>
            <q-input
              rounded
              standout
              disable
              v-model="changedUsername"
              bg-color="green-2"
              color="white"
              label-color="black"
              class="q-mb-sm"
              label="НевероятноеИмя"
              style="width: 60vw; max-width: 300px"
            >
            </q-input>
            <q-input
              v-model="changedBio"
              label="Обо мне..."
              label-color="white"
              class="q-mb-md"
              square
              standout
              disable
              style="width: 60vw; max-width: 300px"
            ></q-input>
            <p class="text-h6 oswald q-ma-none q-pa-none">474 балла</p>
          </q-card>
        </q-img>
        <q-card style="max-width: 85vw; border-radius: 16px" class="no-shadow q-mt-md bg-grey-3">
          <q-card-section style="width: 85vw">
            <p class="text-subtitle-1 inter q-mb-none">Уровень 14</p>
            <q-linear-progress :value="0.83" color="green" size="6px" track-color="white" rounded />
            <p class="text-subtitle-1 inter q-mb-none">Опыт: 12,450 / 15,000 XP</p>
          </q-card-section>
        </q-card>
        <q-card class="no-shadow bg-grey-3 q-mt-md" style="width: 85vw; border-radius: 16px">
          <q-card-section class="text-center q-mb-none">
            <h6 class="text-h6 oswald q-mt-none q-mb-none">Статистика</h6>
          </q-card-section>

          <q-card-section>
            <div class="row justify-evenly stats-row">
              <div class="column items-center text-center stats-item">
                <q-icon name="leaderboard" size="4em" />
                <p class="text-h6 stats-text">Место в рейтинге: №42</p>
              </div>

              <div class="column items-center text-center stats-item">
                <q-icon name="checklist" size="4em" />
                <p class="text-h6 stats-text">Квестов выполнено: 167</p>
              </div>

              <div class="column items-center text-center stats-item">
                <q-icon name="center_focus_strong" size="4em" />
                <p class="text-h6 stats-text">Оцифровано: 3.5к</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="school-card no-shadow bg-grey-3 q-mt-md">
          <q-card-section class="text-center q-mb-none">
            <h6 class="text-h6 oswald q-mt-none q-mb-none">Школа</h6>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row items-center no-wrap">
              <div class="school-icon-wrap flex flex-center">
                <q-icon name="school" size="40px" color="dark" />
              </div>

              <div class="column q-ml-md school-info">
                <div class="text-h6">Невероятная МБУ СОШ</div>

                <div class="row items-center q-mt-sm">
                  <q-icon name="leaderboard" size="42px" />
                  <div class="school-rank q-ml-sm text-h6">45</div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const changedUsername = ref();
const changedBio = ref();
const router = useRouter();

async function goBack() {
  if (window.history.length > 1) {
    router.back();
  } else {
    await router.replace('/map'); // fallback
  }
}
</script>

<style scoped>
.stats-row {
  flex-wrap: nowrap;
}

.stats-item {
  width: 30%;
}

.stats-text {
  margin-top: 8px;
  margin-bottom: 0;
  white-space: normal;
  word-break: break-word;
  line-height: 1.2;
}

.school-card {
  width: 85vw;
  border-radius: 16px;
}

.school-icon-wrap {
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: #eef4ef;
  flex-shrink: 0;
}

.school-info {
  min-width: 0;
}
</style>

<template>
  <q-page class="map-page">
    <div ref="mapEl" class="map">
      <transition name="slide-up">
        <q-card v-if="selectedTree" class="tree-card no-shadow">
          <q-card-section class="q-pa-md">
            <div class="column items-start no-wrap">
              <div class="column items-start justify-between">
                <div class="text-h5 oswald text-weight-bold">
                  {{ selectedTree.name }}
                </div>
                <div class="text-subtitle1 inter text-italic">({{ selectedTree.latinName }})</div>
              </div>
              <div class="column full-width">
                <div class="q-mt-sm inter text-subtitle1">
                  Состояние: {{ selectedTree.health }}%
                </div>

                <q-linear-progress
                  :value="selectedTree.health / 100"
                  color="positive"
                  track-color="grey-4"
                  rounded
                  size="10px"
                  class="q-mt-sm"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md q-mt-md">
              <div class="col-6">
                <q-card flat class="info-box bg-grey-2">
                  <q-card-section>
                    <div class="text-h6 oswald text-weight-bold">Эко-ценность</div>
                    <div class="text-h4 text-green-8 text-weight-bold">
                      +{{ selectedTree.points }} баллов
                    </div>
                  </q-card-section>
                </q-card>

                <q-card flat class="info-box bg-grey-2 q-mt-md">
                  <q-card-section>
                    <div class="text-h6 text-weight-bold oswald">Факт</div>
                    <div class="q-mt-sm inter">
                      {{ selectedTree.fact }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-6 full-height">
                <q-card flat class="info-box bg-grey-2">
                  <q-card-section>
                    <div class="inter">Координаты: 30.71°, 36.73°</div>
                    <div class="inter">Последнее сканирование: 19:39</div>
                  </q-card-section>
                </q-card>
                <q-img
                  :src="selectedTree.image"
                  height="210px"
                  class="rounded-borders q-ma-sm full-width"
                />
              </div>
            </div>
          </q-card-section>

          <q-btn
            class="absolute-top-right q-ma-sm"
            flat
            round
            dense
            icon="close"
            @click="selectedTree = null"
          />
        </q-card>
      </transition>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import type { FeatureCollection, Polygon } from 'geojson';
import L from 'leaflet';

type Tree = {
  id: number;
  name: string;
  latinName: string;
  health: number;
  points: number;
  lat: number;
  lng: number;
  image: string;
  fact: string;
};

const trees: Tree[] = [
  {
    id: 15,
    name: 'Береза повислая',
    latinName: 'Betula pendula',
    health: 80,
    points: 100,
    lat: 43.2393,
    lng: 76.8884,
    image: 'src/media/bereza.jpg',
    fact: 'Эта береза поглощает 20 кг CO₂ в год и увлажняет воздух для всего двора!',
  },
  {
    id: 16,
    name: 'Дуб черешчатый',
    latinName: 'Quercus robur',
    health: 72,
    points: 120,
    lat: 43.2398,
    lng: 76.8892,
    image: 'src/media/dub.jpg',
    fact: 'Дубы поддерживают биоразнообразие и живут десятки лет.',
  },
];

const mapEl = ref<HTMLElement | null>(null);
const selectedTree = ref<Tree | null>(null);

onMounted(async () => {
  await nextTick();

  if (!mapEl.value) return;

  const map = L.map(mapEl.value).setView([43.2389, 76.8897], 15);
  const treeIcon = L.icon({
    iconUrl: 'public/icons/tree.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
  }).addTo(map);

  const hexagons: FeatureCollection<Polygon> = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { color: '#67c587' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [76.8878, 43.2398],
              [76.8886, 43.2402],
              [76.8894, 43.2398],
              [76.8894, 43.239],
              [76.8886, 43.2386],
              [76.8878, 43.239],
              [76.8878, 43.2398],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { color: '#e7cf67' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [76.8894, 43.2398],
              [76.8902, 43.2402],
              [76.891, 43.2398],
              [76.891, 43.239],
              [76.8902, 43.2386],
              [76.8894, 43.239],
              [76.8894, 43.2398],
            ],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { color: '#df7b7b' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [76.891, 43.2398],
              [76.8918, 43.2402],
              [76.8926, 43.2398],
              [76.8926, 43.239],
              [76.8918, 43.2386],
              [76.891, 43.239],
              [76.891, 43.2398],
            ],
          ],
        },
      },
    ],
  };

  L.geoJSON(hexagons, {
    style: (feature) => ({
      color: feature?.properties.color,
      fillColor: feature?.properties.color,
      fillOpacity: 0.5,
      weight: 1.2,
    }),
  }).addTo(map);

  trees.forEach((tree) => {
    const marker = L.marker([tree.lat, tree.lng], { icon: treeIcon }).addTo(map);

    marker.on('click', () => {
      selectedTree.value = tree;
      console.log(selectedTree.value);
    });
  });

  setTimeout(() => {
    map.invalidateSize();
  }, 200);
});
</script>

<style scoped>
.map-page {
  width: 100%;
  height: 100vh;
  position: relative;
}

.map {
  width: 100%;
  height: 100%;
}

.tree-card {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  z-index: 1000;

  max-height: 85vh;
  overflow-y: auto;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.97);
}

.info-box {
  border-radius: 18px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

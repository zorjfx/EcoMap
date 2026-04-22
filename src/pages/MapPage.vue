<template>
  <q-page class="map-page">
    <div ref="mapEl" class="map"></div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import type { FeatureCollection, Polygon } from 'geojson';
import L from 'leaflet';

const mapEl = ref<HTMLElement | null>(null);

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

  L.marker([43.2393, 76.8884], { icon: treeIcon }).addTo(map);

  setTimeout(() => {
    map.invalidateSize();
  }, 200);
});
</script>

<style scoped>
.map-page {
  width: 100%;
  height: 100vh;
}

.map {
  width: 100%;
  height: 100%;
}
</style>

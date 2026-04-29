import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type ScanPoint = {
  id: number;
  lat: number;
  lng: number;
  type: 'растение' | 'мусор' | (string & {});
  kind: string;
  extra: string;
  status: string;
  earnedPoints: number;
};

type CreateScanPoint = Omit<ScanPoint, 'id' | 'earnedPoints'> & {
  earnedPoints?: number;
};

function getScanReward(scanText: string) {
  const normalizedType = scanText.trim().toLowerCase();

  if (
    normalizedType.includes('дерев') ||
    normalizedType.includes('растен') ||
    normalizedType.includes('tree') ||
    normalizedType.includes('plant')
  ) {
    return 100;
  }

  if (
    normalizedType.includes('мусор') ||
    normalizedType.includes('trash') ||
    normalizedType.includes('garbage') ||
    normalizedType.includes('waste')
  ) {
    return 50;
  }

  return 0;
}

export const useScanPointsStore = defineStore('scanPoints', () => {
  const points = ref<ScanPoint[]>([]);
  const totalPoints = computed(() =>
    points.value.reduce((sum, point) => sum + point.earnedPoints, 0),
  );

  function addPoint(point: CreateScanPoint) {
    points.value.push({
      ...point,
      id: Date.now(),
      earnedPoints: point.earnedPoints ?? getScanReward(`${point.type} ${point.kind}`),
    });
  }

  return { points, totalPoints, addPoint };
});

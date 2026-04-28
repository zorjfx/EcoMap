import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ScanPoint = {
  id: number;
  lat: number;
  lng: number;
  type: 'растение' | 'мусор' | (string & {});
  kind: string;
  extra: string;
  status: string;
};

export const useScanPointsStore = defineStore('scanPoints', () => {
  const points = ref<ScanPoint[]>([]);

  function addPoint(point: Omit<ScanPoint, 'id'>) {
    points.value.push({ ...point, id: Date.now() });
  }

  return { points, addPoint };
});

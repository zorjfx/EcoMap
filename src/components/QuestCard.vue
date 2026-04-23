<template>
  <q-card class="quest-card no-shadow">
    <div class="quest-image-wrap">
      <q-icon :name="iconData.icon" size="48px" :color="iconData.color" />
    </div>

    <div class="quest-content">
      <div class="quest-top row items-start no-wrap">
        <div class="quest-text-block">
          <div class="quest-title">{{ title }}</div>
          <div class="quest-description">{{ description }}</div>
        </div>

        <div class="quest-progress">
          {{ progress }}
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const QUEST_TYPES = {
  photo: {
    icon: 'photo_camera',
    color: 'yellow-7',
  },
  cleanup: {
    icon: 'warning',
    color: 'red-6',
  },
  restore: {
    icon: 'park',
    color: 'green-6',
  },
} as const;

const props = defineProps<{
  title: string;
  description: string;
  progress: string;
  type: keyof typeof QUEST_TYPES;
}>();

const iconData = computed(() => QUEST_TYPES[props.type]);
</script>

<style scoped>
.quest-card {
  display: flex;
  align-items: stretch;
  background: #d9d9d9;
  border-radius: 0;
  overflow: hidden;
  min-height: 110px;
}

.quest-image-wrap {
  width: 108px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.quest-image {
  width: 96px;
  height: 96px;
  object-fit: contain;
}

.quest-content {
  flex: 1;
  padding: 14px 14px 14px 6px;
  display: flex;
  align-items: center;
}

.quest-top {
  width: 100%;
  justify-content: space-between;
  gap: 12px;
}

.quest-text-block {
  min-width: 0;
}

.quest-title {
  font-size: 18px;
  font-weight: 800;
  line-height: 1.1;
  color: #111;
  text-transform: uppercase;
}

.quest-description {
  margin-top: 8px;
  font-size: 16px;
  line-height: 1.35;
  color: #444;
  font-weight: 600;
}

.quest-progress {
  flex-shrink: 0;
  align-self: center;
  font-size: 18px;
  font-weight: 700;
  color: #111;
}
</style>

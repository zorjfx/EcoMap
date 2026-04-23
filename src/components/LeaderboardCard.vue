<template>
  <q-card class="leaderboard-card no-shadow">
    <div class="place-block flex flex-center">
      {{ place }}
    </div>

    <div class="card-content row items-center no-wrap">
      <q-avatar size="64px" class="avatar-block">
        <img v-if="avatar" :src="avatar" alt="avatar" />
        <q-icon v-else :name="avatarIcon" size="36px" />
      </q-avatar>

      <div class="info-block">
        <div class="title-text oswald">{{ title }}</div>
        <div class="points-text">{{ points }} баллов</div>

        <div class="meta-row row items-center no-wrap">
          <q-icon name="park" size="16px" class="q-mr-xs" />
          <span>Всего деревьев: {{ trees }}</span>
        </div>

        <div class="meta-row row items-center no-wrap">
          <q-icon name="check_circle_outline" size="16px" class="q-mr-xs" />
          <span>Оцифровано: {{ digitized }}</span>
        </div>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    place: number;
    title: string;
    points: number | string;
    trees: number | string;
    digitized: number | string;
    avatar?: string;
    avatarIcon?: string;
  }>(),
  {
    avatar: '',
    avatarIcon: 'person',
  },
);
</script>

<style scoped>
.leaderboard-card {
  display: flex;
  align-items: stretch;
  width: 100%;
  min-height: 120px;
  border-radius: 22px;
  overflow: hidden;
  background: #f5f5f5;
}

.place-block {
  width: 82px;
  background: #4e8a86;
  color: white;
  font-size: 42px;
  font-weight: 700;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
  min-width: 0;
  padding: 14px 16px;
}

.avatar-block {
  flex-shrink: 0;
  background: white;
  margin-right: 14px;
}

.info-block {
  min-width: 0;
}

.title-text {
  font-size: 18px;
  font-weight: 700;
  line-height: 1.15;
  color: #1f1f1f;
  word-break: break-word;
}

.points-text {
  font-size: 16px;
  line-height: 1.2;
  color: #2e2e2e;
  margin-top: 2px;
}

.meta-row {
  font-size: 14px;
  line-height: 1.2;
  color: #3a3a3a;
  margin-top: 2px;
}
</style>

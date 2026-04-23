<template>
  <q-page class="full-height q-px-md q-pt-md">
    <div class="row items-center no-wrap q-col-gutter-sm">
      <div class="col">
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
      </div>

      <q-btn flat round icon="filter_alt" size="1.5em" class="text-black" />
    </div>

    <div class="column q-gutter-lg q-mt-lg">
      <QuestCard
        v-for="quest in quests"
        :key="quest.id"
        :title="quest.title"
        :description="quest.description"
        :progress="quest.progress"
        :type="quest.type"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useToolbarStore } from 'src/stores/toolbar';
import QuestCard from 'src/components/QuestCard.vue';

const toolbar = useToolbarStore();
const searchInput = ref('');
type QuestType = 'photo' | 'cleanup' | 'restore';
type Quest = {
  id: number;
  title: string;
  description: string;
  progress: string;
  type: QuestType;
};

onMounted(() => {
  toolbar.setTitle('Квесты');
});

onUnmounted(() => {
  toolbar.setSearch();
});

const quests: Quest[] = [
  {
    id: 1,
    title: 'ФОТООХОТА',
    description: 'Оцифруй 5 лип.',
    progress: '0/5',
    type: 'photo',
  },
  {
    id: 2,
    title: 'ОХРАНА ПРИРОДЫ',
    description: 'Найди и убери 5 объектов класса “мусор”.',
    progress: '0/5',
    type: 'cleanup',
  },
  {
    id: 3,
    title: 'ЭКО-РЕСТАВРАЦИЯ',
    description: 'Обнови состояние у 5 деревьев.',
    progress: '0/5',
    type: 'restore',
  },
];
</script>

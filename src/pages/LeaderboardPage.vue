<template>
  <q-page class="bg-grey-2">
    <q-tabs
      v-model="tab"
      dense
      indicator-color="green-7"
      active-color="green-8"
      no-caps
      class="bg-green-2"
    >
      <q-tab name="schools" label="Школа" />
      <q-tab name="users" label="Общий" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated class="bg-transparent">
      <q-tab-panel name="schools">
        <div class="column q-gutter-md">
          <LeaderboardCard
            v-for="school in schools"
            :key="school.id"
            :place="school.place"
            :title="school.title"
            :points="school.points"
            :trees="school.trees"
            :digitized="school.digitized"
            avatar-icon="school"
          />
        </div>
      </q-tab-panel>

      <q-tab-panel name="users">
        <div class="column q-gutter-md">
          <LeaderboardCard
            v-for="user in users"
            :key="user.id"
            :place="user.place"
            :title="user.title"
            :points="user.points"
            :trees="user.trees"
            :digitized="user.digitized"
            avatar-icon="person"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useToolbarStore } from 'src/stores/toolbar';
import LeaderboardCard from 'src/components/LeaderboardCard.vue';

const toolbar = useToolbarStore();
const tab = ref<'schools' | 'users'>('schools');

function updateToolbarTitle(value: 'schools' | 'users') {
  if (value === 'schools') {
    toolbar.setTitle('Рейтинг среди\nшкол');
  } else {
    toolbar.setTitle('Рейтинг среди\nпользователей');
  }
}

const schools = [
  {
    id: 1,
    place: 1,
    title: 'Школа №48',
    points: 12200,
    trees: 1250,
    digitized: 980,
    avatar: '/images/school-logo.png',
  },
  {
    id: 2,
    place: 2,
    title: 'Школа №49',
    points: 12300,
    trees: 12343,
    digitized: 3000,
    avatar: '/images/school-logo.png',
  },
];

const users = [
  {
    id: 1,
    place: 1,
    title: 'User 818',
    points: 12300,
    trees: 12343,
    digitized: 3000,
    avatar: '/images/user1.png',
  },
  {
    id: 2,
    place: 2,
    title: 'User 616',
    points: 12100,
    trees: 12000,
    digitized: 3000,
    avatar: '/images/user2.png',
  },
];

onMounted(() => {
  updateToolbarTitle(tab.value);
});

watch(tab, (newTab) => {
  updateToolbarTitle(newTab);
});

onUnmounted(() => {
  toolbar.setSearch();
});
</script>

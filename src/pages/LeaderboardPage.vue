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
// import { leaderboardApi } from 'src/api/leaderboardAPI';

type LeaderboardCardItem = {
  id: string;
  place: number;
  title: string;
  points: number;
  trees: number;
  digitized: number;
};

const toolbar = useToolbarStore();
const tab = ref<'schools' | 'users'>('users');

const schools = ref<LeaderboardCardItem[]>([
  {
    id: '1',
    place: 1,
    title: 'НИШ ФМН',
    points: 12450,
    trees: 386,
    digitized: 1720,
  },
  {
    id: '2',
    place: 2,
    title: 'РФМШ',
    points: 11780,
    trees: 351,
    digitized: 1584,
  },
  {
    id: '3',
    place: 3,
    title: 'KTL',
    points: 10320,
    trees: 294,
    digitized: 1367,
  },
  {
    id: '4',
    place: 4,
    title: 'Haileybury Almaty',
    points: 9620,
    trees: 267,
    digitized: 1198,
  },
  {
    id: '5',
    place: 5,
    title: 'Мирас',
    points: 8810,
    trees: 231,
    digitized: 1042,
  },
  {
    id: '6',
    place: 6,
    title: 'KIMEP School',
    points: 7940,
    trees: 198,
    digitized: 917,
  },
  {
    id: '7',
    place: 7,
    title: 'Spectrum International',
    points: 7310,
    trees: 176,
    digitized: 804,
  },
  {
    id: '8',
    place: 8,
    title: 'Школа-гимназия №25',
    points: 6580,
    trees: 149,
    digitized: 690,
  },
]);
const users = ref<LeaderboardCardItem[]>([
  {
    id: 'u1',
    place: 1,
    title: 'Islam',
    points: 4280,
    trees: 132,
    digitized: 587,
  },
  {
    id: 'u2',
    place: 2,
    title: 'Aruzhan',
    points: 4015,
    trees: 124,
    digitized: 553,
  },
  {
    id: 'u3',
    place: 3,
    title: 'Dias',
    points: 3890,
    trees: 118,
    digitized: 521,
  },
  {
    id: 'u4',
    place: 4,
    title: 'Madina',
    points: 3625,
    trees: 109,
    digitized: 476,
  },
  {
    id: 'u5',
    place: 5,
    title: 'Alikhan',
    points: 3470,
    trees: 101,
    digitized: 441,
  },
  {
    id: 'u6',
    place: 6,
    title: 'Amina',
    points: 3280,
    trees: 94,
    digitized: 407,
  },
  {
    id: 'u7',
    place: 7,
    title: 'Nursultan',
    points: 3010,
    trees: 86,
    digitized: 365,
  },
  {
    id: 'u8',
    place: 8,
    title: 'Tomiris',
    points: 2875,
    trees: 79,
    digitized: 338,
  },
  {
    id: 'u9',
    place: 9,
    title: 'Daniyar',
    points: 2640,
    trees: 71,
    digitized: 296,
  },
  {
    id: 'u10',
    place: 10,
    title: 'Ayana',
    points: 2435,
    trees: 64,
    digitized: 271,
  },
]);

// const loading = ref(false);
// const errorMessage = ref('');

function updateToolbarTitle(value: 'schools' | 'users') {
  if (value === 'schools') {
    toolbar.setTitle('Рейтинг среди\nшкол');
  } else {
    toolbar.setTitle('Рейтинг среди\nпользователей');
  }
}

// async function loadUsersLeaderboard() {
//   loading.value = true;
//   errorMessage.value = '';

//   try {
//     const data = await leaderboardApi.getTop();
//     console.log(data);

//     users.value = data.map((user) => ({
//       id: user.id,
//       place: user.rank_position,
//       title: user.username,
//       points: user.xp,
//       trees: user.quests_completed,
//       digitized: user.objects_count,
//     }));
//   } catch (err) {
//     console.error('Ошибка загрузки рейтинга пользователей:', err);
//     errorMessage.value = 'Не удалось загрузить рейтинг';
//   } finally {
//     loading.value = false;
//   }
// }

onMounted(() => {
  updateToolbarTitle(tab.value);
  // await loadUsersLeaderboard();
});

watch(tab, (newTab) => {
  updateToolbarTitle(newTab);

  // if (newTab === 'users' && users.value.length === 0) {
  //   void loadUsersLeaderboard();
  // }
});

onUnmounted(() => {
  toolbar.setSearch();
});
</script>

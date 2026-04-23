<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar class="q-my-md row items-center no-wrap q-px-md">
        <div class="col">
          <template v-if="mode === 'title'">
            <div class="text-h5 text-black oswald">
              {{ title }}
            </div>
          </template>

          <template v-else>
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
          </template>
        </div>

        <div class="row no-wrap">
          <q-btn round flat class="text-black" icon="center_focus_strong" />
          <q-btn round flat class="text-black" icon="person" :to="{ name: 'profile' }" />
        </div>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white">
      <q-toolbar class="row justify-around">
        <q-btn round flat class="text-black" icon="map" :to="{ name: 'map' }" />
        <q-btn round flat class="text-black" icon="leaderboard" :to="{ name: 'leaderboard' }" />
        <q-btn round flat class="text-black" icon="checklist" :to="{ name: 'quests' }" />
        <q-btn round flat class="text-black" icon="settings" :to="{ name: 'profileSettings' }" />
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToolbarStore } from 'src/stores/toolbar';
import { storeToRefs } from 'pinia';

const searchInput = ref('');
const toolbar = useToolbarStore();
const { mode, title } = storeToRefs(toolbar);
</script>

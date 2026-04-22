<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white">
      <q-toolbar class="q-my-md row justify-around">
        <slot name="toolbar-title">
          <q-input
            rounded
            standout
            v-model="searchInput"
            bg-color="green-2"
            color="white"
            label="Найти..."
          >
            <template v-slot:prepend>
              <q-btn icon="menu" round flat></q-btn>
            </template>
            <template v-slot:append>
              <q-btn icon="search" round flat></q-btn>
            </template>
          </q-input>
        </slot>
        <div class="row">
          <q-btn round flat class="text-black" icon="center_focus_strong"></q-btn>
          <q-btn round flat class="text-black" icon="person" :to="{ name: 'profile' }"></q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-footer class="bg-white">
      <q-toolbar class="row justify-around">
        <q-btn round flat class="text-black" icon="map" :to="{ name: 'map' }"></q-btn>
        <q-btn
          round
          flat
          class="text-black"
          icon="leaderboard"
          :to="{ name: 'leaderboard' }"
        ></q-btn>
        <q-btn round flat class="text-black" icon="checklist" :to="{ name: 'quests' }"></q-btn>
        <q-btn
          round
          flat
          class="text-black"
          icon="settings"
          :to="{ name: 'profileSettings' }"
        ></q-btn>
      </q-toolbar>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchInput = ref();
</script>

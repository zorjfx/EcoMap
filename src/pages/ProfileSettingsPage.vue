<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white row flex-center">
      <q-toolbar class="q-my-md row text-center">
        <q-toolbar-title class="text-black oswald text-h5"> Настройки </q-toolbar-title>
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
      <q-page>
        <q-card class="bg-grey-5 self-center q-mb-lg no-shadow">
          <q-card-section class="q-pa-md column">
            <h5 class="text-black text-h5 oswald q-mt-sm q-mb-md self-center">Профиль</h5>
            <p class="text-h6 inter">Имя</p>
            <q-input v-model="changedUsername" standout="bg-white text-black" rounded>
              <template v-slot:append>
                <q-btn icon="edit" rounded flat></q-btn>
              </template>
            </q-input>
            <p class="text-h6 inter q-mt-md">Описание</p>
            <q-input v-model="changedUsername" standout="bg-white text-black" rounded>
              <template v-slot:append>
                <q-btn icon="edit" rounded flat></q-btn>
              </template>
            </q-input>
            <p class="text-h6 inter q-mt-md">Школа</p>
            <q-input v-model="changedUsername" standout="bg-white text-black" rounded>
              <template v-slot:append>
                <q-btn icon="menu" rounded flat></q-btn>
              </template>
            </q-input>
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-5 self-center q-mb-lg no-shadow">
          <q-card-section class="q-pa-md column">
            <h5 class="text-black text-h5 oswald q-mt-sm q-mb-md self-center">Аккаунт</h5>
            <p class="text-h6 inter">Почта</p>
            <q-input v-model="changedUsername" standout="bg-white text-black" rounded>
              <template v-slot:append>
                <q-btn icon="edit" rounded flat></q-btn>
              </template>
            </q-input>
            <p class="text-h6 inter q-mt-md">Пароль</p>
            <q-input v-model="changedUsername" standout="bg-white text-black" rounded>
              <template v-slot:append>
                <q-btn icon="edit" rounded flat></q-btn>
              </template>
            </q-input>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const changedUsername = ref();
</script>

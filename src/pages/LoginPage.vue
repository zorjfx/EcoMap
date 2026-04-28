<template>
  <q-layout>
    <q-page-container>
      <q-page class="column items-center">
        <q-img src="src/media/logo.png" style="height: 230px; max-width: 230px"></q-img>
        <h5 class="text-h5 q-mb-xs q-mt-lg text-black oswald">Добро пожаловать в EcoMap!</h5>
        <p class="q-mb-none text-subtitle2 text-black oswald" style="font-weight: 400">
          Войдите в свой аккаунт
        </p>
        <form class="q-my-lg column">
          <p class="text-subtitle2 no-margin text-black oswald" style="font-weight: 400">
            Почта или имя пользователя
          </p>
          <q-input
            class="q-mx-sm q-mt-sm q-mb-lg"
            style="border-color: rgb(133, 133, 133)"
            standout="bg-green-4 text-white"
            rounded
            v-model="userName"
            placeholder="example@gmail.com"
          ></q-input>
          <p class="text-subtitle2 no-margin text-black oswald" style="font-weight: 400">Пароль</p>
          <q-input
            class="q-ma-sm"
            standout="bg-green-4 text-white"
            rounded
            v-model="userPassword"
            placeholder="........."
            :type="isPasswordVisible ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPasswordVisible = !isPasswordVisible"
              />
            </template>
          </q-input>
          <div class="fit row wrap justify-between items-start content-start q-my-md">
            <q-checkbox
              v-model="rememberUser"
              label="Запомнить меня"
              class="text-black oswald"
              color="green-8"
            />
            <q-btn flat no-caps class="oswald" color="green-8">Забыли пароль?</q-btn>
          </div>
          <q-btn
            no-caps
            color="green-10"
            class="self-center oswald"
            style="width: 60vw"
            @click="onLogin()"
            >Войти</q-btn
          >
          <q-dialog v-model="isError">
            <q-card>
              <q-card-section>
                <div class="text-h6 public-sans">Что-то пошло не так...</div>
              </q-card-section>

              <q-card-section class="q-pt-none public-sans">
                {{ errorMessage }}
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary public-sans" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </form>
        <div class="row flex-center text-center">
          <p class="text-subtitle1 text-black oswald self-center public-sans">Ещё нет аккаунта?</p>
          <q-btn
            flat
            no-caps
            to="/register"
            class="self-center oswald text-subtitle1 text-center"
            color="green-8"
            >Создать аккаунт</q-btn
          >
        </div>
        <!-- <div class="row flex-center">
          <div class="col">
            <q-separator inset />
          </div>
          <div class="col text-center text-blue-grey-2 text-subtitle1 public-sans">Настройки</div>
          <div class="col">
            <q-separator inset />
          </div>
        </div>
        <div class="self-center space evenly text-blue-grey-2">
          <q-btn flat round class="q-mx-xs" style="font-size: 1em" icon="translate">
            <q-menu
              anchor="bottom end"
              self="top end"
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-list>
                <q-item clickable>
                  <q-item-section>English</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Русский</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Қазақ тілі</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn flat round class="q-mx-xs" style="font-size: 1em" icon="contrast">
            <q-menu
              anchor="bottom start"
              self="top start"
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <q-list>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="light_mode"></q-icon>
                  </q-item-section>
                  <q-item-section>Светлая тема</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="dark_mode"></q-icon>
                  </q-item-section>
                  <q-item-section>Темная тема</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon name="devices"></q-icon>
                  </q-item-section>
                  <q-item-section>Синхронизировать</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const userName = ref();
const userPassword = ref();
const rememberUser = ref();
// const isDataValid = ref(true)
const isPasswordVisible = ref(true);
const errorMessage = ref('');
const router = useRouter();
const isError = ref(false);
const authStore = useAuthStore();

import axios from 'axios';
import { authService } from 'src/api/authAPI';

async function onLogin() {
  errorMessage.value = '';
  isError.value = false;

  if (!userName.value || !userPassword.value) {
    errorMessage.value = 'Введите почту и пароль';
    isError.value = true;
    return;
  }

  try {
    const res = await authService.signIn(userName.value, userPassword.value);

    authStore.setAuth({
      accessToken: res.access_token,
      user: res.user,
    });

    await router.replace({ name: 'map' });
  } catch (err: unknown) {
    console.error(err);

    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
      errorMessage.value =
        err.response?.data?.error_description || err.response?.data?.error || 'Ошибка входа';
    } else if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = 'Неизвестная ошибка';
    }

    isError.value = true;
  }
}
</script>

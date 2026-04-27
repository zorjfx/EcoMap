<template>
  <q-layout>
    <q-page-container>
      <q-page class="column items-center">
        <q-img src="src/media/logo.png" style="height: 230px; max-width: 230px"></q-img>
        <h5 class="text-h5 q-mb-xs q-mt-lg text-black oswald">Добро пожаловать в EcoMap!</h5>
        <p class="q-mb-none text-subtitle2 text-black oswald" style="font-weight: 400">
          Создайте аккаунт
        </p>
        <form class="q-my-lg column">
          <p class="text-subtitle2 no-margin text-black oswald" style="font-weight: 400">Почта</p>
          <q-input
            class="q-ma-sm"
            style="border-color: rgb(133, 133, 133)"
            standout="bg-green-4 text-white"
            rounded
            v-model="userName"
            placeholder="example@gmail.com"
          ></q-input>
          <p class="text-subtitle2 no-margin text-black oswald" style="font-weight: 400">
            Имя пользователя
          </p>
          <q-input
            class="q-ma-sm"
            style="border-color: rgb(133, 133, 133)"
            standout="bg-green-4 text-white"
            rounded
            v-model="userName"
            placeholder="Имя пользователя"
          ></q-input>
          <p class="text-subtitle2 no-margin text-black oswald" style="font-weight: 400">Школа</p>
          <q-input
            class="q-ma-sm"
            style="border-color: rgb(133, 133, 133)"
            standout="bg-green-4 text-white"
            rounded
            v-model="userName"
            placeholder="Выберите из списка"
          >
            <template #append> <q-btn icon="menu" round flat /> </template
          ></q-input>
          <p class="text-subtitle2 q-ma-none text-black oswald" style="font-weight: 400">Пароль</p>
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
          <q-btn
            no-caps
            color="green-10"
            class="self-center oswald q-mt-lg"
            style="width: 60vw"
            @click="onLogin()"
            >Зарегистрироваться</q-btn
          >
          <q-dialog v-model="isError">
            <q-card>
              <q-card-section>
                <div class="text-h6 public-sans">Something went wrong...</div>
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
          <p class="text-subtitle1 text-black oswald self-center public-sans">Уже есть аккаунт?</p>
          <q-btn flat no-caps class="self-center oswald text-subtitle1 text-center" color="green-8"
            >Войти в аккаунт</q-btn
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
// const isDataValid = ref(true)
const isPasswordVisible = ref(true);
const errorMessage = ref('');
const router = useRouter();
const isError = ref(false);
const authStore = useAuthStore();

async function onLogin() {
  await router.replace('/');
  authStore.login();
}
</script>

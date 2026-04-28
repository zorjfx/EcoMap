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
            v-model="userEmail"
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
            v-model="userSchool"
            placeholder="Выберите из списка"
          >
            <template #append>
              <q-btn icon="menu" round flat>
                <q-menu
                  anchor="bottom end"
                  self="top end"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  @show="loadSchools"
                >
                  <q-list style="min-width: 200px">
                    <q-item
                      v-for="school in schools"
                      :key="school.id"
                      clickable
                      @click="selectSchool(school)"
                    >
                      <q-item-section>
                        {{ school.name }}
                      </q-item-section>
                    </q-item>

                    <q-item v-if="schools.length === 0">
                      <q-item-section>Загрузка...</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </template></q-input
          >
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
            @click="onRegister()"
            >Зарегистрироваться</q-btn
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
                <q-btn flat label="OK" color="green-6 public-sans" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </form>
        <div class="row flex-center text-center">
          <p class="text-subtitle1 text-black oswald self-center public-sans">Уже есть аккаунт?</p>
          <q-btn
            flat
            no-caps
            to="login"
            class="self-center oswald text-subtitle1 text-center"
            color="green-8"
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
import { schoolsApi, type School } from 'src/api/schoolsAPI';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from 'src/api/authAPI';
import axios from 'axios';

const userName = ref();
const userPassword = ref();
const userEmail = ref();
const userSchool = ref();
const selectedSchoolId = ref<string | null>(null);
// const isDataValid = ref(true)
const isPasswordVisible = ref(true);
const errorMessage = ref('');
const router = useRouter();
const isError = ref(false);
const authStore = useAuthStore();
const schools = ref<School[]>([]);
const isLoaded = ref(false);

const loadSchools = async () => {
  if (isLoaded.value) return;

  try {
    schools.value = await schoolsApi.getAll();
    isLoaded.value = true;
  } catch (e) {
    console.error('Ошибка загрузки школ', e);
  }
};

const selectSchool = (school: School) => {
  userSchool.value = school.name;
  selectedSchoolId.value = school.id;
};

async function onRegister() {
  errorMessage.value = '';
  isError.value = false;

  if (!userName.value || !userEmail.value || !userPassword.value || !selectedSchoolId.value) {
    errorMessage.value = 'Заполните все поля';
    isError.value = true;
    return;
  }

  if (userPassword.value.length < 6) {
    errorMessage.value = 'Пароль минимум 6 символов';
    isError.value = true;
    return;
  }

  try {
    const res = await authService.signUp({
      email: userEmail.value,
      password: userPassword.value,
      username: userName.value,
      school_id: selectedSchoolId.value,
    });

    console.log(res);

    authStore.setAuth({
      accessToken: res.access_token,
      user: res.user,
    });

    await router.replace({ name: 'map' });
  } catch (err: unknown) {
    console.error(err);

    if (axios.isAxiosError(err)) {
      errorMessage.value =
        err.response?.data?.error_description || err.response?.data?.error || 'Ошибка регистрации';
    } else if (err instanceof Error) {
      errorMessage.value = err.message;
    } else {
      errorMessage.value = 'Неизвестная ошибка';
    }

    isError.value = true;
  }
}
</script>

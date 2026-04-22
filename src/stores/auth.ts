import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: false,
  }),
  getters: {
    isAuth: (state) => state.token,
  },
  actions: {
    login() {
      this.token = true;
    },
    logout() {
      this.$reset();
    },
  },
});

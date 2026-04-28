import { defineStore } from 'pinia';

type User = {
  id: string;
  email: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
    user: null as User | null,
  }),

  getters: {
    isAuth: (state) => !!state.accessToken,
  },

  actions: {
    setAuth(data: { accessToken: string; user: User }) {
      this.accessToken = data.accessToken;
      this.user = data.user;

      localStorage.setItem('access_token', data.accessToken);
    },

    restore() {
      const token = localStorage.getItem('access_token');

      if (token) {
        this.accessToken = token;
      } else {
        this.logout();
      }
    },

    logout() {
      this.accessToken = '';
      this.user = null;
      localStorage.removeItem('access_token');
    },
  },
});

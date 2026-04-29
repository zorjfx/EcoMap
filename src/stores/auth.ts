import { defineStore } from 'pinia';

type User = {
  id: string;
  email?: string;
  username?: string;
  school?: string;
  schoolId?: string;
  user_metadata?: UserMetadata;
};

type UserMetadata = {
  username?: string;
  school?: string;
  school_id?: string;
  schoolId?: string;
};

const ACCESS_TOKEN_KEY = 'access_token';
const AUTH_USER_KEY = 'auth_user';

function normalizeUser(user: User): User {
  const metadata = user.user_metadata ?? {};

  return {
    id: user.id,
    email: user.email ?? '',
    username: user.username ?? metadata.username ?? '',
    school: user.school ?? metadata.school ?? '',
    schoolId: user.schoolId ?? metadata.schoolId ?? metadata.school_id ?? '',
  };
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: '' as string,
    user: null as User | null,
    username: '' as string,
    email: '' as string,
    school: '' as string,
  }),

  getters: {
    isAuth: (state) => !!state.accessToken,
  },

  actions: {
    setAuth(data: { accessToken: string; user: User }) {
      this.accessToken = data.accessToken;
      this.setUser(data.user);

      localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    },

    setUser(user: User) {
      const normalizedUser = normalizeUser(user);

      this.user = normalizedUser;
      this.username = normalizedUser.username ?? '';
      this.email = normalizedUser.email ?? '';
      this.school = normalizedUser.school ?? '';

      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(normalizedUser));
    },

    restore() {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (token) {
        this.accessToken = token;
        const storedUser = localStorage.getItem(AUTH_USER_KEY);

        if (storedUser) {
          try {
            this.setUser(JSON.parse(storedUser) as User);
          } catch (error) {
            console.error('Ошибка восстановления пользователя', error);
            localStorage.removeItem(AUTH_USER_KEY);
          }
        }
      } else {
        this.logout();
      }
    },

    logout() {
      this.accessToken = '';
      this.user = null;
      this.username = '';
      this.email = '';
      this.school = '';
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    },
  },
});

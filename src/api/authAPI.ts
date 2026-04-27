import axios from 'axios';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const authApi = axios.create({
  baseURL: `${SUPABASE_URL}/auth/v1`,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  },
});

export type SignUpPayload = {
  email: string;
  password: string;
  username: string;
  school_id: string;
};

export const authService = {
  async signUp(payload: SignUpPayload) {
    const { data } = await authApi.post('/signup', {
      email: payload.email,
      password: payload.password,
      data: {
        username: payload.username,
        school_id: payload.school_id,
      },
    });

    return data;
  },

  async signIn(email: string, password: string) {
    const { data } = await authApi.post('/token?grant_type=password', {
      email,
      password,
    });

    return data;
  },

  async getUser(accessToken: string) {
    const { data } = await axios.get(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        apikey: SUPABASE_ANON_KEY,
      },
    });

    return data;
  },

  async logout(accessToken: string) {
    await axios.post(
      `${SUPABASE_URL}/auth/v1/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apikey: SUPABASE_ANON_KEY,
        },
      },
    );
  },
};

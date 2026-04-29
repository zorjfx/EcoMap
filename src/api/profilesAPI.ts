import { supabaseApi } from './supabaseAPI';

export type Profile = {
  id: string;
  username: string;
  school_id: string;
  xp?: number;
};

export type CreateProfilePayload = {
  id: string;
  username: string;
  school_id: string;
};

export const profilesApi = {
  async getById(id: string) {
    const { data } = await supabaseApi.get<Profile[]>('/profiles', {
      params: {
        select: '*',
        id: `eq.${id}`,
      },
    });

    return data[0] ?? null;
  },

  async create(payload: CreateProfilePayload, accessToken: string) {
    const { data } = await supabaseApi.post<Profile[]>('/profiles', payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Prefer: 'return=representation',
      },
    });

    return data[0];
  },

  async update(id: string, payload: Partial<Profile>, accessToken: string) {
    const { data } = await supabaseApi.patch<Profile[]>('/profiles', payload, {
      params: {
        id: `eq.${id}`,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Prefer: 'return=representation',
      },
    });

    return data[0];
  },
};

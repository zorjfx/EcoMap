import { supabaseApi } from './supabaseAPI';

export type LeaderboardRow = {
  id: string;
  username: string;
  xp: number;
  objects_count: number;
  quests_completed: number;
  rank_position: number;
};

export const leaderboardApi = {
  async getAll() {
    const { data } = await supabaseApi.get<LeaderboardRow[]>('/leaderboard', {
      params: {
        select: '*',
        order: 'rank_position.asc',
      },
    });

    return data;
  },

  async getTop(limit = 100) {
    const { data } = await supabaseApi.get<LeaderboardRow[]>('/leaderboard', {
      params: {
        select: '*',
        order: 'rank_position.asc',
        limit,
      },
    });

    return data;
  },

  async getById(id: string) {
    const { data } = await supabaseApi.get<LeaderboardRow[]>('/leaderboard', {
      params: {
        select: '*',
        id: `eq.${id}`,
      },
    });

    return data[0] ?? null;
  },
};

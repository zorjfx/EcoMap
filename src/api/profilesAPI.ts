import { CrudApi } from './crud';

export type PublicProfile = {
  id: string;
  username: string;
  xp: number;
  avatar_url?: string;
};

export const profilesService = new CrudApi<PublicProfile>('public_profiles');

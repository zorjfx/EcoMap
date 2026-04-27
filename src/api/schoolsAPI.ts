import { CrudApi } from './crud';

export type School = {
  id: string;
  name: string;
};

export const schoolsApi = new CrudApi<School>('schools');

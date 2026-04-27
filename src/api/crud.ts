import { supabaseApi } from './supabaseAPI';

export class CrudApi<T> {
  constructor(private table: string) {}

  async getAll() {
    const { data } = await supabaseApi.get<T[]>(`/${this.table}`, {
      params: {
        select: '*',
      },
    });

    return data;
  }

  async getById(id: string) {
    const { data } = await supabaseApi.get<T[]>(`/${this.table}`, {
      params: {
        select: '*',
        id: `eq.${id}`,
      },
    });

    return data[0];
  }

  async create(payload: Partial<T>) {
    const { data } = await supabaseApi.post<T[]>(`/${this.table}`, payload, {
      headers: {
        Prefer: 'return=representation',
      },
    });

    return data[0];
  }

  async update(id: string, payload: Partial<T>) {
    const { data } = await supabaseApi.patch<T[]>(`/${this.table}`, payload, {
      params: {
        id: `eq.${id}`,
      },
      headers: {
        Prefer: 'return=representation',
      },
    });

    return data[0];
  }

  async delete(id: string) {
    await supabaseApi.delete(`/${this.table}`, {
      params: {
        id: `eq.${id}`,
      },
    });

    return true;
  }
}

import { defineStore } from 'pinia';

type ToolbarMode = 'search' | 'title';

export const useToolbarStore = defineStore('toolbar', {
  state: () => ({
    mode: 'search' as ToolbarMode,
    title: '',
  }),

  actions: {
    setSearch() {
      this.mode = 'search';
      this.title = '';
    },

    setTitle(title: string) {
      this.mode = 'title';
      this.title = title;
    },
  },
});

import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/map' },
      { path: 'map', name: 'map', component: () => import('src/pages/MapPage.vue') },
      {
        path: 'leaderboard',
        name: 'leaderboard',
        component: () => import('src/pages/LeaderboardPage.vue'),
      },
      { path: 'quests', name: 'quests', component: () => import('src/pages/QuestsPage.vue') },
    ],
  },
  {
    path: '/profile-settings',
    name: 'profileSettings',
    component: () => import('src/pages/ProfileSettingsPage.vue'),
  },
  { path: '/profile', name: 'profile', component: () => import('src/pages/ProfilePage.vue') },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

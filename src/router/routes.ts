import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/RegisterPage.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
    component: () => import('src/pages/ProfileSettingsPage.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { requiresAuth: true },
    component: () => import('src/pages/ProfilePage.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

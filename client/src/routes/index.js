/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

export default [
  // Home
  {
    path: '/home',
    name: 'home.index',
    component: () => import('@/pages/Home/Index'),

    // If the user needs to be authenticated to view this page
    meta: {
      auth: true,
    },
  },

  // Account
  {
    path: '/account',
    name: 'account.index',
    component: () => import('@/pages/Account/Index'),

    // If the user needs to be authenticated to view this page.
    meta: {
      auth: true,
    },
  },

  // Login
  {
    path: '/login',
    name: 'login.index',
    component: () => import('@/pages/Login/Index'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },

  // Register
  {
    path: '/register',
    name: 'register.index',
    component: () => import('@/pages/Register/Index.vue'),

    // If the user needs to be a guest to view this page.
    meta: {
      guest: true,
    },
  },
  // hmpp
  {
    path: '/hmpp',
    name: 'hmpp',
    component: () => import('@/pages/hmpp.vue'),

    // If the user needs to be a guest to view this page.
  },
  // hmpp2
  {
    path: '/hmpp2',
    name: 'hmpp2',
    component: () => import('@/pages/hmpp2.vue'),

    // If the user needs to be a guest to view this page.
  },
  {
    path: '/superdict',
    name: 'superdict',
    component: () => import('@/pages/SuperDict.vue'),

    // If the user needs to be a guest to view this page.
  },
  {
    path: '/',
    redirect: '/hmpp',
  },

  {
    path: '/*',
    redirect: '/hmpp',
  },
];

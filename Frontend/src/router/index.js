import { createRouter, createWebHistory } from 'vue-router';

const routes = [

  // Auth Pages
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/auth/SignIn.vue'),
    beforeEnter: (to, from, next) => guardIsGuest(to, from, next)
  },
  {
    path: '/auth/signin',
    name: 'AuthSignInPage',
    component: () => import('../views/auth/SignIn.vue'),
    beforeEnter: (to, from, next) => guardIsGuest(to, from, next)
  },


  // User Pages
  { path: '/user', redirect: '/user/dashboard' },
  {
    path: '/user/dashboard',
    name: 'UserDashboardPage',
    component: () => import('../views/user/Dashboard.vue'),
    beforeEnter: (to, from, next) => guardIsUser(to, from, next)
  },
  {
    path: '/user/farm/:id?',
    name: 'UserFarmPage',
    component: () => import('../views/user/Farm.vue'),
    beforeEnter: (to, from, next) => guardIsUser(to, from, next)
  },
  {
    path: '/user/profile',
    name: 'UserProfilePage',
    component: () => import('../views/user/Profile.vue'),
    beforeEnter: (to, from, next) => guardIsUser(to, from, next)
  },
  {
    path: '/user/profile-update',
    name: 'UserProfileUpdatePage',
    component: () => import('../views/user/ProfileUpdate.vue'),
    beforeEnter: (to, from, next) => guardIsUser(to, from, next)
  },
  {
    path: '/user/settings',
    name: 'UserSettingsPage',
    component: () => import('../views/user/Settings.vue'),
    beforeEnter: (to, from, next) => guardIsUser(to, from, next)
  },
  {
    path: '/user/password-update',
    name: 'UserPasswordUpdatePage',
    component: () => import('../views/user/PasswordUpdate.vue'),
    beforeEnter: (to, from, next) => guardIsUser(to, from, next)
  },


  // Admin Pages
  { path: '/admin', redirect: '/admin/dashboard' },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboardPage',
    component: () => import('../views/admin/Dashboard.vue'),
    beforeEnter: (to, from, next) => guardIsAdmin(to, from, next)
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


// START: Route Guards
function guardIsAdmin(to, from, next){
  const user = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`)
    ? JSON.parse(localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`))
    : null;
  if(!user || !user.isAdmin) return next('/auth/signin');
  return next();
}
function guardIsUser(to, from, next){
  const user = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`)
    ? JSON.parse(localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`))
    : null;
  if(!user) return next('/auth/signin');
  else if(user.isAdmin) return next('/admin/dashboard');
  return next();
}
function guardIsGuest(to, from, next){
  const user = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`)
    ? JSON.parse(localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`))
    : null;
  if(user){
    if(user.isAdmin) return next('/admin/dashboard');
    else return next('/user/dashboard');
  }
  return next();
}
// END: Route Guards


export default router;

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import HomePage from '../pages/HomePage.vue';
import DashboardPage from '../pages/DashboardPage.vue';

// import { useAuthStore } from '@/stores/auth';

const routes:any = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  {
    path: '/home',
    component: HomePage,
    // meta: { requiresAuth: true },
  },

  {
    path: '/dashbaord',
    component: DashboardPage,
    // meta: { requiresAuth: true },
  },
];

const router:any = createRouter({
  history: createWebHistory(),
  routes,
});


// router.beforeEach(async (to, _from, next) => {
//   const auth = useAuthStore();
//   if (to.meta.requiresAuth) {
//     const token = localStorage.getItem('token');
//     if (!token) return next('/login');
//     try {
//       if (!auth.user) await auth.getAccount();
//       return next();
//     } catch {
//       auth.logout();
//       return next('/login');
//     }
//   }
//   next();
// });

export default router;

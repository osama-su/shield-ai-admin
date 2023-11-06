import * as VueRouter from "vue-router";

import DashboardLayout from "@/layouts/dashboardLayout.vue";

import authRoutes from "@/modules/auth/index.routes";

import dashboardRoutes from "@/modules/dashboard/index.routes";

import contactsRoutes from "@/modules/contact/index.routes";

import headerRoutes from "@/modules/header/index.routes";

import footerRoutes from "@/modules/footer/index.routes";

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      component: DashboardLayout,
      name: "dashboard",
      redirect: { name: "homeDashboard" },
      children: [
        ...dashboardRoutes,
        ...contactsRoutes,
        ...headerRoutes,
        ...footerRoutes,
      ],
    },
    ...authRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("token");

  const inAuthPage = to.path.includes("auth");

  if (isLoggedIn && !inAuthPage) {
    next();
  } else if (isLoggedIn && inAuthPage) {
    next({ name: "dashboard" });
  } else if (!isLoggedIn && !inAuthPage) {
    next({ name: "auth" });
  } else {
    next();
  }
});

export default router;

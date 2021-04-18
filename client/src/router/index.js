import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Main",
    meta: { auth: true },
    component: () => import("@/views/Main.vue"),
  },

  {
    path: "/authorization",
    name: "Authorization",
    component: () => import("@/views/Authorization"),
  },
  {
    path: "/registration",
    name: "Registration",
    component: () => import("@/views/Registration"),
  },

  {
    path: "/not_found",
    name: "NotFoundComponent",
    component: () => import("@/views/NotFoundPage.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    redirect: { name: "NotFoundComponent" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = localStorage.username;
  const requireAuth = to.matched.some((record) => record.meta.auth);

  if (requireAuth && !currentUser) {
    next("/authorization?message=login");
  } else {
    next();
  }
});

export default router;

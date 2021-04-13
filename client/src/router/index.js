import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
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
    meta: { layout: "void" },
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

export default router;

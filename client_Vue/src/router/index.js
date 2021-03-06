import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { auth: true, layout: "main" },
    component: () => import("@/views/Home.vue"),
  },

  {
    path: "/practice",
    name: "Practice",
    meta: { auth: true, layout: "main" },
    component: () => import("@/views/Practice.vue"),
  },

  {
    path: "/expansion",
    name: "ExpansionWordsList",
    meta: { auth: true, layout: "main" },
    component: () => import("@/views/ExpansionWordsList"),
  },

  {
    path: "/all_words",
    name: "AllWordsOfUser",
    meta: { auth: true, layout: "main" },
    component: () => import("@/views/AllWordsOfUser"),
  },

  {
    path: "/word",
    name: "Word",
    meta: { auth: true, layout: "main" },
    component: () => import("@/views/Word"),
  },

  {
    path: "/login",
    name: "Login",
    meta: { layout: "empty" },
    component: () => import("@/views/Login"),
  },
  {
    path: "/registration",
    name: "Registration",
    meta: { layout: "empty" },
    component: () => import("@/views/Registration"),
  },

  {
    path: "/not_found",
    name: "NotFoundComponent",
    meta: { layout: "empty" },
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
    next("/login?message=login");
  } else {
    next();
  }
});

export default router;

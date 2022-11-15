import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import GroceriesView from "../views/GroceriesView.vue";
import UsersView from "../views/UsersView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/groceries",
      name: "groceries",
      component: GroceriesView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
  ],
});

router.beforeEach((to, from) => {
  const token = localStorage.getItem("token");
  if (token == null && to.name !== "login") {
    return { name: "login" };
  }
});
export default router;

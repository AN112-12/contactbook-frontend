import ContactBook from "@/views/ContactBook.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
{
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
},
{
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true, // Truyền các biến trong $route.params vào làm props
    meta: { requiresAuth: true },
},
{
    path: "/contacts/add",
    name: "contact.add",
    component: () => import("@/views/ContactAdd.vue"),
    props: true,
    meta: { requiresAuth: true },
}
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Chặn truy cập các trang cần đăng nhập nếu chưa có user trong localStorage
router.beforeEach((to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = !!localStorage.getItem("user");
  if (requiresAuth && !isLoggedIn) {
    return { name: "login" };
  }
});

export default router;
import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";

const routes = [
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/customer/dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/Index.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/customer/order",
        name: "order",
        component: () => import("@/views/order/Index.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/customer/order/:snap_token",
        name: "order_detail",
        component: () => import("@/views/order/Show.vue"),
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters["auth/isLoggedIn"]) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

export default router;

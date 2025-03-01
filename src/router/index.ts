import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login/index.vue';
import List from '../pages/list/index.vue';
import Team from "../pages/team/index.vue";
import Route from "../pages/route/index.vue";

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/list',
        name: 'List',
        component: List
    },
    {
        path: '/team',
        name: 'Team',
        component: Team
    },
    {
        path: '/route',
        name: 'Route',
        component: Route
    },
];

// 创建路由实例
const router = createRouter({
    // history: createWebHistory(),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router; 
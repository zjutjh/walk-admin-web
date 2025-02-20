import { createRouter, createWebHistory } from 'vue-router';
import Home from "../pages/home/index.vue";
import Login from '../pages/Login/index.vue';
import List from '../pages/List/index.vue';
import Team from "../pages/team/index.vue";

// 定义路由
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
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
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router; 
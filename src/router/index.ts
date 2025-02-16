import { createRouter, createWebHistory } from 'vue-router';
import Home from "../pages/home/index.vue";
import Login from '../pages/Login/index.vue'; // 导入登录页面

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
        component: Login // 添加登录页面路由
    }
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router; 
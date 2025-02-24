import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.VITE_FRONT_URL,
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://test.phlin.top/api/v1', // 目标 API 服务器
  //       changeOrigin: true, // 允许跨域
  //       rewrite: (path) => path.replace(/^\/api/, ''), // 可选：重写路径
  //     },
  //   },
  // },
})

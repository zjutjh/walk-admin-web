import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    base: '/',
    server: {
      proxy: {
        '/api/v1': {
          target: env.VITE_API_URL, // 目标 API 服务器
          changeOrigin: true, // 允许跨域
          // rewrite: (path) => path.replace(/^\/api/, ''), // 可选：重写路径
        },
      },
    },
  }
})

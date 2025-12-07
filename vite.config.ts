import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from "unocss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // proxy 有匹配顺序
      // todo 两个项目合拼，取消/api/product的proxy
      '^/api/product':{
        target: 'http://localhost:8888',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[产品服务] 请求: http://localhost:8888${proxyReq.path}`)
          })
        }
      },
      // axios实例加了VITE_APP_BASE_API(/api)，当匹配/api时 走以下 proxy
      // 后端Api网关
      '/api': {
        target: 'http://localhost:8347', // 后端接口地址、跨域代理
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 移除 /api 前缀
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log(`[Api通用]请求: http://localhost:8347${proxyReq.path}`)
          })
        }
      },
      '/test': {
        target: 'http://localhost:8347',
        changeOrigin: true
      },

    }
  }
})

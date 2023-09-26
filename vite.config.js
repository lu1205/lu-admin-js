import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'
import {viteMockServe} from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        viteMockServe({
            localEnabled: true
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        port: 3009,
        // host: '192.168.1.218',
        open: true,
        https: false,
        hmr: true, //开启热更新
        proxy: {
            '^/api|^/my': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true
            },
            '^/router': {
                target: 'http://127.0.0.1:3007',
                changeOrigin: true
            }
        }
    }
})

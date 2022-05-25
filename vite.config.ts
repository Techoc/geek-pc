import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            //约定：使用 @ 表示 src 文件所在路径
            "@": resolve(__dirname, "src")
        }
    }
})

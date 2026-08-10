import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// 单文件打包配置：产出内联了全部 JS/CSS 的独立 HTML（../孙菲潞-个人主页.html 的来源）
// 用法：npx vite build --config vite.config.singlefile.ts
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: {
    // 图片一并转成 base64 内联，保证产物是真正自包含的单文件
    assetsInlineLimit: 100 * 1024 * 1024,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

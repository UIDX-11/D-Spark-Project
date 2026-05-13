import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    /** 监听 0.0.0.0，避免仅绑定 IPv6/本机解析差异导致浏览器连不上 */
    host: true,
    /** 5173 被占用时自动换端口，终端会打印实际 URL（勿死记 5173） */
    strictPort: false,
  },
});

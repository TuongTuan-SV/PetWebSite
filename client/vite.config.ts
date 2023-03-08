import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Using the proxy instance
      '/user': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy'
        },
      },
    },
  },
});

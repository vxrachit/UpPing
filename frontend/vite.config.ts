import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: '0.0.0.0',   // allows access from other devices on LAN
    port: 5173,        // optional: you can change the port if needed
    open: true,        // opens browser automatically
  },
});

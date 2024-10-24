import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
   port: 5173,
   strictPort: true,
  },
  server: {
   port: 5173,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:5173",
  },
  define: {
    'process.env': {},
    "process.env.IS_PREACT": JSON.stringify("true"),
    
  },
 });

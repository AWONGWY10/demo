import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative base path for GitHub Pages compatibility
  define: {
    // Polyfill process.env for browser compatibility since the code uses process.env.API_KEY
    'process.env': {} 
  }
})

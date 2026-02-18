import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'production' ? false : true,
    minify: 'terser',
    rollupOptions: {
      output: {
        // Optimize chunk splitting for better caching
        manualChunks: {
          'react': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['react-toastify']
        }
      }
    }
  }
})


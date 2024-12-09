import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import ViteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    ViteImagemin(), // Optimize images during the build process
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Example API proxy for development
    },
  },
  build: {
    chunkSizeWarningLimit: 600, // Raise the chunk size limit for production builds
    target: 'esnext', // Set target for the latest JS features
    minify: 'terser', // Minify using Terser for better optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], // Split vendor libraries
        },
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    global: 'globalThis', // Required for blockchain libraries
    'process.env': 'import.meta.env' // Use Vite's native env handling with Node 23
  },
  resolve: {
    alias: {
      // Your existing aliases
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@stores': path.resolve(__dirname, './src/stores'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@assets': path.resolve(__dirname, './src/assets'),
      
      // Optimized polyfill aliases for Node 23
      buffer: 'buffer',
      process: 'process/browser',
      util: 'util',
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert',
      http: 'stream-http',
      https: 'https-browserify',
      os: 'os-browserify',
      url: 'url',
      zlib: 'browserify-zlib'
    },
  },
  optimizeDeps: {
    include: [
      'buffer', 
      'process',
      'util',
      'crypto-browserify',
      'stream-browserify',
      'assert',
      'stream-http',
      'https-browserify',
      'os-browserify',
      'url',
      'browserify-zlib'
    ],
    // Node 23 optimization
    esbuildOptions: {
      target: 'es2022', // Node 23 supports es2022 features
      supported: {
        'bigint': true // Explicitly enable BigInt support
      }
    }
  },
  server: {
    host: true, // Allow external connections for Telegram testing
    port: 3000,
    cors: true,
  },
  build: {
    // Keep your existing build optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          wagmi: ['wagmi', 'viem', '@rainbow-me/rainbowkit'],
          animations: ['framer-motion', 'lottie-react'],
          utils: ['dayjs', 'clsx'],
        },
      },
    },
    // Node 23 optimized build target
    target: 'es2022', // Node 23 supports es2022 which includes better BigInt support
    minify: 'esbuild',
    sourcemap: false,
    // Enhanced compatibility options for Node 23
    commonjsOptions: {
      transformMixedEsModules: true,
      // Node 23 has better ES module support
      extensions: ['.js', '.cjs', '.mjs', '.ts', '.tsx']
    }
  },
  preview: {
    host: true,
    port: 3000,
  },
  // Node 23 specific optimizations
  esbuild: {
    target: 'es2022',
    supported: {
      'bigint': true,
      'top-level-await': true
    }
  }
})
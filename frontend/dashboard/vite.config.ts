import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  base: '/assets/',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  plugins: [
    react(),
    federation({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      remotes: {
        host: 'http://localhost:3001/assets/remoteEntry.js',
      },
      exposes: {
        './DashboardApp': './src/App',
      },
      shared: [
        'react',
        'react-dom'
      ],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  server: {
    port: 3002,
  },
});

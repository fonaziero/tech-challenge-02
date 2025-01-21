import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import svgr from '@svgr/rollup';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../shared/enviroments/.env') });

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  define: {
    'import.meta.env': {
      ...process.env,
    },
  },
  plugins: [
    react(),
    svgr(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        dashboard: 'http://54.86.79.191:3002/assets/remoteEntry.js',
      },
      exposes: {
        './Button': './src/components/UI/buttons/button/button',
        './CircleButton': './src/components/UI/buttons/circleButton/index',
        './Header': './src/components/UI/header/index',
        './Input': './src/components/UI/inputs/input/index',
        './Select': './src/components/UI/inputs/select/index',
        './Menu': './src/components/UI/menu/index',
        './Modal': './src/components/UI/modal/index',
        './SearchBar': './src/components/UI/inputs/searchBar/index',
        './NotFound': './src/not-found',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
      ],
    }),
  ],
  build: {
    target: 'esnext',
    minify: false,
  },
  server: {
    port: 3001,
    cors: {
      origin: '*', 
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import svgr from '@svgr/rollup';
import path from 'path';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
    },
  },
  plugins: [
    react(),
    svgr(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js',
      remotes: {
        dashboard: 'http://localhost:3002/assets/assets/remoteEntry.js',
      },
      exposes: {
        './Button': './src/components/UI/buttons/button/button',
        './CircleButton': './src/components/UI/buttons/circleButton/index',
        './Header': './src/components/UI/header/index',
        './Input': './src/components/UI/inputs/input/index',
        './Select': './src/components/UI/inputs/select/index',
        './Menu': './src/components/UI/menu/index',
        './Modal': './src/components/UI/modal/index',
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
    port: 3001,
  },
});

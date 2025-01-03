import { defineConfig } from 'vite';
import { resolve } from 'path'; // Za rad sa putanjama

// Vite konfiguracija za Angular
export default defineConfig({
  resolve: {
    alias: [
      // Definišemo alias za src direktorijum
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },
  server: {
    // Konfiguracija za dev server
    port: 4200, // Standardni port za Angular
    open: true, // Otvori aplikaciju u pregledaču automatski
  },
  build: {
    // Konfiguracija za build
    outDir: 'dist', // Izlazna mapa za build
  },
});

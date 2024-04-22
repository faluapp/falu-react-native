import react from '@vitejs/plugin-react'; // this is needed for react jsx support
import { URL, fileURLToPath } from 'url';
import reactNative from 'vitest-react-native';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    exclude: [...configDefaults.exclude],
    alias: {
      '~/': fileURLToPath(new URL('./src/', import.meta.url)),
    },
  },
  plugins: [reactNative(), react()],
});

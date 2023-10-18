import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import UnoCSS from 'unocss/vite'
import postCssPresetEnv from 'postcss-preset-env'

export default defineConfig({
  plugins: [solidPlugin(), UnoCSS()],
  build: {
    target: 'esnext',
  },
  css: {
    postcss: {
      plugins: [postCssPresetEnv({ stage: 0 })],
    },
  },
})

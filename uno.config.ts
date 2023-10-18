import {
  defineConfig,
  presetIcons,
  presetMini,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'

export default defineConfig({
  presets: [
    presetMini({
      dark: 'media',
    }),
    presetWebFonts({
      provider: 'fontshare',
      fonts: {
        Outfit: 'Outfit',
        Satoshi: 'Satoshi',
      },
    }),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '24px',
        height: '24px',
      },
    }),
  ],
  transformers: [transformerDirectives()],
})

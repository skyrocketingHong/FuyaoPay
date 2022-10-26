import { createI18nContext } from '@solid-primitives/i18n'

const dict = {
  en: {
    payTitle: 'Pay for Yanren',
    payment: '👇Select a payment method👇',
    saveImg: 'Long press to save the QR code image',
    yanren: 'Yanren',
  },
  zhCN: {
    payTitle: '给炎忍打钱',
    payment: '👇选择支付方式👇',
    saveImg: '长按保存二维码图片',
    yanren: '炎忍',
  },
}

const i18nValue = createI18nContext(dict, 'en')

export default i18nValue

import { t, setLocale, locale, Locale } from './i18n'
import { createEffect, createSignal, For, JSX, onMount } from 'solid-js'
import './App.css'
import { Payments } from './components/payments'

const App = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div class="font home">
        <LanguageSwitcher />
        <div class="title-box">
          <p>{t('payTitle')}</p>
        </div>
        <p class="select-payment">{t('payment')}</p>
        <Payments />
        <footer>
          <p>{t('thanks')}&nbsp;<span id="busuanzi_value_site_pv"></span>&nbsp;{t('visit')}</p>
          <p>Serverd by&nbsp;
            <a href="https://cn.aliyun.com/chinaglobal/home" rel="noopener noreferrer" target="_blank">Aliyun Hong Kong</a>
            &nbsp;&&nbsp;
            <a href="https://caddyserver.com/v2" rel="noopener" target="_blank">Caddy 2</a>
          </p>
          <p>&copy;&nbsp;2016&nbsp;-&nbsp;{currentYear} <a href="https://github.com/skyrocketingHong/FuyaoPay" rel="noopener" target="_blank">{t('skyrocketing')}</a></p>
        </footer>
      </div>
    </>
  )
}

const LanguageSwitcher = () => {
  const languageList: { text: string; lan: Locale }[] = [
    {
      text: 'EN',
      lan: 'en',
    },
    {
      text: '简',
      lan: 'zh-cn',
    },
  ]

  createEffect(() => {
    if (locale() === 'en') {
      document.title = t('payTitle')
    } else {
      document.title = t('payTitle')
    }
  })

  return (
    <div id="language-switcher">
      <ul class="language-list">
        {languageList.map((item) => {
          return (
            <li>
              <p
                classList={{ active: locale() === item.lan }}
                onClick={() => setLocale(item.lan)}
                class="font"
              >
                {item.text}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App

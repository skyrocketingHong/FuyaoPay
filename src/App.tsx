import { useI18n } from '@solid-primitives/i18n'
import { createEffect, createSignal, For, JSX } from 'solid-js'
import QRCode from 'qrcode'
import parse from 'ua-parser-js'
import './App.css'

const App = () => {
  const [t, { locale }] = useI18n()

  return (
    <>
      <div class="outfit home">
        <LanguageSwitcher />
        <div class="title-box">
          <p>{t('payTitle')}</p>
        </div>
        <p class="select-payment">{t('payment')}</p>
        <Payments />
        <footer>
          <p>© 2022 {t('yanren')} </p>
        </footer>
      </div>
    </>
  )
}

const Payments = () => {
  type Payment = {
    id: string
    icon: JSX.Element
    link: string
    type: string
  }

  const [t] = useI18n()
  const [selectPayment, setSelectPayment] = createSignal('')
  const [inLager, setInLager] = createSignal(false)
  const UA = parse(navigator.userAgent)

  const payments: Array<Payment> = [
    {
      id: 'alipay',
      icon: <i class="fa-brands fa-alipay"></i>,
      link: 'https://qr.alipay.com/fkx17810vgkiizqwtcqebfc',
      type: 'qrcode',
    },
    {
      id: 'wechat',
      icon: <i class="fa-brands fa-weixin"></i>,
      link: 'wxp://f2f0tkJn97xBE_AALRqk5GQGYH5cu7L9keLG',
      type: 'qrcode',
    },
    {
      id: 'qq',
      icon: <i class="fa-brands fa-qq"></i>,
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&ac=F18F01A9E9104C71F8C43BE384C96F6213F4F51B993ACEA8806A94F08944E1C9&u=2323355219&n=%E6%B1%9D%E5%8D%97%E4%BA%AC',
      type: 'qrcode',
    },
    {
      id: 'paypal',
      icon: <i class="fa-brands fa-paypal"></i>,
      link: 'https://www.paypal.com/',
      type: 'openlink',
    },
  ]

  const Pay = (payment: Payment) => {
    if (payment.type === 'openlink') {
      window.open(payment.link, '_blank')
    } else {
      console.log(UA.device.type)
      if (payment.id === 'alipay' && UA.device.type === 'mobile') {
        window.open(
          'alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/fkx07170tzxfnbs56z5ejdb',
          '_blank'
        )
        return
      }
      setSelectPayment(payment.id)
      setInLager(true)
    }
  }

  const Close = () => {
    setSelectPayment('')
    setTimeout(() => setInLager(false), 400)
  }

  return (
    <>
      <div class="payments">
        <For each={payments}>
          {(item) => (
            <>
              <div
                onclick={() => {
                  if (inLager()) return
                  Pay(item)
                }}
                class={`payment ${item.id}`}
                classList={{
                  largen: selectPayment() !== '' && selectPayment() === item.id,
                  hide: selectPayment() !== '' && selectPayment() !== item.id,
                }}
              >
                <div class="icon">{item.icon}</div>
                <img
                  ref={(el) => {
                    const canvas = document.createElement('canvas')
                    QRCode.toCanvas(
                      canvas,
                      item.link,
                      {
                        width: 1000,
                      },
                      (err) => {}
                    )
                    const ctx = canvas.getContext('2d')
                    ctx!.imageSmoothingEnabled = false
                    el.src = canvas.toDataURL('image/png')
                  }}
                  class="qrcode"
                ></img>
                <div onclick={() => Close()} class="close">
                  <i class="fa-solid fa-xmark"></i>
                </div>
              </div>
            </>
          )}
        </For>
      </div>
    </>
  )
}

const LanguageSwitcher = () => {
  const languageList = [
    {
      text: 'EN',
      lan: 'en',
    },
    {
      text: '简',
      lan: 'zhCN',
    },
  ]

  const [t, { locale }] = useI18n()

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
                onClick={() => locale(item.lan)}
                class="outfit"
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

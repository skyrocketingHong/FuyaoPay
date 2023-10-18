import { createSignal, onMount, For } from 'solid-js'
import QRCode from 'qrcode'
import parse from 'ua-parser-js'
import './payments.less'

const Payments = () => {
  type Payment = {
    id: string
    icon: string
    link: string
    type: string
  }

  const [selectPayment, setSelectPayment] = createSignal('')
  const UA = parse(navigator.userAgent)

  onMount(() => {
    document.body.addEventListener('mouseup', (e) => {
      const el = document.querySelector('.payment')
      if (!el) {
      }
    })
  })

  const payments: Array<Payment> = [
    {
      id: 'alipay',
      icon: 'i-ri-alipay-fill',
      link: 'https://qr.alipay.com/fkx17810vgkiizqwtcqebfc',
      type: 'qrcode',
    },
    {
      id: 'wechat',
      icon: 'i-ri-wechat-fill',
      link: 'wxp://f2f0tkJn97xBE_AALRqk5GQGYH5cu7L9keLG',
      type: 'qrcode',
    },
    {
      id: 'qq',
      icon: 'i-ri-qq-fill',
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&f=wallet&a=1&ac=F18F01A9E9104C71F8C43BE384C96F6213F4F51B993ACEA8806A94F08944E1C9&u=2323355219&n=%E6%B1%9D%E5%8D%97%E4%BA%AC',
      type: 'qrcode',
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

      setTimeout(() => {
        document
          .querySelector(`.payment-container.${payment.id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
      // setInLager(true)
    }
  }

  const close = () => {
    setSelectPayment('')
  }

  return (
    <>
      <div class="payments">
        <For each={payments}>
          {(item) => (
            <div
              class={`payment-container ${item.id}`}
              onclick={(e) => {
                if (e.target.classList.contains('close')) {
                  setSelectPayment('')
                  return
                }
                Pay(item)
              }}
              classList={{
                open: selectPayment() === item.id,
              }}
            >
              <div class="payment">
                <div class={`icon ${item.icon}`}></div>
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
                <i onclick={() => close()} class="close i-ri-close-fill"></i>
              </div>
            </div>
          )}
        </For>
      </div>
    </>
  )
}

export { Payments }

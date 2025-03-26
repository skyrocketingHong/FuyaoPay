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
      link: 'https://qr.alipay.com/fkx11284wewb6r1q6rivs74',
      type: 'qrcode',
    },
    {
      id: 'wechat',
      icon: 'i-ri-wechat-fill',
      link: 'wxp://f2f0nIJSf6PcLP6XVwmqScZVGCGoB36xv6j-w8HGUeFMx9E=',
      type: 'qrcode',
    },
    {
      id: 'qq',
      icon: 'i-ri-qq-fill',
      link: 'https://i.qianbao.qq.com/wallet/sqrcode.htm?m=tenpay&a=1&u=1055823718&ac=CAEQ5q669wMYwsWJvwY4AEIgNjkxMWFhN2RhMTBkNzRkOTE5NTBmMWNkZjVmYWI0NGM%3D_xxx_sign&n=%E6%89%B6%E6%91%87skyrocketing&f=wallet',
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
          'alipays://platformapi/startapp?appId=10000007&qrcode=https://qr.alipay.com/fkx11284wewb6r1q6rivs74',
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

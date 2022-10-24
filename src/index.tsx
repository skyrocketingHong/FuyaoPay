/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { I18nContext } from '@solid-primitives/i18n'
import i18nValue from './locales'

render(
  () => (
    <I18nContext.Provider value={i18nValue}>
      <App />
    </I18nContext.Provider>
  ),
  document.getElementById('root') as HTMLElement
)

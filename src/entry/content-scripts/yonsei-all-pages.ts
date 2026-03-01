import browser from 'webextension-polyfill'
import '../../main.css'

import { setupRefreshingOverlay } from '../../core/login/setup-refreshing-overlay'
import { TabMessage } from '../../utils/tab-message'

const { handleShowRefreshingOverlayChange } = setupRefreshingOverlay({
  checkIsInLoginPage: () => {
    const loginEntryButton = document.querySelector('div.login_btn')
    const loginForm = document.getElementById('ssoLoginForm')

    return Boolean(loginEntryButton || loginForm)
  },
})

browser.runtime.onMessage.addListener((message: unknown) => {
  const msg = message as TabMessage
  switch (msg.type) {
    case 'refreshing-overlay':
      handleShowRefreshingOverlayChange(msg.show)
      break
  }
})

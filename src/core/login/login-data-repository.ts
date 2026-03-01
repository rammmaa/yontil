import browser from 'webextension-polyfill'
import { onSessionRefreshed } from './refresh-session'

const LOGIN_DATA_KEY = 'loginData'

export interface LoginData {
  id: string
  password: string
}

export async function setLoginData(loginData: LoginData): Promise<void> {
  const loginDataString = btoa(JSON.stringify(loginData))
  await browser.storage.local.set({ [LOGIN_DATA_KEY]: loginDataString })

  await onSessionRefreshed()
}

export async function getLoginData(): Promise<LoginData | null> {
  const result = await browser.storage.local.get(LOGIN_DATA_KEY)
  const loginData = result[LOGIN_DATA_KEY]
  if (!loginData) return null

  return JSON.parse(atob(loginData as string))
}

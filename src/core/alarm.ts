import browser from 'webextension-polyfill'
import { sendMessageToBackground } from '../utils/tab-message'
import { SESSION_EXPIRATION_TIME_IN_MINUTES } from './login/login-status-repository'

const REFRESH_SESSION_PERIOD_IN_MINUTES = SESSION_EXPIRATION_TIME_IN_MINUTES - 1

export const REFRESH_SESSION_ALARM_NAME = 'refreshSession'

export async function recreateRefreshSessionAlarm(): Promise<void> {
  if (!browser.alarms) {
    sendMessageToBackground({ type: 'recreate-refresh-session-alarm' })
    return
  }

  await browser.alarms.create(REFRESH_SESSION_ALARM_NAME, {
    periodInMinutes: REFRESH_SESSION_PERIOD_IN_MINUTES,
  })
}

export async function getIsRefreshSessionAlarmExists(): Promise<boolean> {
  return Boolean(await browser.alarms.get(REFRESH_SESSION_ALARM_NAME))
}

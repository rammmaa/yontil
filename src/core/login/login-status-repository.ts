import browser from 'webextension-polyfill'

export const LAST_SESSION_REFRESHED_TIME_KEY = 'lastSessionRefreshedTime'

export const SESSION_EXPIRATION_TIME_IN_MINUTES = 60

export async function setLastSessionRefreshedTime(): Promise<void> {
  await browser.storage.local.set({
    [LAST_SESSION_REFRESHED_TIME_KEY]: Date.now(),
  })
}

export async function removeLastSessionRefreshedTime(): Promise<void> {
  await browser.storage.local.remove(LAST_SESSION_REFRESHED_TIME_KEY)
}

async function getIsLoggedIn(): Promise<boolean> {
  const result = await browser.storage.local.get(LAST_SESSION_REFRESHED_TIME_KEY)
  const lastSessionRefreshedTime = result[LAST_SESSION_REFRESHED_TIME_KEY] as
    | number
    | undefined

  return (
    lastSessionRefreshedTime !== undefined &&
    lastSessionRefreshedTime >
      Date.now() - 1000 * 60 * SESSION_EXPIRATION_TIME_IN_MINUTES
  )
}

export const IS_SESSION_REFRESHING_KEY = 'isSessionRefreshing'

export async function setIsSessionRefreshing(
  isSessionRefreshing: boolean
): Promise<void> {
  await browser.storage.local.set({
    [IS_SESSION_REFRESHING_KEY]: isSessionRefreshing,
  })
}

async function getIsSessionRefreshing(): Promise<boolean> {
  const result = await browser.storage.local.get(IS_SESSION_REFRESHING_KEY)
  const isSessionRefreshing = result[IS_SESSION_REFRESHING_KEY] as
    | boolean
    | undefined

  return isSessionRefreshing ?? false
}

export async function getShowRefreshingOverlay(): Promise<boolean> {
  const isLoggedIn = await getIsLoggedIn()
  const isSessionRefreshing = await getIsSessionRefreshing()

  return !isLoggedIn && isSessionRefreshing
}

export async function getIsSessionRefreshNeeded(): Promise<boolean> {
  const isLoggedIn = await getIsLoggedIn()
  const isSessionRefreshing = await getIsSessionRefreshing()

  return !isLoggedIn && !isSessionRefreshing
}

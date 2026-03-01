import browser from 'webextension-polyfill'

const ALRS_VIDEO_PLAYBACK_RATE_KEY = 'alrsVideoPlaybackRate'

export async function getAlrsVideoPlaybackRate(): Promise<number | undefined> {
  const result = await browser.storage.local.get(ALRS_VIDEO_PLAYBACK_RATE_KEY)
  return result[ALRS_VIDEO_PLAYBACK_RATE_KEY] as number | undefined
}

export async function setAlrsVideoPlaybackRate(rate: number): Promise<void> {
  await browser.storage.local.set({
    [ALRS_VIDEO_PLAYBACK_RATE_KEY]: rate,
  })
}

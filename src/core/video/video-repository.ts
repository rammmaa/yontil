import browser from 'webextension-polyfill'

const VIDEO_PLAYBACK_RATE_KEY = 'videoPlaybackRate'

export async function getVideoPlaybackRate(): Promise<number | undefined> {
  const result = await browser.storage.local.get(VIDEO_PLAYBACK_RATE_KEY)
  return result[VIDEO_PLAYBACK_RATE_KEY] as number | undefined
}

export async function setVideoPlaybackRate(rate: number): Promise<void> {
  await browser.storage.local.set({
    [VIDEO_PLAYBACK_RATE_KEY]: rate,
  })
}

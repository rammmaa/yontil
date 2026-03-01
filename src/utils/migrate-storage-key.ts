import browser from 'webextension-polyfill'

export async function migrateLocalStorageKey(
  from: string,
  to: string
): Promise<void> {
  const value = await browser.storage.local.get(from)
  if (value[from] === undefined) return

  await browser.storage.local.set({ [to]: value[from] })
  await browser.storage.local.remove(from)
}

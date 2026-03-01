import { getIsSessionRefreshNeeded } from './login/login-status-repository'
import { refreshSession } from './login/refresh-session'

export function startListeningNetworkStatus(): void {
  self.addEventListener('online', handleOnline)
}

async function handleOnline(): Promise<void> {
  if (await getIsSessionRefreshNeeded()) {
    await refreshSession()
  }
}

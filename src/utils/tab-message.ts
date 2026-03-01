import browser from 'webextension-polyfill'
import { Course } from '../core/tasks/tasks-repository'

export type TabMessage =
  | ShowRefreshingOverlayMessage
  | UpdateLearnUsSesskeyMessage
  | RecreateRefreshSessionAlarmMessage
  | TasksEnabledUpdatedMessage
  | TasksRefreshingUpdatedMessage
  | CoursesDataUpdatedMessage
  | CancelRefreshingSessionMessage

interface ShowRefreshingOverlayMessage {
  type: 'refreshing-overlay'
  show: boolean
}

interface UpdateLearnUsSesskeyMessage {
  type: 'update-learnus-sesskey'
  sesskey: string
}

interface RecreateRefreshSessionAlarmMessage {
  type: 'recreate-refresh-session-alarm'
}

interface TasksEnabledUpdatedMessage {
  type: 'tasks-enabled-updated'
  isTasksEnabled: boolean
}

interface TasksRefreshingUpdatedMessage {
  type: 'tasks-refreshing-updated'
  isRefreshing: boolean
}

interface CoursesDataUpdatedMessage {
  type: 'courses-data-updated'
  courses?: Course[]
  lastUpdated?: number
}

interface CancelRefreshingSessionMessage {
  type: 'cancel-refreshing-session'
}

export async function sendMessageToTab(tabId: number, message: TabMessage) {
  try {
    await browser.tabs.sendMessage(tabId, message)
  } catch (e) {
    console.log(
      `[${new Date().toISOString()}] Failed to send message to tab ${tabId}:`,
      message,
      e
    )
  }
}

export async function sendMessageToTabs(tabIds: number[], message: TabMessage) {
  await Promise.all(tabIds.map((tabId) => sendMessageToTab(tabId, message)))
}

export async function sendMessageToBackground(message: TabMessage) {
  await browser.runtime.sendMessage(message)
}

import browser from 'webextension-polyfill'

export const IS_TASKS_ENABLED_KEY = 'isTasksEnabled'
const IS_TASKS_ENABLED_DEFAULT = true

export async function getIsTasksEnabled(): Promise<boolean> {
  const result = await browser.storage.local.get(IS_TASKS_ENABLED_KEY)
  return (result[IS_TASKS_ENABLED_KEY] as boolean | undefined) ?? IS_TASKS_ENABLED_DEFAULT
}

export async function setIsTasksEnabled(enabled: boolean): Promise<void> {
  await browser.storage.local.set({
    [IS_TASKS_ENABLED_KEY]: enabled,
  })
}

export const IS_TASKS_REFRESHING_KEY = 'isTasksRefreshing'
const IS_TASKS_REFRESHING_DEFAULT = false

export async function setIsTasksRefreshing(
  isRefreshing: boolean
): Promise<void> {
  await browser.storage.local.set({
    [IS_TASKS_REFRESHING_KEY]: isRefreshing,
  })
}

export async function getIsTasksRefreshing(): Promise<boolean> {
  const result = await browser.storage.local.get(IS_TASKS_REFRESHING_KEY)
  return (result[IS_TASKS_REFRESHING_KEY] as boolean | undefined) ?? IS_TASKS_REFRESHING_DEFAULT
}

export const COURSES_DATA_KEY = 'coursesData'
export const COURSES_DATA_LAST_UPDATED_KEY = 'coursesDataLastUpdated'

export interface Course {
  courseUrl: string
  tasks: string[]
}

export interface CoursesData {
  [COURSES_DATA_KEY]: Course[] | undefined
  [COURSES_DATA_LAST_UPDATED_KEY]: number | undefined
}

export async function setCoursesData(courses: Course[]): Promise<void> {
  await browser.storage.local.set({
    [COURSES_DATA_KEY]: courses,
    [COURSES_DATA_LAST_UPDATED_KEY]: Date.now(),
  })
}

export async function getCoursesData(): Promise<CoursesData> {
  return (await browser.storage.local.get([
    COURSES_DATA_KEY,
    COURSES_DATA_LAST_UPDATED_KEY,
  ])) as unknown as CoursesData
}

interface TasksInitialState {
  isTasksRefreshing: boolean
  courses: Course[] | undefined
  coursesLastUpdated: number | undefined
}

export async function getTasksInitialState(): Promise<TasksInitialState> {
  const state = await browser.storage.local.get([
    IS_TASKS_REFRESHING_KEY,
    COURSES_DATA_KEY,
    COURSES_DATA_LAST_UPDATED_KEY,
  ])

  return {
    isTasksRefreshing:
      (state[IS_TASKS_REFRESHING_KEY] as boolean | undefined) ?? IS_TASKS_REFRESHING_DEFAULT,
    courses: state[COURSES_DATA_KEY] as Course[] | undefined,
    coursesLastUpdated: state[COURSES_DATA_LAST_UPDATED_KEY] as number | undefined,
  }
}

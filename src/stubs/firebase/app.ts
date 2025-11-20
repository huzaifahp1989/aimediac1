export type FirebaseApp = {
  name: string
  options?: Record<string, unknown>
}

const defaultApp: FirebaseApp = { name: 'firebase-stub', options: {} }
let initialized = false

export const getApps = (): FirebaseApp[] => (initialized ? [defaultApp] : [])

export const initializeApp = (options: Record<string, unknown>): FirebaseApp => {
  initialized = true
  defaultApp.options = options
  return defaultApp
}

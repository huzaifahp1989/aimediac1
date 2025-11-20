import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const isConfigPresent = Object.values(firebaseConfig).every(Boolean)

const initializeFirebaseApp = (): FirebaseApp | undefined => {
  if (!isConfigPresent) return undefined
  return getApps()[0] ?? initializeApp(firebaseConfig)
}

export const firebaseApp = initializeFirebaseApp()
export const db = firebaseApp ? getFirestore(firebaseApp) : undefined
export const storage = firebaseApp ? getStorage(firebaseApp) : undefined

if (typeof window !== 'undefined' && db) {
  enableIndexedDbPersistence(db).catch(() => {
    // IndexedDB persistence can fail in some browsers or environments; fallback to memory cache.
  })
}

export const isFirebaseConfigured = Boolean(firebaseApp)

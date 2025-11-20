import { storageMap } from './mockData'

export type FirebaseStorage = { kind: 'stub' }
export type StorageReference = { path: string }

export const getStorage = (): FirebaseStorage => ({ kind: 'stub' })
export const ref = (_storage: FirebaseStorage, path: string): StorageReference => ({ path })

export const uploadBytes = async (storageRef: StorageReference, data: Blob | Uint8Array | ArrayBuffer) => {
  const arrayBuffer =
    data instanceof ArrayBuffer ? data : data instanceof Uint8Array ? data : await data.arrayBuffer()
  storageMap.set(storageRef.path, arrayBuffer)
  return { ref: storageRef }
}

export const getDownloadURL = async (storageRef: StorageReference) => {
  const hasFile = storageMap.has(storageRef.path)
  return hasFile
    ? `https://storage.stub.local/${encodeURIComponent(storageRef.path)}`
    : 'https://via.placeholder.com/1200x800.png?text=Timetable+Placeholder'
}

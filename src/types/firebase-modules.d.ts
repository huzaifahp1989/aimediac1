// Minimal Firebase module declarations to allow TypeScript checks in offline environments.
// Replace with actual Firebase SDK by running `pnpm install firebase` in real deployments.

declare module 'firebase/app' {
  export interface FirebaseApp {}
  export function initializeApp(config: Record<string, unknown>): FirebaseApp
  export function getApps(): FirebaseApp[]
}

declare module 'firebase/firestore' {
  export interface Firestore {}
  export interface CollectionReference<T = unknown> { id: string }
  export interface DocumentReference<T = unknown> { id: string }
  export interface Query<T = unknown> {}
  export interface QuerySnapshot<T = unknown> {
    docs: Array<QueryDocumentSnapshot<T>>
  }
  export interface QueryDocumentSnapshot<T = unknown> {
    id: string
    data(): T
    exists(): boolean
  }
  export function getFirestore(app: import('firebase/app').FirebaseApp): Firestore
  export function enableIndexedDbPersistence(firestore: Firestore): Promise<void>
  export function collection(
    firestore: Firestore | DocumentReference,
    path: string,
    ...segments: string[]
  ): CollectionReference
  export function doc(firestore: Firestore, path: string, ...segments: string[]): DocumentReference
  export function doc<T = unknown>(collectionRef: CollectionReference<T>, path?: string): DocumentReference<T>
  export function getDoc<T = unknown>(ref: DocumentReference<T>): Promise<QueryDocumentSnapshot<T>>
  export function getDocs<T = unknown>(query: Query<T>): Promise<QuerySnapshot<T>>
  export function query(base: CollectionReference | Query, ...constraints: unknown[]): Query
  export function orderBy(field: string, direction?: 'asc' | 'desc'): unknown
  export function addDoc<T = unknown>(ref: CollectionReference<T>, data: T): Promise<DocumentReference<T>>
  export function setDoc<T = unknown>(ref: DocumentReference<T>, data: T): Promise<void>
}

declare module 'firebase/storage' {
  export interface FirebaseStorage {}
  export interface StorageReference { fullPath: string }
  export function getStorage(app: import('firebase/app').FirebaseApp): FirebaseStorage
  export function ref(storage: FirebaseStorage, path?: string): StorageReference
  export function uploadBytes(ref: StorageReference, data: Blob | ArrayBuffer | Uint8Array): Promise<void>
  export function getDownloadURL(ref: StorageReference): Promise<string>
}

import { mockCities, addCity, addMasjid, upsertMasjid } from './mockData'

export type Firestore = { kind: 'stub' }

export type DocumentSnapshot<T = Record<string, unknown>> = {
  id: string
  exists: () => boolean
  data: () => T
}

export type QuerySnapshot<T = Record<string, unknown>> = {
  docs: Array<DocumentSnapshot<T>>
}

type DocRef = { path: string }
type CollectionRef = { path: string }

const joinPath = (...segments: string[]) => segments.filter(Boolean).join('/')

export const getFirestore = (): Firestore => ({ kind: 'stub' })
export const enableIndexedDbPersistence = async () => Promise.resolve()

export const collection = (_db: Firestore, ...pathSegments: string[]): CollectionRef => ({
  path: joinPath(...pathSegments)
})

export const doc = (_db: Firestore, ...pathSegments: string[]): DocRef => ({
  path: joinPath(...pathSegments)
})

export const query = <T>(_collectionRef: CollectionRef, _orderBy?: unknown): CollectionRef => _collectionRef
export const orderBy = (_field: string, _direction?: 'asc' | 'desc') => ({ field: _field, direction: _direction })

export const getDocs = async <T = Record<string, unknown>>(collectionRef: CollectionRef): Promise<QuerySnapshot<T>> => {
  if (collectionRef.path === 'cities') {
    return {
      docs: mockCities.map((city) => ({
        id: city.id,
        data: () => ({
          name: city.name,
          region: city.region,
          country: city.country
        }) as T,
        exists: () => true
      }))
    }
  }

  const masjidMatch = collectionRef.path.match(/^cities\/(.+)\/masjids$/)
  if (masjidMatch) {
    const [, cityId] = masjidMatch
    const city = mockCities.find((item) => item.id === cityId)
    const masjids = city?.masjids ?? []
    return {
      docs: masjids.map((masjid) => ({
        id: masjid.id,
        data: () => ({ ...masjid }) as T,
        exists: () => true
      }))
    }
  }

  return { docs: [] }
}

export const getDoc = async <T = Record<string, unknown>>(docRef: DocRef): Promise<DocumentSnapshot<T>> => {
  const cityMatch = docRef.path.match(/^cities\/([^/]+)$/)
  if (cityMatch) {
    const [, cityId] = cityMatch
    const city = mockCities.find((item) => item.id === cityId)
    return {
      id: cityId,
      data: () => ({
        name: city?.name,
        region: city?.region,
        country: city?.country
      }) as T,
      exists: () => Boolean(city)
    }
  }

  const masjidMatch = docRef.path.match(/^cities\/([^/]+)\/masjids\/([^/]+)$/)
  if (masjidMatch) {
    const [, cityId, masjidId] = masjidMatch
    const city = mockCities.find((item) => item.id === cityId)
    const masjid = city?.masjids.find((item) => item.id === masjidId)
    return {
      id: masjidId,
      data: () => ({ ...masjid }) as T,
      exists: () => Boolean(masjid)
    }
  }

  return {
    id: docRef.path,
    data: () => ({}) as T,
    exists: () => false
  }
}

export const addDoc = async (collectionRef: CollectionRef, data: Record<string, unknown>) => {
  if (collectionRef.path === 'cities') {
    const payload = typeof data === 'object' && data !== null ? data : {}
    const id = addCity(Object.assign({ masjids: [] }, payload) as never)
    return { id }
  }

  const masjidMatch = collectionRef.path.match(/^cities\/(.+)\/masjids$/)
  if (masjidMatch) {
    const [, cityId] = masjidMatch
    const id = addMasjid(cityId, data as never)
    return { id }
  }

  return { id: `doc-${Math.random().toString(36).slice(2, 8)}` }
}

export const setDoc = async (docRef: DocRef, data: Record<string, unknown>) => {
  const masjidMatch = docRef.path.match(/^cities\/(.+)\/masjids\/(.+)$/)
  if (masjidMatch) {
    const [, cityId, masjidId] = masjidMatch
    upsertMasjid(cityId, masjidId, { ...data, id: masjidId } as never)
  }
}

import { useEffect, useMemo, useState } from 'react'

export interface FavoriteMasjid {
  cityId: string
  masjidId: string
  masjidName: string
  address: string
}

const STORAGE_KEY = 'favorite-masjids'

export function useFavoriteMasjids() {
  const [favorites, setFavorites] = useState<FavoriteMasjid[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setFavorites(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse favorite masjids', error)
      }
    }
  }, [])

  const persist = (nextFavorites: FavoriteMasjid[]) => {
    setFavorites(nextFavorites)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextFavorites))
  }

  const toggleFavorite = (favorite: FavoriteMasjid) => {
    const exists = favorites.some(
      (item) => item.cityId === favorite.cityId && item.masjidId === favorite.masjidId,
    )

    if (exists) {
      persist(favorites.filter(
        (item) => !(item.cityId === favorite.cityId && item.masjidId === favorite.masjidId),
      ))
      return
    }

    persist([...favorites, favorite])
  }

  const isFavorite = (cityId: string, masjidId: string) =>
    favorites.some((item) => item.cityId === cityId && item.masjidId === masjidId)

  const favoritesMap = useMemo(
    () => new Map(favorites.map((favorite) => [`${favorite.cityId}:${favorite.masjidId}`, favorite])),
    [favorites],
  )

  return { favorites, favoritesMap, toggleFavorite, isFavorite }
}

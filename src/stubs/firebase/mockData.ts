export type MockMasjid = {
  id: string
  name: string
  address: string
  website: string
  fajr: string
  zuhr: string
  asr: string
  maghrib: string
  isha: string
  jummah_1: string
  jummah_2: string
  timetable_pdf_url: string
}

export type MockCity = {
  id: string
  name: string
  region: string
  country: string
  masjids: MockMasjid[]
}

export const mockCities: MockCity[] = [
  {
    id: 'london',
    name: 'London',
    region: 'Greater London',
    country: 'United Kingdom',
    masjids: [
      {
        id: 'east-london-masjid',
        name: 'East London Masjid',
        address: '82-92 Whitechapel Rd, London E1 1JQ',
        website: 'https://www.eastlondonmosque.org.uk/',
        fajr: '06:00',
        zuhr: '13:15',
        asr: '15:30',
        maghrib: 'Sunset',
        isha: '19:30',
        jummah_1: '13:15',
        jummah_2: '14:00',
        timetable_pdf_url:
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60'
      },
      {
        id: 'regents-park-masjid',
        name: 'London Central Mosque',
        address: '146 Park Rd, London NW8 7RG',
        website: 'https://www.iccuk.org/',
        fajr: '06:10',
        zuhr: '13:25',
        asr: '15:40',
        maghrib: 'Sunset',
        isha: '19:40',
        jummah_1: '13:15',
        jummah_2: '14:00',
        timetable_pdf_url: 'https://files.islamicity.org/wp-content/uploads/2017/04/london-mosque.jpg'
      }
    ]
  },
  {
    id: 'toronto',
    name: 'Toronto',
    region: 'Ontario',
    country: 'Canada',
    masjids: [
      {
        id: 'islamic-foundation',
        name: 'Islamic Foundation of Toronto',
        address: '441 Nugget Ave, Scarborough, ON M1S 5E1',
        website: 'https://islamicfoundation.ca/',
        fajr: '06:20',
        zuhr: '13:30',
        asr: '15:45',
        maghrib: 'Sunset',
        isha: '19:50',
        jummah_1: '13:15',
        jummah_2: '14:30',
        timetable_pdf_url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/IFT_Toronto.jpg'
      }
    ]
  }
]

export const storageMap = new Map<string, ArrayBuffer>()

export const addCity = (city: Omit<MockCity, 'id'> & { id?: string }) => {
  const id = city.id ?? `city-${Math.random().toString(36).slice(2, 8)}`
  mockCities.push({ ...city, id, masjids: city.masjids ?? [] })
  return id
}

export const addMasjid = (cityId: string, masjid: Omit<MockMasjid, 'id'> & { id?: string }) => {
  const city = mockCities.find((item) => item.id === cityId)
  if (!city) return undefined
  const id = masjid.id ?? `masjid-${Math.random().toString(36).slice(2, 8)}`
  city.masjids.push({ ...masjid, id })
  return id
}

export const upsertMasjid = (cityId: string, masjidId: string, masjid: MockMasjid) => {
  const city = mockCities.find((item) => item.id === cityId)
  if (!city) return false
  const index = city.masjids.findIndex((item) => item.id === masjidId)
  if (index >= 0) {
    city.masjids[index] = masjid
  } else {
    city.masjids.push({ ...masjid, id: masjidId })
  }
  return true
}

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PointsState {
  totalPoints: number
  leaderboard: Array<{
    id: string
    username: string
    points: number
    rank: number
  }>
  activities: Array<{
    id: string
    type: string
    points: number
    timestamp: string
  }>
  addPoints: (points: number, activity: string) => void
  setLeaderboard: (leaderboard: Array<{
    id: string
    username: string
    points: number
    rank: number
  }>) => void
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set, get) => ({
      totalPoints: 0,
      leaderboard: [],
      activities: [],
      addPoints: (points, activity) => {
        const newActivity = {
          id: Date.now().toString(),
          type: activity,
          points,
          timestamp: new Date().toISOString(),
        }
        set({
          totalPoints: get().totalPoints + points,
          activities: [newActivity, ...get().activities].slice(0, 50),
        })
      },
      setLeaderboard: (leaderboard) => set({ leaderboard }),
    }),
    {
      name: 'points-storage',
    }
  )
)
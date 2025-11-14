import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  // Mock auth methods for demo without Supabase
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<{ error: Error | null }>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
      // Mock authentication methods
      signIn: async (email: string, password: string) => {
        try {
          // Mock successful login for demo
          const mockUser: User = {
            id: 'demo-user-' + Date.now(),
            email,
            username: email.split('@')[0],
            full_name: email.split('@')[0],
            points: 100,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          set({ user: mockUser, isAuthenticated: true })
          return { error: null }
        } catch (error) {
          return { error: error as Error }
        }
      },
      signUp: async (email: string, password: string, username: string, fullName: string) => {
        try {
          // Mock successful signup for demo
          const mockUser: User = {
            id: 'demo-user-' + Date.now(),
            email,
            username,
            full_name: fullName,
            points: 50, // Start with 50 points for new users
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
          set({ user: mockUser, isAuthenticated: true })
          return { error: null }
        } catch (error) {
          return { error: error as Error }
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
)
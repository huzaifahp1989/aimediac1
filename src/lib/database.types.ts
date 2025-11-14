export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string | null
          created_at: string
          updated_at: string
          points: number
          streak_days: number
          last_activity: string | null
        }
        Insert: {
          id?: string
          email: string
          username?: string | null
          created_at?: string
          updated_at?: string
          points?: number
          streak_days?: number
          last_activity?: string | null
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          created_at?: string
          updated_at?: string
          points?: number
          streak_days?: number
          last_activity?: string | null
        }
      }
      quran_progress: {
        Row: {
          id: string
          user_id: string
          surah: number
          ayah: number
          memorized: boolean
          bookmarked: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          surah: number
          ayah: number
          memorized?: boolean
          bookmarked?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          surah?: number
          ayah?: number
          memorized?: boolean
          bookmarked?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          user_id: string
          type: string
          points_earned: number
          description: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          points_earned: number
          description: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          points_earned?: number
          description?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
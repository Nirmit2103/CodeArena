export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          total_solved: number
          rank: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          total_solved?: number
          rank?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          total_solved?: number
          rank?: number
          created_at?: string
          updated_at?: string
        }
      }
      platform_stats: {
        Row: {
          id: string
          user_id: string
          platform: 'leetcode' | 'codeforces' | 'hackerrank'
          username: string | null
          solved_count: number
          rank: number | null
          last_sync: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          platform: 'leetcode' | 'codeforces' | 'hackerrank'
          username?: string | null
          solved_count?: number
          rank?: number | null
          last_sync?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          platform?: 'leetcode' | 'codeforces' | 'hackerrank'
          username?: string | null
          solved_count?: number
          rank?: number | null
          last_sync?: string | null
          created_at?: string
        }
      }
      performance_history: {
        Row: {
          id: string
          user_id: string
          date: string
          solved_count: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date: string
          solved_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          solved_count?: number
          created_at?: string
        }
      }
    }
  }
}
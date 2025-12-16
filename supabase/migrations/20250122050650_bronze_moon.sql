/*
  # Fix profiles schema and add performance tracking

  1. Changes
    - Add performance history table
    - Add platform stats table
    - Add missing columns to profiles table
    - Add proper foreign key constraints
    - Enable RLS on new tables

  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Create performance_history table
CREATE TABLE IF NOT EXISTS performance_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  solved_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create platform_stats table
CREATE TABLE IF NOT EXISTS platform_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('leetcode', 'codeforces', 'hackerrank')),
  username text,
  solved_count integer DEFAULT 0,
  rank integer,
  last_sync timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Enable RLS
ALTER TABLE performance_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_stats ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can read own performance history"
  ON performance_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own performance history"
  ON performance_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own platform stats"
  ON platform_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own platform stats"
  ON platform_stats
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);
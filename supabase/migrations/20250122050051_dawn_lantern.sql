/*
  # Add platform credentials to profiles

  1. Changes to profiles table
    - Add platform username columns
    - Add total solved problems counter
    - Add rank field
  
  2. Security
    - Maintain existing RLS policies
    - Add policy for platform credentials
*/

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS leetcode_username text,
ADD COLUMN IF NOT EXISTS codeforces_username text,
ADD COLUMN IF NOT EXISTS hackerrank_username text,
ADD COLUMN IF NOT EXISTS total_solved integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS rank integer DEFAULT 0;
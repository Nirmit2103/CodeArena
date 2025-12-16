-- ============================================
-- COMBINED MIGRATION FOR CODEARENA
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on id" ON profiles;
DROP POLICY IF EXISTS "Allow service role to insert profiles" ON profiles;

-- Drop existing trigger and function if they exist
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Create profiles table if not exists
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE,
  total_solved integer DEFAULT 0,
  rank integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 3: Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Step 4: Create proper RLS policies
-- Allow authenticated users to read all profiles
CREATE POLICY "Enable read access for authenticated users"
ON profiles FOR SELECT
TO authenticated
USING (true);

-- Allow users to insert their own profile during signup
CREATE POLICY "Enable insert for authenticated users"
ON profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Enable update for users based on id"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Step 4b: Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, total_solved, rank)
  VALUES (new.id, new.email, 0, 0);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4d: Create function to add platform stats (bypasses RLS)
CREATE OR REPLACE FUNCTION public.add_platform_stats(
  p_user_id uuid,
  p_platform text,
  p_username text
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.platform_stats (user_id, platform, username, solved_count)
  VALUES (p_user_id, p_platform, p_username, 0)
  ON CONFLICT (user_id, platform) DO UPDATE
  SET username = p_username;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4e: Create function to add performance history (bypasses RLS)
CREATE OR REPLACE FUNCTION public.add_performance_history(
  p_user_id uuid
)
RETURNS void AS $$
BEGIN
  INSERT INTO public.performance_history (user_id, total_solved, date)
  VALUES (p_user_id, 0, now());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 4c: Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 5: Create other necessary tables
CREATE TABLE IF NOT EXISTS friend_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user uuid REFERENCES profiles(id) ON DELETE CASCADE,
  to_user uuid REFERENCES profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(from_user, to_user)
);

ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their friend requests" ON friend_requests;
DROP POLICY IF EXISTS "Users can create friend requests" ON friend_requests;
DROP POLICY IF EXISTS "Users can update their received friend requests" ON friend_requests;

CREATE POLICY "Users can read their friend requests"
  ON friend_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user OR auth.uid() = to_user);

CREATE POLICY "Users can create friend requests"
  ON friend_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user);

CREATE POLICY "Users can update their received friend requests"
  ON friend_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = to_user);

-- Step 6: Create platform_stats table
CREATE TABLE IF NOT EXISTS platform_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('leetcode', 'codeforces', 'hackerrank')),
  username text NOT NULL,
  solved_count integer DEFAULT 0,
  last_sync timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

ALTER TABLE platform_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read all platform stats" ON platform_stats;
DROP POLICY IF EXISTS "Users can insert own platform stats" ON platform_stats;
DROP POLICY IF EXISTS "Users can update own platform stats" ON platform_stats;
DROP POLICY IF EXISTS "Service role can insert platform stats" ON platform_stats;

CREATE POLICY "Users can read all platform stats"
  ON platform_stats FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own platform stats"
  ON platform_stats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can insert platform stats"
  ON platform_stats FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Users can update own platform stats"
  ON platform_stats FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Step 7: Create performance_history table
CREATE TABLE IF NOT EXISTS performance_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  total_solved integer DEFAULT 0,
  date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE performance_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read all performance history" ON performance_history;
DROP POLICY IF EXISTS "Users can insert own performance history" ON performance_history;
DROP POLICY IF EXISTS "Service role can insert performance history" ON performance_history;

CREATE POLICY "Users can read all performance history"
  ON performance_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own performance history"
  ON performance_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can insert performance history"
  ON performance_history FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Step 8: Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  category text NOT NULL,
  github_url text,
  demo_url text,
  technologies jsonb DEFAULT '[]'::jsonb,
  likes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read projects" ON projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON projects;
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON projects;

CREATE POLICY "Anyone can read projects"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Step 9: Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  max_participants integer,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read tournaments" ON tournaments;

CREATE POLICY "Anyone can read tournaments"
  ON tournaments FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- MIGRATION COMPLETE! 
-- Your database is now ready for use.
-- ============================================

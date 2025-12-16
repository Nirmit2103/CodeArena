# Database Setup Guide 🗄️

This guide will help you set up your Supabase database for the CodeArena project.

## Quick Setup (Recommended)

### Step 1: Create a Supabase Project

1. Visit [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Choose your organization (or create one)
4. Fill in project details:
   - **Name**: CodeArena (or your preferred name)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click **"Create new project"**
6. Wait 1-2 minutes for provisioning

### Step 2: Get Your API Credentials

1. In your project dashboard, go to **Settings** (gear icon)
2. Click **API** in the left sidebar
3. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Project API keys → anon/public** key

### Step 3: Run Database Migrations

#### Option A: Using SQL Editor (Easiest)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Open each migration file from `supabase/migrations/` folder
4. Copy and paste the content **in this order**:

   **First Migration**: `20250122044859_empty_tooth.sql`
   - Creates profiles and friend_requests tables
   
   **Second Migration**: `20250122050051_dawn_lantern.sql`
   - Adds additional tables and relationships
   
   **Third Migration**: `20250122050650_bronze_moon.sql`
   - Sets up projects and tournaments tables
   
   **Fourth Migration**: `20250123120557_wooden_field.sql`
   - Final schema updates

5. Click **"Run"** for each migration
6. Verify no errors appear

#### Option B: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
npx supabase login

# Link your project
npx supabase link --project-ref your-project-ref

# Push migrations
npx supabase db push
```

### Step 4: Update Your Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Database Schema Overview

### Core Tables

#### `profiles`
Stores user profile information
- `id`: UUID (references auth.users)
- `username`: Unique username
- `created_at`: Timestamp
- `updated_at`: Timestamp

#### `friend_requests`
Manages friend connections
- `id`: UUID
- `from_user`: User sending request
- `to_user`: User receiving request
- `status`: pending/accepted/rejected
- `created_at`: Timestamp

#### `projects`
User project showcases
- Project details and metadata
- Associated with user profiles

#### `tournaments`
Competitive coding events
- Tournament information
- Participant tracking

## Security & Permissions

All tables have Row Level Security (RLS) enabled with policies:
- Users can read all profiles
- Users can manage their own data
- Proper authentication required

## Troubleshooting

### Error: "relation 'profiles' does not exist"
- **Solution**: You haven't run the migrations yet. Follow Step 3 above.

### Error: "Invalid API key"
- **Solution**: Check that you copied the correct anon key from Supabase dashboard
- Make sure you're using the **anon/public** key, not the **service_role** key

### Error: "Failed to connect to database"
- **Solution**: 
  1. Check if your Supabase project is active (not paused)
  2. Verify the Project URL is correct in `.env`
  3. Check your internet connection

### Database Expired or Paused

If your Supabase project was paused due to inactivity:

1. **For Free Tier**: Projects pause after 7 days of inactivity
   - Click **"Restore"** or **"Unpause"** in the dashboard
   - If restore fails, create a new project and run migrations

2. **Data Migration** (if needed):
   ```bash
   # Export from old project
   npx supabase db dump > backup.sql
   
   # Import to new project
   npx supabase db reset
   psql your-new-connection-string < backup.sql
   ```

### Verifying Database Setup

Run this query in SQL Editor to verify tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';
```

You should see: `profiles`, `friend_requests`, `projects`, `tournaments`, etc.

## Next Steps

After database setup:

1. ✅ Start your development server: `npm run dev`
2. ✅ Test authentication by signing up
3. ✅ Verify data is being stored in Supabase dashboard
4. ✅ Ready to deploy!

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/database/overview)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

Need help? Check the main [README.md](README.md) or open an issue!

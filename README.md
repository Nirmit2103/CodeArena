# CodeArena 🏆

A modern competitive programming platform where developers can showcase their coding skills, track their progress across multiple platforms, connect with teammates, and participate in tournaments.

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Visit%20App-success?style=for-the-badge)](https://code-arena-nirmit2103.vercel.app)

![CodeArena](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF)
![Supabase](https://img.shields.io/badge/Supabase-2.39.7-3ECF8E)

## ✨ Features

- 🎯 **Multi-Platform Integration**: Track your stats from LeetCode and HackerRank
- 📊 **Performance Analytics**: Visualize your coding progress with interactive graphs
- 👥 **Social Features**: Connect with friends, send friend requests, and find teammates
- 🏅 **Leaderboards**: Compete with others and climb the rankings
- 🎮 **Tournaments**: Participate in coding competitions
- 💼 **Project Showcase**: Share your projects and discover others' work
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- 🔒 **Secure Authentication**: Powered by Supabase Auth

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend & Database**: Supabase
- **Charts**: Recharts
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- npm or yarn
- A Supabase account (free tier works great!)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd CodeArena-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

#### Option A: Create a New Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be provisioned (1-2 minutes)

#### Option B: If Your Database Expired

If your database has expired, you need to either:
- Restore it from the Supabase dashboard (if available)
- Or create a new project and run the migrations

#### Run Database Migrations

1. In your Supabase project dashboard, go to **SQL Editor**
2. Run each migration file in order:
   - `supabase/migrations/20250122044859_empty_tooth.sql`
   - `supabase/migrations/20250122050051_dawn_lantern.sql`
   - `supabase/migrations/20250122050650_bronze_moon.sql`
   - `supabase/migrations/20250123120557_wooden_field.sql`

Alternatively, if you have Supabase CLI installed:

```bash
npx supabase db push
```

### 4. Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Get your Supabase credentials:
   - Go to your Supabase project settings
   - Navigate to **API** section
   - Copy the **Project URL** and **anon/public** key

3. Update your `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🌐 Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub:

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. Go to [Vercel](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure your project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   
6. Add Environment Variables in Vercel:
   - Go to **Settings** → **Environment Variables**
   - Add `VITE_SUPABASE_URL` with your Supabase URL
   - Add `VITE_SUPABASE_ANON_KEY` with your Supabase anon key

7. Click "Deploy"

Your app will be live in a few minutes! 🎉

### Alternative: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and add your environment variables when asked.

## 📱 Alternative Deployment Options

### Deploy to Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub repository
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables in Site Settings
6. Deploy!

### Deploy to GitHub Pages

1. Install gh-pages:

```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:

```json
"homepage": "https://your-username.github.io/CodeArena",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/CodeArena/',
  // ... rest of config
})
```

4. Deploy:

```bash
npm run deploy
```

## 🔧 Database Schema

The project uses the following main tables:

- **profiles**: User profiles and information
- **friend_requests**: Friend connection system
- **projects**: User project showcases
- **tournaments**: Competitive coding events
- **Additional tables**: Check migration files for complete schema

## 🏗️ Project Structure

```
CodeArena-main/
├── src/
│   ├── components/       # React components
│   ├── lib/             # API clients and utilities
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript type definitions
│   └── constants/       # App constants
├── supabase/
│   └── migrations/      # Database migrations
├── public/              # Static assets
└── ... config files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Database Connection Issues

If you see "Invalid API key" or connection errors:
1. Verify your `.env` file has the correct Supabase credentials
2. Check if your Supabase project is active (not paused/expired)
3. Ensure you've run all database migrations

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
2. Clear cache: `npm run build -- --force`
3. Check that all environment variables are set

### Deployment Issues

- Make sure environment variables are set in your deployment platform
- Verify the build command and output directory are correct
- Check deployment logs for specific errors

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Powered by [Supabase](https://supabase.com/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Note**: Remember to keep your `.env` file private and never commit it to GitHub! Always use `.env.example` as a template for others.

For more help, feel free to open an issue or reach out!

Happy Coding! 💻✨

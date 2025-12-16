# 📦 Project Files Overview

This document explains what each file does in your CodeArena project.

## 📁 Project Structure

```
CodeArena-main/
│
├── 📄 Configuration Files
│   ├── package.json              # Dependencies and scripts
│   ├── vite.config.ts            # Vite build configuration
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tailwind.config.js       # Tailwind CSS settings
│   ├── postcss.config.js        # PostCSS configuration
│   ├── eslint.config.js         # Code linting rules
│   └── vercel.json              # Vercel deployment config
│
├── 🔐 Environment Files
│   ├── .env                     # Your secrets (DO NOT COMMIT!)
│   ├── .env.example             # Template for environment variables
│   └── .gitignore               # Files to exclude from Git
│
├── 📖 Documentation
│   ├── README.md                # Main project documentation
│   ├── QUICKSTART.md            # Beginner-friendly guide
│   ├── DEPLOYMENT.md            # Deployment checklist
│   ├── SUPABASE_SETUP.md        # Database setup guide
│   └── GITHUB_ACTIONS.md        # CI/CD setup (optional)
│
├── 🎨 Source Code (src/)
│   ├── main.tsx                 # App entry point
│   ├── App.tsx                  # Main app component
│   ├── index.css                # Global styles
│   │
│   ├── components/              # React components
│   │   ├── Auth.tsx            # Login/signup
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Profile.tsx         # User profile
│   │   ├── Leaderboard.tsx     # Rankings
│   │   ├── Projects.tsx        # Project showcase
│   │   ├── Tournaments.tsx     # Competitions
│   │   └── ...more components
│   │
│   ├── lib/                     # Utilities and APIs
│   │   ├── supabase.ts         # Database client
│   │   ├── api.ts              # API functions
│   │   └── platformApi.ts      # External platform integrations
│   │
│   ├── store/                   # State management
│   │   ├── authStore.ts        # Authentication state
│   │   └── userStore.ts        # User data state
│   │
│   ├── types/                   # TypeScript types
│   │   ├── index.ts            # App types
│   │   └── supabase.ts         # Database types
│   │
│   └── constants/               # App constants
│       └── projectCategories.ts # Project categories
│
├── 🗄️ Database (supabase/)
│   └── migrations/              # Database schema
│       ├── 20250122044859_empty_tooth.sql
│       ├── 20250122050051_dawn_lantern.sql
│       ├── 20250122050650_bronze_moon.sql
│       └── 20250123120557_wooden_field.sql
│
└── 🤖 CI/CD (.github/)
    └── workflows/
        └── deploy.yml           # Auto-deployment workflow
```

## 🔑 Key Files Explained

### Essential Files (Don't Delete!)

#### `package.json`
- Lists all project dependencies
- Contains build and run scripts
- Defines project metadata

#### `vite.config.ts`
- Configures Vite build tool
- Sets up dev server
- Handles proxies

#### `.env`
- **CRITICAL**: Contains your secret keys
- **NEVER commit to Git**
- Required for database connection

#### `vercel.json`
- Tells Vercel how to deploy your app
- Configures routing for single-page app
- Sets build commands

### Source Code Files

#### `src/main.tsx`
- Entry point of your React app
- Renders root component
- Sets up providers

#### `src/App.tsx`
- Main application component
- Defines routes and navigation
- Handles authentication flow

#### `src/lib/supabase.ts`
- Creates database connection
- Used by all components
- Reads from `.env` file

### Database Files

#### `supabase/migrations/*.sql`
- Create database tables
- Set up relationships
- Enable security policies
- **Run these in order!**

### Documentation Files (New!)

#### `README.md`
- Complete project overview
- Installation instructions
- Deployment guide
- Troubleshooting help

#### `QUICKSTART.md`
- Step-by-step for beginners
- No technical knowledge required
- Get deployed in 20 minutes

#### `DEPLOYMENT.md`
- Detailed deployment checklist
- Pre and post-deployment tasks
- Testing procedures

#### `SUPABASE_SETUP.md`
- Database setup guide
- Migration instructions
- Troubleshooting database issues

## 📝 Important Commands

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run preview     # Preview production build

# Deployment
git push origin main  # Push code (triggers auto-deploy)
vercel --prod        # Manual deploy to Vercel
```

## 🔒 Security Notes

### Files That MUST Stay Private

- ✅ `.env` - Contains database secrets
- ✅ `.env.local` - Local environment variables
- ✅ `.vercel/` - Vercel project settings (if exists)

These are protected by `.gitignore` ✓

### Files Safe to Share

- ✅ `.env.example` - Template only, no real secrets
- ✅ All documentation files
- ✅ Source code (`src/`)
- ✅ Configuration files (except `.env`)

## 📊 File Size Reference

- `node_modules/` - ~300-500 MB (not committed to Git)
- `dist/` - ~2-5 MB (build output, not committed)
- Source code - ~1-2 MB
- Documentation - ~100 KB

## 🎯 What to Edit

### To Customize Your App

**Change app name/branding:**
- `package.json` - Update `name` field
- `index.html` - Update `<title>` tag
- `README.md` - Update project name

**Modify styling:**
- `src/index.css` - Global styles
- `tailwind.config.js` - Tailwind theme

**Add features:**
- Create new files in `src/components/`
- Add routes in `src/App.tsx`
- Update database in `supabase/migrations/`

### What NOT to Edit (Unless You Know Why)

- ❌ `node_modules/` - Auto-generated
- ❌ `dist/` - Build output, auto-generated
- ❌ `.git/` - Git internals
- ⚠️ `vite.config.ts` - Be careful!
- ⚠️ `tsconfig.json` - May break TypeScript

## 🆘 Troubleshooting

### "Module not found"
- Run `npm install`
- Check if dependency is in `package.json`

### "Build failed"
- Check `vite.config.ts` syntax
- Verify all imports in source files
- Run `npm run build` locally first

### "Can't connect to database"
- Verify `.env` file exists
- Check environment variables are correct
- Ensure Supabase project is active

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

---

**Pro Tip**: Keep this file handy as a reference when working on the project!

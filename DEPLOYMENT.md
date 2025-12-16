# 🚀 Deployment Checklist

Use this checklist to ensure your CodeArena app is ready for deployment.

## Pre-Deployment Checklist

### ✅ Environment Setup

- [ ] `.env` file is properly configured with Supabase credentials
- [ ] `.env` is listed in `.gitignore` (never commit secrets!)
- [ ] `.env.example` exists for other developers
- [ ] All environment variables are documented

### ✅ Database Setup

- [ ] Supabase project is created and active
- [ ] All migration files have been run successfully
- [ ] Database tables exist (profiles, friend_requests, projects, tournaments)
- [ ] Row Level Security (RLS) policies are enabled
- [ ] Database connection tested locally

### ✅ Code Quality

- [ ] Application runs locally without errors (`npm run dev`)
- [ ] Build completes successfully (`npm run build`)
- [ ] No console errors or warnings
- [ ] All dependencies are up to date
- [ ] TypeScript compilation successful

### ✅ Git & GitHub

- [ ] Code is pushed to GitHub repository
- [ ] Repository is public (or properly configured if private)
- [ ] `.gitignore` includes sensitive files
- [ ] Commit messages are clear and descriptive
- [ ] README.md is complete and accurate

## Deployment Steps

### For Vercel (Recommended)

1. **Connect Repository**
   - [ ] Log in to [Vercel](https://vercel.com)
   - [ ] Click "Add New Project"
   - [ ] Import your GitHub repository

2. **Configure Project**
   - [ ] Framework: Vite
   - [ ] Build Command: `npm run build`
   - [ ] Output Directory: `dist`
   - [ ] Install Command: `npm install`

3. **Set Environment Variables**
   - [ ] Add `VITE_SUPABASE_URL`
   - [ ] Add `VITE_SUPABASE_ANON_KEY`
   - [ ] Apply to: Production, Preview, Development

4. **Deploy**
   - [ ] Click "Deploy"
   - [ ] Wait for build to complete (2-5 minutes)
   - [ ] Check deployment logs for errors

5. **Verify Deployment**
   - [ ] Visit your deployment URL
   - [ ] Test user registration/login
   - [ ] Check that data saves to database
   - [ ] Test navigation between pages
   - [ ] Verify responsive design on mobile

## Post-Deployment

### Testing

- [ ] Authentication works (sign up, login, logout)
- [ ] Profile creation and updates
- [ ] Friend requests functionality
- [ ] Project showcase features
- [ ] Leaderboard displays correctly
- [ ] Tournament page loads
- [ ] API integrations (LeetCode/HackerRank) work
- [ ] All routes are accessible
- [ ] Error pages display properly

### Performance

- [ ] Page load times are acceptable
- [ ] Images and assets load properly
- [ ] No console errors in production
- [ ] Mobile responsiveness verified

### Documentation

- [ ] README.md is updated with live URL
- [ ] Environment variable instructions are clear
- [ ] Deployment steps are documented
- [ ] Contributing guidelines exist (if applicable)

## Ongoing Maintenance

### Regular Tasks

- [ ] Monitor Supabase usage (free tier limits)
- [ ] Check for security updates
- [ ] Update dependencies periodically
- [ ] Monitor error logs in Vercel dashboard
- [ ] Back up database regularly

### Supabase Free Tier Limits

- Database: 500 MB
- Bandwidth: 5 GB
- API Requests: 500K per month
- Projects pause after 7 days of inactivity

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Deploy to Vercel (with CLI)
vercel --prod
```

## Troubleshooting Common Issues

### Build Fails

1. Check package.json dependencies
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check build logs in Vercel dashboard
4. Verify environment variables are set

### Database Connection Issues

1. Verify Supabase project is active
2. Check environment variables in Vercel
3. Ensure migrations were run
4. Test connection locally first

### Authentication Problems

1. Check Supabase Auth settings
2. Verify redirect URLs in Supabase dashboard
3. Add your deployment URL to allowed URLs
4. Clear browser cache and cookies

## Need Help?

- 📖 [Vercel Documentation](https://vercel.com/docs)
- 📖 [Supabase Documentation](https://supabase.com/docs)
- 💬 Open an issue in the repository
- 📧 Contact the development team

---

**Remember**: Always test thoroughly in a preview environment before deploying to production!

🎉 Happy Deploying!

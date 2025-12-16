# GitHub Actions Setup (Optional)

This guide explains how to set up automatic deployments using GitHub Actions. **This is optional** - you can also deploy manually through the Vercel dashboard.

## What is GitHub Actions?

GitHub Actions automatically deploys your app to Vercel whenever you push code to the main branch. This means:
- No manual deployment steps needed
- Every push triggers a new deployment
- Pull requests get preview deployments

## Setup Instructions

### 1. Get Vercel Tokens

1. Go to [Vercel](https://vercel.com)
2. Deploy your project manually first (see main README.md)
3. Go to **Settings** → **Tokens**
4. Click **Create Token**
5. Name it "GitHub Actions" and create it
6. **Copy the token** (you won't see it again!)

### 2. Get Vercel Project IDs

Run these commands in your project directory:

```bash
npm i -g vercel
vercel login
vercel link
```

This creates a `.vercel` folder. Check these files:
- `.vercel/project.json` - contains `projectId`
- Account settings in Vercel dashboard - contains `orgId`

### 3. Add GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

| Secret Name | Description | Where to find |
|------------|-------------|---------------|
| `VERCEL_TOKEN` | Your Vercel token | From Step 1 |
| `VERCEL_ORG_ID` | Your organization ID | From `.vercel/project.json` or Vercel dashboard |
| `VERCEL_PROJECT_ID` | Your project ID | From `.vercel/project.json` |
| `VITE_SUPABASE_URL` | Your Supabase URL | From `.env` file |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase key | From `.env` file |

### 4. Enable Actions

1. Go to your repository's **Actions** tab
2. If asked, enable GitHub Actions
3. The workflow will run automatically on your next push

## How It Works

The workflow (`.github/workflows/deploy.yml`) does:

1. ✅ Checks out your code
2. ✅ Sets up Node.js
3. ✅ Installs dependencies
4. ✅ Runs linting
5. ✅ Builds the project
6. ✅ Deploys to Vercel

## Testing the Workflow

Make a small change and push:

```bash
git add .
git commit -m "Test GitHub Actions deployment"
git push origin main
```

Go to the **Actions** tab to see the workflow running.

## Disabling Auto-Deploy

If you prefer manual deployments:

1. Delete `.github/workflows/deploy.yml`
2. Or disable the workflow in **Settings** → **Actions**

Then deploy manually:

```bash
vercel --prod
```

## Troubleshooting

### Workflow Fails

- Check the Actions tab for error logs
- Verify all secrets are set correctly
- Ensure secret names match exactly (case-sensitive)

### Build Errors

- Test the build locally: `npm run build`
- Check that environment variables are set
- Review the workflow logs for specific errors

### Deployment Permission Errors

- Verify `VERCEL_TOKEN` is valid and not expired
- Check that `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
- Ensure the token has deployment permissions

## Alternative: Vercel GitHub Integration

Instead of GitHub Actions, you can use Vercel's native GitHub integration:

1. Go to Vercel dashboard
2. Click "Import Project"
3. Connect your GitHub repository
4. Vercel will automatically deploy on every push

This is simpler and doesn't require GitHub Actions setup!

---

**Recommended**: Use Vercel's native GitHub integration for easier setup. Only use GitHub Actions if you need custom build steps or advanced CI/CD features.

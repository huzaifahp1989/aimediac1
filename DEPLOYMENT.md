# Deploying Islam Media Central to GitHub Pages

This guide will help you deploy the Islamic Media Central website to GitHub Pages.

## Prerequisites

1. **GitHub Account**: You need a GitHub account
2. **Repository**: Create a new repository on GitHub (e.g., `islam-media-central`)
3. **Git**: Git must be installed on your local machine

## Step-by-Step Deployment

### 1. Initialize Git Repository

If you haven't already initialized git in your project:

```bash
git init
git add .
git commit -m "Initial commit - Islam Media Central"
```

### 2. Add Remote Repository

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**

### 4. Set Up Repository Secrets (Optional)

If you want to use real Supabase credentials:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

### 5. Update Base Path (Important!)

**Update the base path in `vite.config.ts`:**

```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/', // Change this to your actual repository name
  // ... rest of config
})
```

For example, if your repository is named `islam-media-central`, change it to:
```typescript
base: '/islam-media-central/',
```

### 6. Deploy

Simply push your code to the main branch:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy your site.

### 7. Access Your Site

Once the deployment is complete (usually takes 2-3 minutes), your site will be available at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

## Troubleshooting

### Build Fails
- Check the **Actions** tab in your repository for build logs
- Ensure all dependencies are properly installed
- Run `npm run build` locally to test

### 404 Errors
- Verify the base path in `vite.config.ts` matches your repository name exactly
- Check that the build artifacts are in the correct location

### Missing Assets
- Ensure all image paths are relative and work with the base path
- Check browser developer tools for 404 errors on assets

### PWA Not Working
- Make sure the site is served over HTTPS (GitHub Pages does this automatically)
- Check that the service worker is registered properly

## Features That Work Offline

The PWA configuration includes offline support for:
- ✅ Quran text and translations
- ✅ Prayer times (cached for 24 hours)
- ✅ Radio stream metadata (cached for 1 hour)
- ✅ Static assets (CSS, JS, images)
- ✅ App shell for instant loading

## Custom Domain (Optional)

To use a custom domain:
1. Go to **Settings** → **Pages** in your repository
2. Under **Custom domain**, enter your domain
3. Follow the DNS configuration instructions provided
4. Add a `CNAME` file to your repository with your domain name

## Environment Variables

For production deployment, you can set these environment variables in your repository secrets:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

If not set, the app will use mock authentication for demo purposes.

## Support

If you encounter any issues during deployment:
1. Check the GitHub Actions logs
2. Test the build locally with `npm run build`
3. Verify all file paths and imports are correct
4. Ensure your repository is public (for free GitHub Pages hosting)

---

**🌙 May your Islamic media platform bring benefit to the Muslim community worldwide!**
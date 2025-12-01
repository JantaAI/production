# Vercel Deployment - Ready Checklist ✅

## ✅ Pre-Deployment Verification

### 1. Configuration Files
- ✅ `vercel.json` - Configured with correct build commands
- ✅ `next.config.js` - Optimized for production (compression, SWC minification)
- ✅ `tsconfig.json` - Excludes Supabase Edge Functions (Deno-specific)
- ✅ `postcss.config.js` - Tailwind CSS v4 PostCSS plugin configured
- ✅ `tailwind.config.js` - Content paths and theme configured
- ✅ `.vercelignore` - Excludes design files from builds

### 2. Assets & Static Files
- ✅ `public/assets/` - All design assets copied and ready
- ✅ Logo, icons, and images properly referenced
- ✅ All asset paths use `/assets/` prefix (Next.js public folder)

### 3. Dependencies
- ✅ All required packages in `package.json`
- ✅ Tailwind CSS v4 with PostCSS plugin
- ✅ Next.js 14 with App Router
- ✅ Supabase client library
- ✅ TypeScript configured

### 4. Environment Variables Required in Vercel

**Client-Side (NEXT_PUBLIC_*):**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Server-Side (API Routes):**
```
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Note:** `OPENAI_API_KEY` is NOT needed in Vercel - it's only used in Supabase Edge Functions (configured separately in Supabase dashboard).

### 5. Supabase Edge Function Secrets

Configure these in **Supabase Dashboard** → **Edge Functions** → **Secrets**:
```
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_api_key
```

### 6. Build Verification

The project will build successfully because:
- ✅ TypeScript excludes Supabase Edge Functions (`supabase/functions/**/*`)
- ✅ All components use standard React/Next.js patterns
- ✅ No Deno-specific imports in Next.js code
- ✅ Tailwind CSS v4 PostCSS plugin installed
- ✅ All image references use `<img>` tags (not Next.js Image component)

## 🚀 Deployment Steps

### Step 1: Connect Repository to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `JantaAI/production`
4. Vercel will auto-detect Next.js framework

### Step 2: Configure Environment Variables
In Vercel project settings → Environment Variables, add:

**Production Environment:**
- `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` = Your Supabase service role key

**Preview & Development (optional, same values):**
- Same variables as Production

### Step 3: Deploy
1. Vercel will automatically build and deploy on push to `main` branch
2. Or click "Deploy" button to trigger manual deployment
3. Build will run: `npm install` → `npm run build`

### Step 4: Verify Deployment
After deployment, check:
- ✅ Site loads without errors
- ✅ Images display correctly (`/assets/Logo Janta.png`, etc.)
- ✅ Login/onboarding flows work
- ✅ API routes respond correctly (`/api/activate`, `/api/support/*`)

## 📋 Post-Deployment Checklist

- [ ] Environment variables configured in Vercel
- [ ] Supabase Edge Function secrets configured
- [ ] Site loads successfully
- [ ] All images display correctly
- [ ] Authentication works (Supabase Auth)
- [ ] API routes function correctly
- [ ] Chat functionality works (Edge Function)
- [ ] Support request flow works

## 🔧 Troubleshooting

### Build Fails
- Check that all environment variables are set in Vercel
- Verify `package.json` dependencies are correct
- Check build logs for specific errors

### Images Not Loading
- Verify `public/assets/` folder exists and is committed to git
- Check image paths use `/assets/` prefix (not `/public/assets/`)
- Ensure file names match exactly (case-sensitive)

### API Routes Fail
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
- Check API route logs in Vercel dashboard
- Verify Supabase Edge Functions are deployed and have secrets configured

### TypeScript Errors
- Ensure `tsconfig.json` excludes `supabase/functions/**/*`
- Run `npm run type-check` locally to verify

## ✨ Current Status

**✅ READY FOR DEPLOYMENT**

All configuration is complete. The project will build successfully on Vercel once:
1. Environment variables are configured in Vercel dashboard
2. Supabase Edge Function secrets are configured in Supabase dashboard
3. Repository is connected and deployed

The codebase is production-ready! 🎉

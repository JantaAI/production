# 🚀 Final Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

### Code Status: ✅ READY
- [x] All Edge Functions deployed and active
- [x] All API endpoints correctly mapped
- [x] CORS configured on all Edge Functions
- [x] Environment variables properly validated
- [x] Client/server separation correct
- [x] Database schema correct
- [x] RLS policies enabled
- [x] Security functions configured
- [x] Performance indexes created

## Required Configuration Steps

### Step 1: Configure Supabase Edge Function Secrets

**Location**: Supabase Dashboard → Edge Functions → Secrets

Add these 3 secrets:

1. **SUPABASE_URL**
   - Value: Your Supabase project URL (e.g., `https://xxxxx.supabase.co`)
   - Get from: Supabase Dashboard → Project Settings → API → Project URL

2. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Your Supabase service role key
   - Get from: Supabase Dashboard → Project Settings → API → service_role key
   - ⚠️ Keep secret!

3. **OPENAI_API_KEY**
   - Value: Your OpenAI API key
   - Get from: OpenAI Dashboard → API Keys
   - ⚠️ Keep secret!

### Step 2: Configure Vercel Environment Variables

**Location**: Vercel Dashboard → Your Project → Settings → Environment Variables

Add these 4 variables (set for Production, Preview, and Development):

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: Same as SUPABASE_URL above
   - Example: `https://xxxxx.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: Your Supabase anonymous key
   - Get from: Supabase Dashboard → Project Settings → API → anon key

3. **SUPABASE_SERVICE_ROLE_KEY**
   - Value: Same as Edge Function secret above
   - ⚠️ Keep secret! Never expose to client

4. **OPENAI_API_KEY**
   - Value: Same as Edge Function secret above
   - ⚠️ Keep secret! Never expose to client

### Step 3: Deploy to Vercel

1. **Connect Repository**
   - Go to vercel.com
   - Click "New Project"
   - Import `JantaAI/production` repository
   - Framework: Next.js (auto-detected)

2. **Configure Build**
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Add Environment Variables**
   - Add all 4 variables from Step 2
   - Set for all environments

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Check deployment logs

## Post-Deployment Verification

### Test These URLs:

1. **Main Page**
   - `https://your-app.vercel.app`
   - Should load without errors

2. **Login**
   - Click "Log in"
   - Enter phone + password
   - Should authenticate successfully

3. **Onboarding**
   - Enter activation code
   - Complete profile
   - Should activate user

4. **Chat**
   - Send a message
   - Should receive AI response

5. **Support**
   - Click "Customer Service"
   - Request support
   - Should create support request

6. **Support Dashboard**
   - `https://your-app.vercel.app/support-dashboard`
   - Should load support requests

## Troubleshooting

### Error: "Missing environment variable"
- **Solution**: Check Vercel Dashboard → Environment Variables
- Make sure variable names match exactly (case-sensitive)
- Make sure they're set for the correct environment

### Error: "Edge Function error"
- **Solution**: Check Supabase Dashboard → Edge Functions → Secrets
- Verify all 3 secrets are configured
- Check Supabase logs for specific errors

### Error: "Not authenticated"
- **Solution**: Verify user is logged in
- Check Supabase auth is working
- Verify JWT token is valid

### Error: "CORS error"
- **Solution**: Edge Functions already have CORS configured
- Check browser console for specific error
- Verify request is going to correct endpoint

### Error: "Failed to fetch"
- **Solution**: Check Supabase URL is correct
- Verify Edge Functions are deployed
- Check network tab for specific error

## Edge Function Endpoints Reference

| Function | Endpoint | Auth | Method |
|----------|----------|------|--------|
| Chat | `/functions/v1/chat-entrypoint` | JWT | POST |
| Support | `/functions/v1/support-call` | JWT | POST |
| Activate | `/functions/v1/activate-user` | None | POST |
| Generate Code | `/functions/v1/generate-activation-code` | Service Key | POST |
| Get History | `/functions/v1/get-user-chat-history` | Service Key | GET |
| Update Status | `/functions/v1/update-support-status` | Service Key | POST/PATCH |

## Database Tables Reference

| Table | Purpose | RLS |
|-------|---------|-----|
| `users` | User accounts | ✅ Enabled |
| `companies` | Company info | ✅ Enabled |
| `plans` | Insurance plans | ✅ Enabled |
| `chat_messages` | Chat history | ✅ Enabled |
| `chat_summaries` | Chat summaries | ✅ Enabled |
| `support_requests` | Support tickets | ✅ Enabled |

## Status: ✅ **READY FOR DEPLOYMENT**

All code is verified and ready. Just configure:
1. ✅ Supabase Edge Function secrets (manual)
2. ✅ Vercel environment variables (manual)
3. ✅ Deploy!

**Everything else is already configured correctly!** 🎉

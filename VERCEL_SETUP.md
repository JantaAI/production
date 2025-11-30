# Vercel Deployment Setup

## Required Environment Variables

### Client-Side (Public)
These are exposed to the browser and should be prefixed with `NEXT_PUBLIC_`:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Server-Side (Private)
These are only available server-side:

- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (keep secret!)
- `OPENAI_API_KEY` - Your OpenAI API key (keep secret!)

## How to Configure

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add each variable with the appropriate value
4. Make sure to set them for all environments (Production, Preview, Development)

## Supabase Edge Function Secrets

Edge Functions also need secrets configured in Supabase:

1. Go to Supabase Dashboard → Edge Functions → Secrets
2. Add the following secrets:
   - `SUPABASE_URL` - Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` - Your service role key
   - `OPENAI_API_KEY` - Your OpenAI API key

## Where to Get Values

- **Supabase URL & Keys**: Supabase Dashboard → Project Settings → API
- **OpenAI API Key**: OpenAI Dashboard → API Keys

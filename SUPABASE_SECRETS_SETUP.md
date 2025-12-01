# Supabase Edge Function Secrets Setup

## Required Secrets for Edge Functions

All Edge Functions need these secrets configured in Supabase Dashboard:

### 1. SUPABASE_URL
- **Value**: Your Supabase project URL
- **Example**: `https://xxxxx.supabase.co`
- **Where to get**: Supabase Dashboard → Project Settings → API → Project URL
- **Used by**: All Edge Functions

### 2. SUPABASE_SERVICE_ROLE_KEY
- **Value**: Your Supabase service role key
- **⚠️ Keep this secret!** Never expose to client
- **Where to get**: Supabase Dashboard → Project Settings → API → service_role key
- **Used by**: All Edge Functions

### 3. OPENAI_API_KEY
- **Value**: Your OpenAI API key
- **⚠️ Keep this secret!** Never expose to client
- **Where to get**: OpenAI Dashboard → API Keys → Create new secret key
- **Used by**: `chat-entrypoint` function only

## How to Configure

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Click on "Edge Functions" in the left sidebar
   - Click on "Secrets" tab

2. **Add Each Secret**
   - Click "Add Secret"
   - Enter the secret name (exactly as shown above)
   - Enter the secret value
   - Click "Save"

3. **Verify Secrets**
   - All secrets should appear in the list
   - They will be available to all Edge Functions automatically

## Verification

After adding secrets, test an Edge Function:
- Try calling `/functions/v1/chat-entrypoint` with a valid JWT
- Check Supabase logs if there are errors
- Verify the function can access the secrets

## Important Notes

- Secrets are **environment-specific** (production vs development)
- Secrets are **encrypted** and stored securely
- Secrets are **automatically injected** into Edge Functions via `Deno.env.get()`
- Never commit secrets to git or expose them in client-side code

## Status

✅ **Secrets configuration documented**
⚠️ **Manual step required**: Add secrets in Supabase Dashboard before deployment

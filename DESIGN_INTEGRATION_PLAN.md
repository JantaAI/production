# Design Integration Plan

## Overview
The designs are in `designs/Janta/` - a React/Vite project with Tailwind CSS v4. We need to integrate this into our Next.js app.

## Key Components to Integrate

### 1. Authentication Flow
- **Login.tsx** → Connect to Supabase auth
- **OnboardingECode.tsx** → Connect to activation code API
- **OnboardingE.tsx** → Connect to user activation API
- **OnboardingF.tsx** → Founder onboarding (similar flow)

### 2. Main Application
- **App.tsx** → Main app with:
  - Chat interface → Use `useChat()` hook
  - Customer Service → Use `useSupport()` hook
  - Status widget → Use `useSupportStatus()` hook
  - Wallet view (founders only)
  - Internal dashboard → Use support dashboard API routes

### 3. Styling
- Tailwind CSS v4 (needs Next.js setup)
- ABC Diatype font
- Custom design tokens

### 4. Assets
- Images in `designs/Janta/src/assets/`
- Logo: `janta-logo-new.png`

## Integration Steps

1. ✅ Set up Tailwind CSS v4 for Next.js
2. ✅ Copy and adapt components for Next.js App Router
3. ✅ Integrate Login with Supabase auth
4. ✅ Integrate Onboarding with activation API
5. ✅ Integrate Chat with `useChat()` hook
6. ✅ Integrate Customer Service with `useSupport()` hook
7. ✅ Copy assets to `public/` folder
8. ✅ Update main page to use design
9. ✅ Test end-to-end

## API Mapping

### Design → Backend
- Login → Supabase `signInWithPassword()`
- Onboarding Code → `generateActivationCode()` Edge Function
- Onboarding Complete → `activateUser()` Edge Function
- Chat Messages → `useChat()` → `chat-entrypoint` Edge Function
- Customer Service → `useSupport()` → `support-call` Edge Function
- Support Status → `useSupportStatus()` → Real-time updates
- Internal Dashboard → `/api/support/*` routes

## Notes
- Design uses Vite, we're using Next.js - need to adapt
- Design uses Tailwind v4, need to configure for Next.js
- Some components use Radix UI (already in design dependencies)
- Font: ABC Diatype (need to add to project)

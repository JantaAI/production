# Janta - Insurance Assistant Platform

A Next.js application for insurance assistance with AI-powered chat and support dashboard.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
```

3. Run the development server:
```bash
npm run dev
```

## Project Structure

- `app/` - Next.js app router pages and API routes
- `lib/` - Shared utilities, API clients, and hooks
- `components/` - React components
- `supabase/` - Database migrations and Edge Functions
- `designs/` - Designer-provided UI components

## Features

- User activation system
- AI-powered chat assistant
- Support request system
- Internal support dashboard
- Real-time status updates

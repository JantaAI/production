# Design Integration Guide

This guide helps integrate designer-provided UI components with the existing backend.

## Where to Place Files

- **Components**: `designs/components/`
- **Pages**: `designs/pages/`
- **Assets**: `designs/assets/`
- **Styles**: `designs/styles/`

## Integration Steps

1. Place designer files in the appropriate folder
2. Review components and identify what needs backend connection
3. Update components to use existing hooks and API clients:
   - `useChat()` for chat functionality
   - `useSupport()` for support requests
   - `useSupportStatus()` for status updates
   - API clients from `lib/api/`

## Key Integration Points

- Chat interface → `lib/hooks/useChat.ts`
- Support button → `lib/hooks/useSupport.ts`
- Support status widget → `lib/hooks/useSupportStatus.ts`
- Support dashboard → `lib/api/support-dashboard.ts`

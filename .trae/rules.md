# Project Rules

## Stack
- Next.js 14 App Router (NOT pages router)
- TypeScript with strict types
- Tailwind CSS for all styling
- shadcn/ui for all components
- Supabase for auth and database
- Google Gemini Flash for AI
- Zod for validation

## Coding Rules
- Always use async/await, never .then()
- Always handle errors with try/catch
- Always add loading and error states to UI
- Use server components by default
- Only add "use client" when needed for interactivity
- Always add TypeScript types, no 'any'
- Keep components small and focused

## File Structure
- API routes in app/api/
- Reusable components in components/
- Database functions in lib/supabase/
- AI functions in lib/ai/
- TypeScript types in types/

## UI Rules
- Mobile responsive always
- Use shadcn Button, Card, Input components
- Show loading spinner during async operations
- Show error message when something fails
- Success state after completion
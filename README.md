# Himalayan Adventures 2026 — Live Next.js Version

This is the corrected project for the real website. It is a Next.js App Router application, not the old collection of HTML pages.

## What is included

- 30+ real Next.js routes
- Tour database seed data in `lib/tours.ts`
- Dynamic tour detail pages
- AI travel-agent server route
- Live Open-Meteo weather route
- Interactive OpenStreetMap/Leaflet map
- Booking form/server route
- Supabase-ready database schema
- Admin dashboard shell
- Responsive 2026-style design

Next.js uses file-system routing, so folders under `app/` become real website URLs.

## Important

The website is **not yet connected to your private Supabase/OpenAI accounts**. That is intentional. Never put private API keys in GitHub.

## Local development

Requires Node.js 20.9+.

1. Copy `.env.example` to `.env.local`.
2. Add your service values when we connect them.
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:3000

## Production

The next steps are:
1. Push this folder to your GitHub repository.
2. Import the repository into Vercel.
3. Create the Supabase project and run `supabase/schema.sql`.
4. Add environment variables in Vercel.
5. Connect Supabase Auth for customer/admin login.
6. Replace starter tour data with your real inventory.
7. Add production email/payment providers.

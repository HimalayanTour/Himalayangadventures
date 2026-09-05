create table if not exists public.tours (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country text not null,
  days text not null,
  price text not null,
  difficulty text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  tour_slug text,
  name text not null,
  email text not null,
  dates text,
  travelers integer default 1,
  message text,
  status text default 'new',
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;
alter table public.tours enable row level security;

create policy "public can read tours" on public.tours for select using (true);

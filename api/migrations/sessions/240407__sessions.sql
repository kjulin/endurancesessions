create schema if not exists sessions;

create table if not exists sessions.sessions (
  id text primary key default uuid_generate_v4(),
  user_id text not null,
  title text not null,
  date timestamptz not null,
  raw_data jsonb
);
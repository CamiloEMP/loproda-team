create table profiles (
  id uuid references auth.users not null,
  alias uuid not null default uuid_generate_v4(),
  name text,
  lastname text,
  avatar text,
  username text unique,
  createat timestamp with time zone default NOW(),

  active boolean default false,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles
  enable row level security;

create policy "Los perfiles públicos son visibles por todos" on profiles
  for select using (true);

create policy "Las usuarios pueden insertar su propio perfil." on profiles
  for insert with check (auth.uid() = id);

create policy "Las usuarios pueden actualizar su propio perfil." on profiles
  for update using (auth.uid() = id);

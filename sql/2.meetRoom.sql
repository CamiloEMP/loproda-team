create table meetroom (
  id uuid default uuid_generate_v4(),

  twilioname text not null,
  twiliomax int2 not null default 2,

  name varchar,
  description varchar,
  status int2 not null default 2,
  shortid varchar not null,

  userid uuid references profiles not null,

  active boolean default false,

  createat timestamp with time zone default NOW(),
  primary key(id),
  unique(twilioname)
)

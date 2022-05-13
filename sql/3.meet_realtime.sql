create table meetevents (
  id bigint generated by default as identity primary key,
  type varchar not null,
  data jsonb,
  createat timestamp with time zone default timezone('utc'::text, now()) not null
);

drop publication If exists meet;
create publication meet for table meetevents;
--! Previous: -
--! Hash: sha1:1200397a789e75fae99dc2c89e37e81b5d4d4518

-- Enter migration here

drop table if exists "todos";


create table
 todos (
   id text not null,
   created_at timestamp with time zone not null default now(),
   updated_at timestamp with time zone not null default now(),
   name text not null,
   done boolean not null,
   constraint todos_pkey primary key (id)
 ) tablespace pg_default;

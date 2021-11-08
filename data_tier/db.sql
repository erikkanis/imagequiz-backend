create schema if not exists imagequiz;

drop table imagequiz.customer cascade;

create table imagequiz.customer (
    id bigserial primary key,
    name text not null,
    email text not null,
    password text not null
); 
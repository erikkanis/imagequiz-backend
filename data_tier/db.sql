create schema if not exists imagequiz;

drop table if exists imagequiz.flower;
drop table if exists imagequiz.score;
drop table if exists imagequiz.quiz_question cascade;
drop table if exists imagequiz.quiz cascade;
drop table if exists imagequiz.question cascade;
drop table if exists imagequiz.customer cascade;
drop table if exists imagequiz.category cascade;



create table imagequiz.customer (
    id bigserial primary key,
    name text not null,
    email text not null,
    password text not null
);

create table imagequiz.flower
(
    id bigserial primary key,
    name text not null,
    picture text not null
);

create table imagequiz.question (
    id bigserial primary key,
    picture text not null,
    choices text not null,
    answer text not null
); 

create table imagequiz.category (
    id bigserial primary key,
    name text not null
);

create table imagequiz.quiz (
    id bigserial primary key,
    name text not null,
    category_id int not null REFERENCES imagequiz.category(id)
);

create table imagequiz.score
(
    id bigserial primary key,
    customer_id int not null references imagequiz.customer(id),
    quiz_id int not null references imagequiz.quiz(id),
    score int not null,
    date timestamp not null default now()
);

create table imagequiz.quiz_question (
    quiz_id int not null REFERENCES imagequiz.quiz(id),
    question_id int not null REFERENCES imagequiz.question(id)
);

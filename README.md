Query to create table in "passportchallenge" database

CREATE TABLE users" (
    "id" serial,
    "username" varchar(20) NOT NULL,
    "password" text NOT NULL,
    PRIMARY KEY ("id"),
    UNIQUE ("username")
);

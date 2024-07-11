
/*jobly.sql*/
\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE jobly;
CREATE DATABASE jobly;
\connect jobly

\i jobly-schema.sql
\i jobly-seed.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE jobly_test;
CREATE DATABASE jobly_test;
\connect jobly_test

\i jobly-schema.sql


/*jobly-schema.sql*/
CREATE TABLE companies (
  handle VARCHAR(25) PRIMARY KEY CHECK (handle = lower(handle)),
  name TEXT UNIQUE NOT NULL,
  num_employees INTEGER CHECK (num_employees >= 0),
  description TEXT NOT NULL,
  logo_url TEXT
);

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  salary INTEGER CHECK (salary >= 0),
  equity NUMERIC CHECK (equity <= 1.0),
  company_handle VARCHAR(25) NOT NULL
    REFERENCES companies ON DELETE CASCADE
);

CREATE TABLE applications (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  job_id INTEGER
    REFERENCES jobs ON DELETE CASCADE,
  PRIMARY KEY (username, job_id)
);


/*jobly-schema.sql*/
-- Insert test users
INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

-- Insert companies
INSERT INTO companies (handle, name, num_employees, description, logo_url)
VALUES ('bauer-gallagher', 'Bauer-Gallagher', 862,
        'Difficult ready trip question produce produce someone.', NULL),
       ('edwards-lee-reese', 'Edwards, Lee and Reese', 744,
        'To much recent it reality coach decision Mr. Dog language evidence minute either deep situation pattern. Other cold bad loss surface real show.',
        '/logos/logo2.png'),
       ...
       ('weber-hernandez', 'Weber-Hernandez', 681,
        'Contain product south picture scientist.', '/logos/logo4.png');

-- Insert jobs
INSERT INTO jobs (title, salary, equity, company_handle)
VALUES ('Conservator, furniture', 110000, 0, 'watson-davis'),
       ('Information officer', 200000, 0, 'hall-mills'),
       ...
       ('Psychologist, occupational', 190000, NULL, 'robbins-marsh-martin');

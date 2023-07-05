<<<<<<< HEAD
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);
=======
-- Users table seeds here (Example)
INSERT INTO users (name, email, password) VALUES ('Alice', 'alice@gmail.com','alice');
INSERT INTO users (name, email, password) VALUES ('Kira','kira@gmail.com','kira');
INSERT INTO users (name, email, password) VALUES ('Peter','peter@gmail.com','peter');
INSERT INTO users (name, email, password) VALUES ('Phat','phat@gmail.com','phat');
>>>>>>> 20e1c76770a22b00214a66e06e8bc64807ba548e

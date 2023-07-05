<<<<<<< HEAD
DROP TABLE IF EXISTS maps CASCADE;
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  favorite BOOLEAN NOT NULL DEFAULT FALSE
);
=======
INSERT INTO maps(user_id, name) VALUES (1, 'Coffee Shop');
INSERT INTO maps(user_id, name) VALUES (2, 'Bookstores');
INSERT INTO maps(user_id, name) VALUES (3, 'Brewery');
INSERT INTO maps(user_id, name) VALUES (4, 'Beaches');
>>>>>>> 20e1c76770a22b00214a66e06e8bc64807ba548e

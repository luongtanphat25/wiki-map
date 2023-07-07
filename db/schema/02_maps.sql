-- Drop the table if it exists
DROP TABLE IF EXISTS maps CASCADE;

-- Create the maps table
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  favorite BOOLEAN NOT NULL DEFAULT FALSE
);

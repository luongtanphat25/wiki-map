-- Drop the table if it exists
DROP TABLE IF EXISTS maps CASCADE;

-- Create the maps table
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  img_url VARCHAR(255),
  longitude DOUBLE PRECISION,
  latitude DOUBLE PRECISION,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

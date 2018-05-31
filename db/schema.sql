\c kidskorner

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS chats CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users
(

  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE,
  email VARCHAR (100) UNIQUE NOT NULL,
  pw_hash VARCHAR (300) NOT NULL,
  img_url TEXT
);

CREATE TABLE products
(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users (id),
  name TEXT NOT NULL,
  description TEXT,
  price INT,
  image_url TEXT
);

-- CREATE TABLE chats
-- (
--   id SERIAL PRIMARY KEY,
--   sender_id INT REFERENCES users (id),
--   recipient_id INT REFERENCES users (id),
--   product_id INT REFERENCES products (id)
-- );

-- CREATE TABLE messages
-- (
--   id SERIAL PRIMARY KEY,
--   chat_id INT REFERENCES chats (id),
--   user_id INT REFERENCES users (id),
--   content TEXT
-- );

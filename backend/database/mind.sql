CREATE TABLE deck(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) UNIQUE NOT NULL,
    type VARCHAR(255),
    description TEXT
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE deck ADD COLUMN user_id INTEGER REFERENCES users(id);

CREATE TABLE user_deck(
    id SERIAL PRIMARY KEY
);

ALTER TABLE user_deck ADD COLUMN user_id INTEGER REFERENCES users(id);
ALTER TABLE user_deck ADD COLUMN deck_id INTEGER REFERENCES deck(id);

ALTER TABLE users ADD COLUMN gravatar VARCHAR(255);

CREATE TABLE card(
    id SERIAL PRIMARY KEY,
    content JSON,
    relation TEXT
);

ALTER TABLE card ADD COLUMN deck_id INTEGER REFERENCES deck(id);

CREATE TABLE user_card_parameters(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    card_id INTEGER REFERENCES card(id),
    racha INTEGER,
    ef FLOAT,
    interval_repeat INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

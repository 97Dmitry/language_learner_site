-- USERS --
create TABLE auth_user(
    user_id SERIAL PRIMARY KEY,
    username  VARCHAR(15) UNIQUE NOT NULL,
    user_password  VARCHAR(225) NOT NULL,
    user_email VARCHAR(35)
);

create TABLE permissions(
    permission_id SERIAL PRIMARY KEY,
    permission VARCHAR(35)
);

create TABLE user_permissions(
    user_id int REFERENCES auth_user (user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    permission_id int REFERENCES permissions (permission_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT auth_user_permissions_pkey PRIMARY KEY (user_id, permission_id)
);

create TABLE token(
    token_id VARCHAR(150) UNIQUE NOT NULL,
    user_id int REFERENCES auth_user (user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- WORDS --
create TABLE word(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES auth_user (user_id),
    learning_word VARCHAR(35),
    knowledge INTEGER DEFAULT 0
);

create TABLE translation_verb(
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES word (id) ON UPDATE CASCADE ON DELETE CASCADE,
    translation_option VARCHAR(35)
);

create TABLE translation_noun(
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES word (id) ON UPDATE CASCADE ON DELETE CASCADE,
    translation_option VARCHAR(35)
);

create TABLE general_translation(
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES word (id) ON UPDATE CASCADE ON DELETE CASCADE,
    translation_option VARCHAR(35)
);
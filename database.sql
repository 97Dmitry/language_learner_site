
create TABLE auth_user(
    id SERIAL PRIMARY KEY,
    username VARCHAR(15),
    user_password VARCHAR(225),
    user_email VARCHAR(35)
);

create TABLE word(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES auth_user (id),
    learning_word VARCHAR(35),
--     translation_verb text[],
--     translation_noun text[],
--     general_translate text[],
    knowledge INTEGER DEFAULT 0
);

create TABLE translation_verb(
    id SERIAL PRIMARY KEY,
    word_id INTEGER,
    FOREIGN KEY (word_id) REFERENCES word (id),
    translation_option VARCHAR(35)
);

create TABLE translation_noun(
    id SERIAL PRIMARY KEY,
    word_id INTEGER,
    FOREIGN KEY (word_id) REFERENCES word (id),
    translation_option VARCHAR(35)
);

create TABLE general_translate(
    id SERIAL PRIMARY KEY,
    word_id INTEGER,
    FOREIGN KEY (word_id) REFERENCES word (id),
    translation_option VARCHAR(35)
);
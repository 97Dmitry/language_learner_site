
create TABLE auth_user(
    id SERIAL PRIMARY KEY,
    username VARCHAR(15),
    user_password VARCHAR(25)
);

create TABLE word(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES auth_user (id),
    learning_word VARCHAR(30),
    translation_verb text[],
    translation_noun text[],
    general_translate text[],
    knowledge INTEGER DEFAULT 0
);
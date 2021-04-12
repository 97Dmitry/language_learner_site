
create TABLE auth_user(
    id SERIAL PRIMARY KEY,
    username VARCHAR(15),
    user_password VARCHAR(25)
);

create TABLE word(
    id SERIAL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES auth_user(id),
    learning_word VARCHAR(30),
    translation_verb VARCHAR(30),
    translation_noun VARCHAR(30),
    general_translate VARCHAR(30),
    knowledge INTEGER DEFAULT 0
);
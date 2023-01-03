DROP TABLE IF EXISTS menu CASCADE;

CREATE TABLE menu (
    id SERIAL NOT NULL PRIMARY KEY,
    "name" text NOT NULL,
    category text NOT NULL,
    calories float NOT NULL,
    total_fat float NOT NULL,
    saturated_fat float NOT NULL,
    trans_fat float NOT NULL,
    protein float NOT NULL,
    carbohydrate float NOT NULL
);

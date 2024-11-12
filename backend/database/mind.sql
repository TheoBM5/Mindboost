CREATE TABLE users (
    id serial4 NOT NULL,
    username varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    gravatar varchar(255) NULL,
    CONSTRAINT users_email_key UNIQUE (email),
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_username_key UNIQUE (username)
);

CREATE TABLE preference (
    id serial4 NOT NULL,
    user_id int NOT NULL,
    img_duck varchar(255) DEFAULT '1',
    color_duck varchar(255) DEFAULT 'blue',
    mode_color varchar(255) DEFAULT 'light',
    CONSTRAINT preference_pkey PRIMARY KEY (id),
    CONSTRAINT preference_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE deck (
    id serial4 NOT NULL,
    title varchar(255) NOT NULL,
    "type" varchar(255) NULL,
    description text NULL,
    user_id int4 NULL,
    icon_name varchar(255) NULL DEFAULT 'Star'::character varying,
    CONSTRAINT deck_pkey PRIMARY KEY (id),
    CONSTRAINT deck_title_key UNIQUE (title),
    CONSTRAINT deck_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_deck (
    id serial4 NOT NULL,
    user_id int4 NULL,
    deck_id int4 NULL,
    CONSTRAINT user_deck_pkey PRIMARY KEY (id),
    CONSTRAINT user_deck_deck_id_fkey FOREIGN KEY (deck_id) REFERENCES deck(id),
    CONSTRAINT user_deck_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE card (
    id serial4 NOT NULL,
    "content" json NULL,
    typecard text NULL,
    deck_id int4 NULL,
    user_id int4 NULL,
    CONSTRAINT card_pkey PRIMARY KEY (id),
    CONSTRAINT card_deck_id_fkey FOREIGN KEY (deck_id) REFERENCES deck(id),
    CONSTRAINT card_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Table Triggers

CREATE TRIGGER after_card_insert
AFTER INSERT
ON public.card
FOR EACH ROW
EXECUTE FUNCTION public.card_parameters();

-- public.user_card_parameters definition

-- Drop table

-- DROP TABLE public.user_card_parameters;

CREATE TABLE public.user_card_parameters (
    idcard int4 NOT NULL DEFAULT nextval('user_card_parameters_id_seq'::regclass),
    user_id int4 NULL,
    card_id int4 NULL,
    racha int4 NULL,
    ef float8 NULL,
    interval_repeat int4 NULL,
    date_creation timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    review_date date NULL DEFAULT CURRENT_DATE,
    CONSTRAINT user_card_parameters_pkey PRIMARY KEY (idcard),
    CONSTRAINT user_card_parameters_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.card(id),
    CONSTRAINT user_card_parameters_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Table Triggers

CREATE TRIGGER trigger_copy_user_card_parameters
AFTER UPDATE
ON public.user_card_parameters
FOR EACH ROW
EXECUTE FUNCTION public.copy_user_card_parameters();

-- public.user_card_parameters_copies definition

-- Drop table

-- DROP TABLE public.user_card_parameters_copies;

CREATE TABLE public.user_card_parameters_copies (
    id serial4 NOT NULL,
    racha int4 NULL,
    ef float8 NULL,
    interval_repeat int4 NULL,
    review_date date NULL,
    parameter_id int4 NULL,
    CONSTRAINT user_card_parameters_copies_pkey PRIMARY KEY (id),
    CONSTRAINT user_card_parameters_copies_parameter_id_fkey FOREIGN KEY (parameter_id) REFERENCES public.user_card_parameters(idcard)
);

-- DROP FUNCTION public.card_parameters();

CREATE OR REPLACE FUNCTION public.card_parameters()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    INSERT INTO user_card_parameters (user_id, card_id, racha, ef, interval_repeat)
    VALUES (NEW.user_id, NEW.id, 0, 2.5, 1);
    RETURN NEW;
END;
$function$;

-- DROP FUNCTION public.copy_user_card_parameters();

CREATE OR REPLACE FUNCTION public.copy_user_card_parameters()
RETURNS trigger
LANGUAGE plpgsql
AS $function$
BEGIN
    -- Insertar una copia de los datos actualizados en la tabla de copias
    INSERT INTO user_card_parameters_copies (parameter_id, racha, ef, interval_repeat, review_date)
    VALUES (NEW.idcard, NEW.racha, NEW.ef, NEW.interval_repeat, NEW.review_date);
    RETURN NEW;
END;
$function$;
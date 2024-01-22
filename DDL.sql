CREATE TABLE customer(
    id integer serial PRIMARY KEY NOT NULL,
    name character varying(200) NOT NULL,
    email character varying(200) NOT NULL,
    phone character varying(20) NOT NULL,
    CONSTRAINT email UNIQUE (email)
)

------------------------------------------------------------------------
CREATE TABLE location(
    id integer serial PRIMARY KEY NOT NULL ,
    email character varying(200) NOT NULL,
    customer character varying(80) NOT NULL,
    description character varying(200) NOT NULL,
    rating integer NOT NULL,
    "long" double precision NOT NULL,
    lat double precision NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp without time zone,
    title character varying(100),
    CONSTRAINT name UNIQUE (email)
)

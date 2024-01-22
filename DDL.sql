-- Table: public.customer

-- DROP TABLE IF EXISTS public.customer;

CREATE TABLE IF NOT EXISTS public.customer
(
    id integer NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
    name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    phone character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.customer
    OWNER to postgres;




------------------------------------------------------------------------
-- Table: public.location

-- DROP TABLE IF EXISTS public.location;

CREATE TABLE IF NOT EXISTS public.location
(
    id integer NOT NULL DEFAULT nextval('customer_id_seq'::regclass),
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    customer character varying(80) COLLATE pg_catalog."default" NOT NULL,
    description character varying(200) COLLATE pg_catalog."default" NOT NULL,
    rating integer NOT NULL,
    "long" double precision NOT NULL,
    lat double precision NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp without time zone,
    title character varying COLLATE pg_catalog."default",
    CONSTRAINT name UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.location
    OWNER to postgres;
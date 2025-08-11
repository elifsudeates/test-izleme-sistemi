-- DROP SCHEMA public;

CREATE SCHEMA public AUTHORIZATION pg_database_owner;

-- DROP SEQUENCE public.item_id_seq;

CREATE SEQUENCE public.item_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.item_test_doc_id_seq;

CREATE SEQUENCE public.item_test_doc_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.item_test_id_seq;

CREATE SEQUENCE public.item_test_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE public.test_id_seq;

CREATE SEQUENCE public.test_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;-- public.item definition

-- Drop table

-- DROP TABLE public.item;

CREATE TABLE public.item (
	id serial4 NOT NULL,
	parca_no varchar(20) NOT NULL,
	tanimi text NOT NULL,
	seri_no varchar(20) NOT NULL,
	is_emri varchar(20) NOT NULL,
	aselsan_is_emri varchar(20) NOT NULL,
	proje varchar(50) NOT NULL,
	create_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	update_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT item_pkey PRIMARY KEY (id)
);


-- public.item_test_doc definition

-- Drop table

-- DROP TABLE public.item_test_doc;

CREATE TABLE public.item_test_doc (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	url text NOT NULL,
	item_test_id int4 NOT NULL,
	is_delete bool DEFAULT false NULL,
	is_active bool DEFAULT true NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	update_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT item_test_doc_pkey PRIMARY KEY (id)
);


-- public.test definition

-- Drop table

-- DROP TABLE public.test;

CREATE TABLE public.test (
	id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	item_no varchar(50) NULL,
	sira int4 NULL,
	is_delete bool DEFAULT false NULL,
	is_active bool DEFAULT true NULL,
	CONSTRAINT test_pkey PRIMARY KEY (id)
);


-- public.item_test definition

-- Drop table

-- DROP TABLE public.item_test;

CREATE TABLE public.item_test (
	id serial4 NOT NULL,
	item_id int4 NOT NULL,
	test_id int4 NOT NULL,
	test_zamani timestamp NOT NULL,
	created_date timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	is_delete bool DEFAULT false NULL,
	is_active bool DEFAULT true NULL,
	status varchar(50) DEFAULT 'beklemede'::character varying NULL,
	CONSTRAINT item_test_pkey PRIMARY KEY (id),
	CONSTRAINT item_test_item_fk FOREIGN KEY (item_id) REFERENCES public.item(id),
	CONSTRAINT item_test_test_fk FOREIGN KEY (test_id) REFERENCES public.test(id)
);

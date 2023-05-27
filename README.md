# Todo List

Small todo app meant to test Next 13 features, backend/data providers, UI components, etc...

## [todos-lzear.vercel.app](https://todos-lzear.vercel.app)

## Features / Todos

- Integrations:
  - [x] Cookies as a data store (no third party)
  - [x] [Aiven](https://aiven.io/)
  - [x] [CockroachDB](https://www.cockroachlabs.com/)
  - [x] [ElephantSQL](https://www.elephantsql.com/)
  - [x] [FaunaDB](https://fauna.com/)
  - [x] [Fly.io](https://fly.io/)
  - [x] [Neon](https://neon.tech/)
  - [x] [PlanetScale](https://planetscale.com/)
  - [x] [Railway](https://railway.app/)
  - [x] [Supabase](https://supabase.com/)
  - [x] [Turso](https://turso.tech/)
  - [x] [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [ ] Find a React component library that works well with Next 13
- [ ] Stop sharing the todos across users


## Getting started locally

Run `yarn install`, then `yarn dev`.

To make the different databases work locally, you will need to create accounts
with the third parties and add your credentials in your `.env`.

You will also need to create the todos table:

```sql
-- PostgreSQL table for most providers
CREATE TABLE IF NOT EXISTS "todos" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"done" boolean NOT NULL
);

-- MySQL table for PlanetScale
CREATE TABLE `Todo` (
	`id` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
	`updatedAt` datetime(3) NOT NULL,
	`name` text NOT NULL,
	`done` tinyint(1) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY `Todo_id_key` (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_unicode_ci;
```

## Test

* Unit tests: `yarn test`
* Cypress tests: `yarn e2e`

## Screenshots

### Home screen:

![screenshot-1.png](screenshots/screenshot-1.png)

### Todo list:

![screenshot-2.png](screenshots/screenshot-2.png)

### Cypress tests:

![screenshot-3.png](screenshots/screenshot-3.png)

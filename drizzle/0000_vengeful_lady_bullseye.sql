CREATE TABLE `todos` (
	`id` varchar(255) PRIMARY KEY NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	`name` text NOT NULL,
	`done` boolean NOT NULL);

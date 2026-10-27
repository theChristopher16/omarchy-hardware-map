CREATE TABLE `reports` (
	`id` text PRIMARY KEY NOT NULL,
	`device` text NOT NULL,
	`component` text NOT NULL,
	`status` text NOT NULL,
	`version` text NOT NULL,
	`summary` text NOT NULL,
	`source` text NOT NULL,
	`author_id` text NOT NULL,
	`created_at` text NOT NULL
);

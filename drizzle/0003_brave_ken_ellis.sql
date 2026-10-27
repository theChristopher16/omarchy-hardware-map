CREATE TABLE `claims` (
	`report_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`handle` text NOT NULL,
	`expires_at` text NOT NULL
);

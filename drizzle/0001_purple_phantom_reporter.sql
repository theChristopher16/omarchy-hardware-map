CREATE TABLE `moderators` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `proposals` (
	`id` text PRIMARY KEY NOT NULL,
	`report_id` text,
	`author_id` text NOT NULL,
	`action` text NOT NULL,
	`state` text NOT NULL,
	`device` text NOT NULL,
	`component` text NOT NULL,
	`status` text NOT NULL,
	`version` text NOT NULL,
	`summary` text NOT NULL,
	`source` text NOT NULL,
	`base_updated_at` text,
	`created_at` text NOT NULL,
	`reviewed_at` text,
	`reviewer_id` text,
	`review_note` text
);
--> statement-breakpoint
ALTER TABLE `reports` ADD `updated_at` text;--> statement-breakpoint
ALTER TABLE `reports` ADD `archived_at` text;--> statement-breakpoint
ALTER TABLE `reports` ADD `kind` text DEFAULT 'Community report' NOT NULL;
ALTER TABLE `proposals` ADD `specs` text DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE `proposals` ADD `build_stage` text DEFAULT 'Unknown' NOT NULL;--> statement-breakpoint
ALTER TABLE `reports` ADD `specs` text DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE `reports` ADD `build_stage` text DEFAULT 'Unknown' NOT NULL;
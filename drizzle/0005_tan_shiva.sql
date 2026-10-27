CREATE TABLE `traffic_daily` (
	`day` text PRIMARY KEY NOT NULL,
	`page_views` integer DEFAULT 0 NOT NULL,
	`node_selections` integer DEFAULT 0 NOT NULL,
	`source_opens` integer DEFAULT 0 NOT NULL
);

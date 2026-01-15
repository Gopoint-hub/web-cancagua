ALTER TABLE `events` MODIFY COLUMN `end_date` timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `total_capacity` int;--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `available_capacity` int;--> statement-breakpoint
ALTER TABLE `events` ADD `slug` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `content_html` text;--> statement-breakpoint
ALTER TABLE `events` ADD `images` text;--> statement-breakpoint
ALTER TABLE `events` ADD `external_link` text;--> statement-breakpoint
ALTER TABLE `events` ADD `featured` int DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `status` enum('draft','active','ended') DEFAULT 'draft' NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD CONSTRAINT `events_slug_unique` UNIQUE(`slug`);--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `image_url`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `active`;
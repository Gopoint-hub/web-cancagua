CREATE TABLE `content_translations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`content_key` varchar(255) NOT NULL,
	`language` varchar(10) NOT NULL,
	`original_content` text NOT NULL,
	`translated_content` text NOT NULL,
	`content_hash` varchar(64) NOT NULL,
	`is_reviewed` int NOT NULL DEFAULT 0,
	`reviewed_by` int,
	`reviewed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_translations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `page_translations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`page_id` int NOT NULL,
	`language` varchar(10) NOT NULL,
	`translated_slug` varchar(255) NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`is_reviewed` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `page_translations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `site_pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`page_type` varchar(50) NOT NULL,
	`title_es` text NOT NULL,
	`description_es` text,
	`active` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_pages_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_pages_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `events` DROP INDEX `events_slug_unique`;--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `end_date` timestamp;--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `total_capacity` int NOT NULL;--> statement-breakpoint
ALTER TABLE `events` MODIFY COLUMN `available_capacity` int NOT NULL;--> statement-breakpoint
ALTER TABLE `events` ADD `image_url` text;--> statement-breakpoint
ALTER TABLE `events` ADD `active` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `content_translations` ADD CONSTRAINT `content_translations_reviewed_by_users_id_fk` FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `page_translations` ADD CONSTRAINT `page_translations_page_id_site_pages_id_fk` FOREIGN KEY (`page_id`) REFERENCES `site_pages`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `slug`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `content_html`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `images`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `external_link`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `featured`;--> statement-breakpoint
ALTER TABLE `events` DROP COLUMN `status`;
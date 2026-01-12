CREATE TABLE `analytics_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`event_type` varchar(100) NOT NULL,
	`page` varchar(255),
	`referrer` text,
	`user_agent` text,
	`ip_address` varchar(45),
	`session_id` varchar(255),
	`metadata` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `analytics_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`skedu_id` varchar(255),
	`email` varchar(320) NOT NULL,
	`name` text,
	`phone` varchar(50),
	`subscribed_to_newsletter` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`last_synced_at` timestamp,
	CONSTRAINT `clients_id` PRIMARY KEY(`id`),
	CONSTRAINT `clients_skedu_id_unique` UNIQUE(`skedu_id`)
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`skedu_id` varchar(255),
	`title` text NOT NULL,
	`description` text,
	`start_date` timestamp NOT NULL,
	`end_date` timestamp,
	`duration` int,
	`price` int,
	`total_capacity` int NOT NULL,
	`available_capacity` int NOT NULL,
	`category` varchar(100),
	`image_url` text,
	`location` text,
	`active` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`last_synced_at` timestamp,
	CONSTRAINT `events_id` PRIMARY KEY(`id`),
	CONSTRAINT `events_skedu_id_unique` UNIQUE(`skedu_id`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject` text NOT NULL,
	`content` text NOT NULL,
	`status` enum('draft','scheduled','sent') NOT NULL DEFAULT 'draft',
	`scheduled_at` timestamp,
	`sent_at` timestamp,
	`recipient_count` int DEFAULT 0,
	`open_count` int DEFAULT 0,
	`click_count` int DEFAULT 0,
	`created_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletter_campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` text,
	`status` enum('pending','active','unsubscribed') NOT NULL DEFAULT 'pending',
	`confirmed_at` timestamp,
	`unsubscribed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletter_subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`skedu_id` varchar(255),
	`name` text NOT NULL,
	`description` text,
	`duration` int,
	`price` int,
	`category` varchar(100),
	`image_url` text,
	`active` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`last_synced_at` timestamp,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_skedu_id_unique` UNIQUE(`skedu_id`)
);
--> statement-breakpoint
CREATE TABLE `webhook_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`event` varchar(255) NOT NULL,
	`payload` text NOT NULL,
	`processed` int NOT NULL DEFAULT 0,
	`error` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `webhook_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `newsletter_campaigns` ADD CONSTRAINT `newsletter_campaigns_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
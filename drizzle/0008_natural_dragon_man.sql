CREATE TABLE `list_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`list_id` int NOT NULL,
	`subscriber_id` int NOT NULL,
	`added_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `list_subscribers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_lists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`newsletter_id` int NOT NULL,
	`list_id` int NOT NULL,
	`added_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletter_lists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_sends` (
	`id` int AUTO_INCREMENT NOT NULL,
	`newsletter_id` int NOT NULL,
	`subscriber_id` int NOT NULL,
	`status` enum('pending','sent','failed','bounced') NOT NULL DEFAULT 'pending',
	`sent_at` timestamp,
	`opened_at` timestamp,
	`clicked_at` timestamp,
	`error` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletter_sends_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsletters` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subject` text NOT NULL,
	`html_content` text NOT NULL,
	`text_content` text,
	`design_prompt` text,
	`status` enum('draft','scheduled','sending','sent','failed') NOT NULL DEFAULT 'draft',
	`scheduled_at` timestamp,
	`sent_at` timestamp,
	`recipient_count` int NOT NULL DEFAULT 0,
	`open_count` int NOT NULL DEFAULT 0,
	`click_count` int NOT NULL DEFAULT 0,
	`created_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `newsletters_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriber_lists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`segmentation_rules` text,
	`subscriber_count` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriber_lists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `newsletter_campaigns`;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` MODIFY COLUMN `status` enum('active','unsubscribed') NOT NULL DEFAULT 'active';--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` ADD `source` varchar(100) DEFAULT 'website' NOT NULL;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` ADD `metadata` text;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` ADD `subscribed_at` timestamp DEFAULT (now()) NOT NULL;--> statement-breakpoint
ALTER TABLE `list_subscribers` ADD CONSTRAINT `list_subscribers_list_id_subscriber_lists_id_fk` FOREIGN KEY (`list_id`) REFERENCES `subscriber_lists`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `list_subscribers` ADD CONSTRAINT `list_subscribers_subscriber_id_newsletter_subscribers_id_fk` FOREIGN KEY (`subscriber_id`) REFERENCES `newsletter_subscribers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_lists` ADD CONSTRAINT `newsletter_lists_newsletter_id_newsletters_id_fk` FOREIGN KEY (`newsletter_id`) REFERENCES `newsletters`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_lists` ADD CONSTRAINT `newsletter_lists_list_id_subscriber_lists_id_fk` FOREIGN KEY (`list_id`) REFERENCES `subscriber_lists`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_sends` ADD CONSTRAINT `newsletter_sends_newsletter_id_newsletters_id_fk` FOREIGN KEY (`newsletter_id`) REFERENCES `newsletters`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_sends` ADD CONSTRAINT `newsletter_sends_subscriber_id_newsletter_subscribers_id_fk` FOREIGN KEY (`subscriber_id`) REFERENCES `newsletter_subscribers`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletters` ADD CONSTRAINT `newsletters_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `newsletter_subscribers` DROP COLUMN `confirmed_at`;
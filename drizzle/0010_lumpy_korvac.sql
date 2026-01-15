CREATE TABLE `discount_code_usages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`discount_code_id` int NOT NULL,
	`user_id` int,
	`user_email` varchar(320),
	`order_id` varchar(100),
	`order_type` varchar(50),
	`original_amount` int NOT NULL,
	`discount_amount` int NOT NULL,
	`final_amount` int NOT NULL,
	`used_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `discount_code_usages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `discount_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(50) NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`discount_type` enum('percentage','fixed') NOT NULL DEFAULT 'percentage',
	`discount_value` int NOT NULL,
	`min_purchase` int NOT NULL DEFAULT 0,
	`max_discount` int,
	`max_uses` int,
	`max_uses_per_user` int NOT NULL DEFAULT 1,
	`current_uses` int NOT NULL DEFAULT 0,
	`assigned_user_id` int,
	`applicable_services` text,
	`starts_at` timestamp,
	`expires_at` timestamp,
	`active` int NOT NULL DEFAULT 1,
	`created_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `discount_codes_id` PRIMARY KEY(`id`),
	CONSTRAINT `discount_codes_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
CREATE TABLE `gift_card_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`gift_card_id` int NOT NULL,
	`transaction_type` enum('purchase','redemption','refund') NOT NULL,
	`amount` int NOT NULL,
	`balance_before` int NOT NULL,
	`balance_after` int NOT NULL,
	`order_id` varchar(100),
	`order_type` varchar(50),
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gift_card_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gift_cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`code` varchar(20) NOT NULL,
	`amount` int NOT NULL,
	`balance` int NOT NULL,
	`background_image` varchar(255) NOT NULL DEFAULT 'default',
	`recipient_name` text,
	`recipient_email` varchar(320),
	`recipient_phone` varchar(50),
	`sender_name` text,
	`sender_email` varchar(320),
	`personal_message` text,
	`purchase_status` enum('pending','completed','cancelled') NOT NULL DEFAULT 'pending',
	`payment_method` varchar(50),
	`payment_reference` varchar(100),
	`delivery_method` enum('email','whatsapp','download') NOT NULL DEFAULT 'email',
	`delivered_at` timestamp,
	`expires_at` timestamp NOT NULL,
	`redeemed_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `gift_cards_id` PRIMARY KEY(`id`),
	CONSTRAINT `gift_cards_code_unique` UNIQUE(`code`)
);
--> statement-breakpoint
ALTER TABLE `discount_code_usages` ADD CONSTRAINT `discount_code_usages_discount_code_id_discount_codes_id_fk` FOREIGN KEY (`discount_code_id`) REFERENCES `discount_codes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `discount_code_usages` ADD CONSTRAINT `discount_code_usages_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `discount_codes` ADD CONSTRAINT `discount_codes_assigned_user_id_users_id_fk` FOREIGN KEY (`assigned_user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `discount_codes` ADD CONSTRAINT `discount_codes_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `gift_card_transactions` ADD CONSTRAINT `gift_card_transactions_gift_card_id_gift_cards_id_fk` FOREIGN KEY (`gift_card_id`) REFERENCES `gift_cards`(`id`) ON DELETE cascade ON UPDATE no action;
CREATE TABLE `corporate_clients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` text NOT NULL,
	`contact_name` text NOT NULL,
	`contact_email` varchar(320) NOT NULL,
	`contact_phone` varchar(50),
	`rut` varchar(20),
	`address` text,
	`city` varchar(100),
	`country` varchar(100) DEFAULT 'Chile',
	`notes` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `corporate_clients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `corporate_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`category` varchar(100) NOT NULL,
	`price_type` enum('per_person','flat') NOT NULL DEFAULT 'per_person',
	`unit_price` int NOT NULL,
	`duration` int,
	`max_capacity` int,
	`includes` text,
	`active` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `corporate_products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quote_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quote_id` int NOT NULL,
	`product_id` int,
	`product_name` text NOT NULL,
	`description` text,
	`quantity` int NOT NULL,
	`unit_price` int NOT NULL,
	`total` int NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quote_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`quote_number` varchar(50) NOT NULL,
	`client_id` int,
	`client_name` text NOT NULL,
	`client_email` varchar(320) NOT NULL,
	`number_of_people` int NOT NULL,
	`event_date` date,
	`itinerary` text,
	`subtotal` int NOT NULL,
	`total` int NOT NULL,
	`valid_until` date NOT NULL,
	`status` enum('draft','sent','approved','event_completed','paid','invoiced') NOT NULL DEFAULT 'draft',
	`notes` text,
	`created_by` int,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`sent_at` timestamp,
	`approved_at` timestamp,
	CONSTRAINT `quotes_id` PRIMARY KEY(`id`),
	CONSTRAINT `quotes_quote_number_unique` UNIQUE(`quote_number`)
);
--> statement-breakpoint
ALTER TABLE `quote_items` ADD CONSTRAINT `quote_items_quote_id_quotes_id_fk` FOREIGN KEY (`quote_id`) REFERENCES `quotes`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quote_items` ADD CONSTRAINT `quote_items_product_id_corporate_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `corporate_products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quotes` ADD CONSTRAINT `quotes_client_id_corporate_clients_id_fk` FOREIGN KEY (`client_id`) REFERENCES `corporate_clients`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quotes` ADD CONSTRAINT `quotes_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;
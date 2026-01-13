CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50) NOT NULL,
	`service_type` varchar(255) NOT NULL,
	`preferred_date` timestamp NOT NULL,
	`number_of_people` int NOT NULL,
	`message` text,
	`status` enum('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(50),
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`status` enum('new','read','replied') NOT NULL DEFAULT 'new',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);

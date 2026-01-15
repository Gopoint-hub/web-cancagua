ALTER TABLE `contact_messages` MODIFY COLUMN `phone` varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE `contact_messages` DROP COLUMN `subject`;
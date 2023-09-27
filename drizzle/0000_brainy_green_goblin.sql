-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `equipment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`description` text,
	CONSTRAINT `equipment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `exercise` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`description` text,
	`muscle_group_id` int,
	`equipment_id` int,
	CONSTRAINT `exercise_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `muscle_group` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`description` text,
	CONSTRAINT `muscle_group_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `routine` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255),
	`name` varchar(255),
	`description` text,
	`start_date` date,
	`end_date` date,
	`active` tinyint,
	CONSTRAINT `routine_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `routine_workout` (
	`id` int AUTO_INCREMENT NOT NULL,
	`routine_id` int,
	`workout_id` int,
	CONSTRAINT `routine_workout_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255),
	`exercise_id` int,
	CONSTRAINT `user_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(255) NOT NULL,
	`email` varchar(255),
	`first_name` varchar(255),
	`last_name` varchar(255),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workout` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255),
	`name` text,
	`date` datetime,
	`notes` text,
	CONSTRAINT `workout_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workout_exercise` (
	`id` int AUTO_INCREMENT NOT NULL,
	`workout_id` int,
	`exercise_id` int,
	`sets` int,
	`repetitions` int,
	`weight` decimal(10,0),
	`duration` time,
	`rest_time` time,
	CONSTRAINT `workout_exercise_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `muscle_group_id` ON `exercise` (`muscle_group_id`);--> statement-breakpoint
CREATE INDEX `equipment_id` ON `exercise` (`equipment_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `routine` (`user_id`);--> statement-breakpoint
CREATE INDEX `routine_id` ON `routine_workout` (`routine_id`);--> statement-breakpoint
CREATE INDEX `workout_id` ON `routine_workout` (`workout_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `user_progress` (`user_id`);--> statement-breakpoint
CREATE INDEX `exercise_id` ON `user_progress` (`exercise_id`);--> statement-breakpoint
CREATE INDEX `user_id` ON `workout` (`user_id`);--> statement-breakpoint
CREATE INDEX `workout_id` ON `workout_exercise` (`workout_id`);--> statement-breakpoint
CREATE INDEX `exercise_id` ON `workout_exercise` (`exercise_id`);
*/
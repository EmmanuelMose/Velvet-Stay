ALTER TABLE "Users" ADD COLUMN "FirstName" varchar(100);--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "LastName" varchar(100);--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "Firstname";--> statement-breakpoint
ALTER TABLE "Users" DROP COLUMN "Lastname";
ALTER TABLE "Users" ADD COLUMN "IsVerified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "VerificationCode" varchar(10);
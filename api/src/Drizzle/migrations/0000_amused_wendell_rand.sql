CREATE TYPE "public"."BookingStatus" AS ENUM('Pending', 'Confirmed', 'Cancelled');--> statement-breakpoint
CREATE TYPE "public"."PaymentStatus" AS ENUM('Pending', 'Completed', 'Failed');--> statement-breakpoint
CREATE TYPE "public"."Role" AS ENUM('User', 'Admin');--> statement-breakpoint
CREATE TYPE "public"."TicketStatus" AS ENUM('Open', 'Resolved');--> statement-breakpoint
CREATE TABLE "Bookings" (
	"BookingId" serial PRIMARY KEY NOT NULL,
	"UserId" integer,
	"RoomId" integer,
	"CheckInDate" timestamp,
	"CheckOutDate" timestamp,
	"TotalAmount" real,
	"BookingStatus" "BookingStatus" DEFAULT 'Pending',
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "CustomerSupportTickets" (
	"TicketId" serial PRIMARY KEY NOT NULL,
	"UserId" integer,
	"Subject" varchar(255),
	"Description" text,
	"Status" "TicketStatus" DEFAULT 'Open',
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Hotels" (
	"HotelId" serial PRIMARY KEY NOT NULL,
	"Name" varchar(255),
	"Location" varchar(255),
	"Address" text,
	"ContactPhone" varchar(20),
	"Category" varchar(100),
	"Rating" real,
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Payments" (
	"PaymentId" serial PRIMARY KEY NOT NULL,
	"BookingId" integer,
	"Amount" real,
	"PaymentStatus" "PaymentStatus" DEFAULT 'Pending',
	"PaymentDate" timestamp DEFAULT now(),
	"PaymentMethod" varchar(100),
	"TransactionId" varchar(255),
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Rooms" (
	"RoomId" serial PRIMARY KEY NOT NULL,
	"HotelId" integer,
	"RoomType" varchar(100),
	"PricePerNight" real,
	"Capacity" integer,
	"Amenities" text,
	"IsAvailable" boolean DEFAULT true,
	"CreatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"UserId" serial PRIMARY KEY NOT NULL,
	"FirstName" varchar(100),
	"LastName" varchar(100),
	"Email" varchar(255),
	"Password" varchar(255),
	"ContactPhone" varchar(20),
	"Address" text,
	"Role" "Role" DEFAULT 'User',
	"CreatedAt" timestamp DEFAULT now(),
	"UpdatedAt" timestamp DEFAULT now(),
	CONSTRAINT "Users_Email_unique" UNIQUE("Email")
);
--> statement-breakpoint
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_RoomId_Rooms_RoomId_fk" FOREIGN KEY ("RoomId") REFERENCES "public"."Rooms"("RoomId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "CustomerSupportTickets" ADD CONSTRAINT "CustomerSupportTickets_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_BookingId_Bookings_BookingId_fk" FOREIGN KEY ("BookingId") REFERENCES "public"."Bookings"("BookingId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_HotelId_Hotels_HotelId_fk" FOREIGN KEY ("HotelId") REFERENCES "public"."Hotels"("HotelId") ON DELETE no action ON UPDATE no action;
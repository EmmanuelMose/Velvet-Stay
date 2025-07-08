ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_UserId_Users_UserId_fk";
--> statement-breakpoint
ALTER TABLE "Bookings" DROP CONSTRAINT "Bookings_RoomId_Rooms_RoomId_fk";
--> statement-breakpoint
ALTER TABLE "CustomerSupportTickets" DROP CONSTRAINT "CustomerSupportTickets_UserId_Users_UserId_fk";
--> statement-breakpoint
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_BookingId_Bookings_BookingId_fk";
--> statement-breakpoint
ALTER TABLE "Rooms" DROP CONSTRAINT "Rooms_HotelId_Hotels_HotelId_fk";
--> statement-breakpoint
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_RoomId_Rooms_RoomId_fk" FOREIGN KEY ("RoomId") REFERENCES "public"."Rooms"("RoomId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "CustomerSupportTickets" ADD CONSTRAINT "CustomerSupportTickets_UserId_Users_UserId_fk" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("UserId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_BookingId_Bookings_BookingId_fk" FOREIGN KEY ("BookingId") REFERENCES "public"."Bookings"("BookingId") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_HotelId_Hotels_HotelId_fk" FOREIGN KEY ("HotelId") REFERENCES "public"."Hotels"("HotelId") ON DELETE cascade ON UPDATE cascade;
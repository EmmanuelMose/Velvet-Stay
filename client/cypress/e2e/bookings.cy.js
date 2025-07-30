describe("Bookings CRUD Test Suite", () => {
  let bookingId;

  // CREATE Booking
  it("should create a new booking", () => {
    cy.request("POST", "http://localhost:3000/booking", {
      userId: 2,
      roomId: 7,
      checkInDate: "2025-09-01T12:00:00",
      checkOutDate: "2025-09-05T10:00:00",
      totalAmount: 15000,
      bookingStatus: "Pending"
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property("booking");
      bookingId = res.body.booking.bookingId;
    });
  });

  // GET All Bookings
  it("should fetch all bookings", () => {
    cy.request("GET", "http://localhost:3000/bookings").then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });

  // GET Booking by ID
  it("should fetch booking by ID", () => {
    cy.request("GET", `http://localhost:3000/booking/${bookingId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("data"); 
      expect(res.body.data.bookingId).to.eq(bookingId);
    });
  });

  // DELETE Booking
  it("should delete the booking", () => {
    cy.request("DELETE", `http://localhost:3000/booking/${bookingId}`).then((res) => {
      expect(res.status).to.eq(202); 
      expect(res.body.message).to.include("deleted");
    });
  });

  // GET Deleted Booking
  it("should return 404 for deleted booking", () => {
    cy.request({
      method: "GET",
      url: `http://localhost:3000/booking/${bookingId}`,
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});

describe("Rooms API E2E", () => {
  const baseUrl = "http://localhost:3000";
  const testHotelId = 7;
  let createdRoomId;

  const validRoom = {
    hotelId: testHotelId,
    roomType: "Double Deluxe",
    pricePerNight: 120.0,
    capacity: 3,
    amenities: ["AC", "TV", "Mini Bar"],
    isAvailable: true,
  };

  const updatedRoom = {
    roomType: "Executive Suite",
    pricePerNight: 200.0,
    capacity: 4,
    amenities: ["AC", "TV", "Mini Bar", "Jacuzzi"],
    isAvailable: false,
  };

  it("should create a new room", () => {
    cy.request("POST", `${baseUrl}/room`, validRoom).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body.room).to.have.property("roomId");
      createdRoomId = res.body.room.roomId;
    });
  });

  it("should get all rooms", () => {
    cy.request("GET", `${baseUrl}/rooms`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an("array");
    });
  });

  it("should return 404 for non-existent room ID", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/room/9999`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  it("should update the room", () => {
    cy.request("PUT", `${baseUrl}/room/${createdRoomId}`, updatedRoom).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Room updated successfully");
    });
  });

  it("should return 404 when updating non-existent room", () => {
    cy.request({
      method: "PUT",
      url: `${baseUrl}/room/999999`,
      body: updatedRoom,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  

  it("should return empty array for available rooms in hotel with none", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/room/available/999999`,
      failOnStatusCode: false,
    }).then((res) => {
      expect([200, 404]).to.include(res.status); // depends on your API
      if (res.status === 200) {
        expect(res.body).to.be.an("array").and.have.length(0);
      }
    });
  });

  it("should delete the room", () => {
    cy.request("DELETE", `${baseUrl}/room/${createdRoomId}`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq("Room deleted successfully");
    });
  });

  it("should return 404 when trying to get deleted room", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/room/${createdRoomId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.message).to.eq("Room not found");
    });
  });

  it("should return 404 when trying to delete room again", () => {
    cy.request({
      method: "DELETE",
      url: `${baseUrl}/room/${createdRoomId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });
});

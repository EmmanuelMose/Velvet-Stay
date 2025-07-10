import request from 'supertest';
import app from '../../src/index';

import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingService,
  deleteBookingService
} from '../../src/bookings/bookings.service';

// Mock the services
jest.mock('../../src/bookings/bookings.service');

const mockedCreateBookingService = createBookingService as jest.Mock;
const mockedGetAllBookingsService = getAllBookingsService as jest.Mock;
const mockedGetBookingByIdService = getBookingByIdService as jest.Mock;
const mockedUpdateBookingService = updateBookingService as jest.Mock;
const mockedDeleteBookingService = deleteBookingService as jest.Mock;

describe('Bookings Controller Integration Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // POST /booking
  describe('POST /booking', () => {
    it('should create a booking successfully', async () => {
      const bookingData = {
        customerId: 1,
        roomId: 2,
        checkInDate: '2024-08-01',
        checkOutDate: '2024-08-05'
      };
      mockedCreateBookingService.mockResolvedValue({ id: 1, ...bookingData });

      const res = await request(app).post('/booking').send(bookingData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Booking created successfully');
      expect(res.body.booking).toHaveProperty('id', 1);
    });

    it('should return 400 if booking not created', async () => {
      mockedCreateBookingService.mockResolvedValue(null);

      const res = await request(app).post('/booking').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Booking not created');
    });
  });

  // GET /bookings
  describe('GET /bookings', () => {
    it('should return all bookings', async () => {
      mockedGetAllBookingsService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/bookings');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no bookings found', async () => {
      mockedGetAllBookingsService.mockResolvedValue([]);

      const res = await request(app).get('/bookings');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No bookings found');
    });
  });

  // GET /booking/:id
  describe('GET /booking/:id', () => {
    it('should return a booking by ID', async () => {
      mockedGetBookingByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/booking/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/booking/invalid-id');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Booking ID');
    });

    it('should return 404 if booking not found', async () => {
      mockedGetBookingByIdService.mockResolvedValue(null);

      const res = await request(app).get('/booking/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found');
    });
  });

  // PUT /booking/:id
  describe('PUT /booking/:id', () => {
    it('should update a booking successfully', async () => {
      mockedGetBookingByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateBookingService.mockResolvedValue('Booking updated successfully');

      const res = await request(app).put('/booking/1').send({ checkInDate: '2024-08-10' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Booking updated successfully');
    });

    it('should return 404 if booking not found', async () => {
      mockedGetBookingByIdService.mockResolvedValue(null);

      const res = await request(app).put('/booking/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found');
    });
  });

  // DELETE /booking/:id
  describe('DELETE /booking/:id', () => {
    it('should delete a booking successfully', async () => {
      mockedGetBookingByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteBookingService.mockResolvedValue('Booking deleted successfully');

      const res = await request(app).delete('/booking/1');

      expect(res.status).toBe(202);
      expect(res.body).toEqual({ message: 'Booking deleted successfully' });
    });

    it('should return 404 if booking not found', async () => {
      mockedGetBookingByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/booking/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found');
    });
  });

});

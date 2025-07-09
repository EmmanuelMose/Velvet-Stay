import request from 'supertest';
import app from '../../src/index';

import {
  createBookingService,
  getAllBookingsService,
  getBookingByIdService,
  updateBookingService,
  deleteBookingService
} from '../../src/bookings/bookings.service';

// ✅ Correct mock path (same as import)
jest.mock('../../src/bookings/bookings.service');

const mockedCreateBookingService = createBookingService as jest.Mock;
const mockedGetAllBookingsService = getAllBookingsService as jest.Mock;
const mockedGetBookingByIdService = getBookingByIdService as jest.Mock;
const mockedUpdateBookingService = updateBookingService as jest.Mock;
const mockedDeleteBookingService = deleteBookingService as jest.Mock;

describe('Bookings Controller Integration Tests', () => {

  describe('POST /api/bookings', () => {
    it('should create a booking successfully', async () => {
      const bookingData = { customerId: 1, roomId: 2, checkInDate: '2024-08-01', checkOutDate: '2024-08-05' };
      mockedCreateBookingService.mockResolvedValue({ id: 1, ...bookingData });

      const res = await request(app).post('/api/bookings').send(bookingData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Booking created successfully');
      expect(res.body.booking).toHaveProperty('id', 1);
    });

    it('should return 400 if booking not created', async () => {
      mockedCreateBookingService.mockResolvedValue(null);

      const res = await request(app).post('/api/bookings').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Booking not created');
    });
  });

  describe('GET /api/bookings', () => {
    it('should return all bookings', async () => {
      mockedGetAllBookingsService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/api/bookings');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no bookings found', async () => {
      mockedGetAllBookingsService.mockResolvedValue([]);

      const res = await request(app).get('/api/bookings');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No bookings found');
    });
  });

  describe('GET /api/bookings/:id', () => {
    it('should return a booking by ID', async () => {
      mockedGetBookingByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/api/bookings/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/api/bookings/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Booking ID');
    });

    it('should return 404 if booking not found', async () => {
      mockedGetBookingByIdService.mockResolvedValue(null);

      const res = await request(app).get('/api/bookings/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found');
    });
  });

  describe('PUT /api/bookings/:id', () => {
    it('should update a booking successfully', async () => {
      mockedGetBookingByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateBookingService.mockResolvedValue('Booking updated successfully');

      const res = await request(app).put('/api/bookings/1').send({ checkInDate: '2024-08-10' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Booking updated successfully');
    });

    it('should return 404 if booking not found', async () => {
      mockedGetBookingByIdService.mockResolvedValue(null);

      const res = await request(app).put('/api/bookings/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found');
    });
  });

  describe('DELETE /api/bookings/:id', () => {
    it('should delete a booking successfully', async () => {
      mockedGetBookingByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteBookingService.mockResolvedValue('Booking deleted successfully');

      const res = await request(app).delete('/api/bookings/1');

      expect(res.status).toBe(204);
    });

    it('should return 404 if booking not found', async () => {
      mockedGetBookingByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/api/bookings/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Booking not found');
    });
  });

});

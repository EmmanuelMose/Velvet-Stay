import request from 'supertest';
import app from '../../app';
import {
  createHotelService,
  getAllHotelsService,
  getHotelByIdService,
  updateHotelService,
  deleteHotelService
} from '../../src/hotels/hotels.service';

jest.mock('../hotels/hotels.service');

const mockedCreateService = createHotelService as jest.Mock;
const mockedGetAllService = getAllHotelsService as jest.Mock;
const mockedGetByIdService = getHotelByIdService as jest.Mock;
const mockedUpdateService = updateHotelService as jest.Mock;
const mockedDeleteService = deleteHotelService as jest.Mock;

describe('Hotel Controller Integration Tests', () => {

  describe('POST /api/hotels', () => {
    it('should create a hotel successfully', async () => {
      const hotelData = { name: 'Hotel Sunshine', location: 'City Center' };
      mockedCreateService.mockResolvedValue({ id: 1, ...hotelData });

      const res = await request(app).post('/api/hotels').send(hotelData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Hotel created successfully');
      expect(res.body.hotel).toHaveProperty('id', 1);
    });

    it('should return 400 if hotel not created', async () => {
      mockedCreateService.mockResolvedValue(null);

      const res = await request(app).post('/api/hotels').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Hotel not created');
    });
  });

  describe('GET /api/hotels', () => {
    it('should return all hotels', async () => {
      mockedGetAllService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/api/hotels');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no hotels found', async () => {
      mockedGetAllService.mockResolvedValue([]);

      const res = await request(app).get('/api/hotels');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No hotels found');
    });
  });

  describe('GET /api/hotels/:id', () => {
    it('should return a hotel by ID', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/api/hotels/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/api/hotels/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Hotel ID');
    });

    it('should return 404 if hotel not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).get('/api/hotels/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Hotel not found');
    });
  });

  describe('PUT /api/hotels/:id', () => {
    it('should update a hotel successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateService.mockResolvedValue('Hotel updated successfully');

      const res = await request(app).put('/api/hotels/1').send({ name: 'Updated Hotel' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Hotel updated successfully');
    });

    it('should return 404 if hotel not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).put('/api/hotels/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Hotel not found');
    });
  });

  describe('DELETE /api/hotels/:id', () => {
    it('should delete a hotel successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteService.mockResolvedValue('Hotel deleted successfully');

      const res = await request(app).delete('/api/hotels/1');

      expect(res.status).toBe(204);
    });

    it('should return 404 if hotel not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/api/hotels/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Hotel not found');
    });
  });

});

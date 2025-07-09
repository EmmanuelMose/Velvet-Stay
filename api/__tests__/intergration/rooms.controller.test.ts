import request from 'supertest';
import app from '../../src/index';
//import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  createRoomService,
  getAllRoomsService,
  getRoomByIdService,
  updateRoomService,
  deleteRoomService
} from '../../src/rooms/rooms.service';

jest.mock('../rooms/rooms.service');

const mockedCreateService = createRoomService as jest.Mock;
const mockedGetAllService = getAllRoomsService as jest.Mock;
const mockedGetByIdService = getRoomByIdService as jest.Mock;
const mockedUpdateService = updateRoomService as jest.Mock;
const mockedDeleteService = deleteRoomService as jest.Mock;

describe('Room Controller Integration Tests', () => {

  describe('POST /api/rooms', () => {
    it('should create a room successfully', async () => {
      const roomData = { name: 'Deluxe Room', capacity: 2 };
      mockedCreateService.mockResolvedValue({ id: 1, ...roomData });

      const res = await request(app).post('/api/rooms').send(roomData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Room created successfully');
      expect(res.body.room).toHaveProperty('id', 1);
    });

    it('should return 400 if room not created', async () => {
      mockedCreateService.mockResolvedValue(null);

      const res = await request(app).post('/api/rooms').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Room not created');
    });
  });

  describe('GET /api/rooms', () => {
    it('should return all rooms', async () => {
      mockedGetAllService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/api/rooms');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no rooms found', async () => {
      mockedGetAllService.mockResolvedValue([]);

      const res = await request(app).get('/api/rooms');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No rooms found');
    });
  });

  describe('GET /api/rooms/:id', () => {
    it('should return a room by ID', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/api/rooms/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/api/rooms/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Room ID');
    });

    it('should return 404 if room not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).get('/api/rooms/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Room not found');
    });
  });

  describe('PUT /api/rooms/:id', () => {
    it('should update a room successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateService.mockResolvedValue('Room updated successfully');

      const res = await request(app).put('/api/rooms/1').send({ name: 'Updated Room' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Room updated successfully');
    });

    it('should return 404 if room not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).put('/api/rooms/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Room not found');
    });
  });

  describe('DELETE /api/rooms/:id', () => {
    it('should delete a room successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteService.mockResolvedValue('Room deleted successfully');

      const res = await request(app).delete('/api/rooms/1');

      expect(res.status).toBe(204);
    });

    it('should return 404 if room not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/api/rooms/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Room not found');
    });
  });

});
import request from 'supertest';
import app from '../../src/index';
//import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from '../../src/users/users.service';

jest.mock('../users/users.service');

const mockedCreateUser = createUserService as jest.Mock;
const mockedGetAllUsers = getAllUsersService as jest.Mock;
const mockedGetUserById = getUserByIdService as jest.Mock;
const mockedUpdateUser = updateUserService as jest.Mock;
const mockedDeleteUser = deleteUserService as jest.Mock;

describe('User Controller Integration Tests', () => {

  describe('POST /api/users', () => {
    it('should create a user successfully', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      mockedCreateUser.mockResolvedValue({ id: 1, ...userData });

      const res = await request(app).post('/api/users').send(userData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
      expect(res.body.user).toHaveProperty('id', 1);
    });

    it('should return 400 if user not created', async () => {
      mockedCreateUser.mockResolvedValue(null);

      const res = await request(app).post('/api/users').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'User not created');
    });
  });

  describe('GET /api/users', () => {
    it('should return all users', async () => {
      mockedGetAllUsers.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no users found', async () => {
      mockedGetAllUsers.mockResolvedValue([]);

      const res = await request(app).get('/api/users');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No users found');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return a user by ID', async () => {
      mockedGetUserById.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/api/users/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/api/users/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid User ID');
    });

    it('should return 404 if user not found', async () => {
      mockedGetUserById.mockResolvedValue(null);

      const res = await request(app).get('/api/users/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update a user successfully', async () => {
      mockedGetUserById.mockResolvedValue({ id: 1 });
      mockedUpdateUser.mockResolvedValue('User updated successfully');

      const res = await request(app).put('/api/users/1').send({ name: 'Jane Doe' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'User updated successfully');
    });

    it('should return 404 if user not found', async () => {
      mockedGetUserById.mockResolvedValue(null);

      const res = await request(app).put('/api/users/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete a user successfully', async () => {
      mockedGetUserById.mockResolvedValue({ id: 1 });
      mockedDeleteUser.mockResolvedValue('User deleted successfully');

      const res = await request(app).delete('/api/users/1');

      expect(res.status).toBe(204);
    });

    it('should return 404 if user not found', async () => {
      mockedGetUserById.mockResolvedValue(null);

      const res = await request(app).delete('/api/users/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

});

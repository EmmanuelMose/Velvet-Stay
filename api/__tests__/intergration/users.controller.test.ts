import request from 'supertest';
import app from '../../src/index';

import {
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService
} from '../../src/users/users.service';

// Fix the path to match the real service location
jest.mock('../../src/users/users.service');

const mockedCreateUser = createUserService as jest.Mock;
const mockedGetAllUsers = getAllUsersService as jest.Mock;
const mockedGetUserById = getUserByIdService as jest.Mock;
const mockedUpdateUser = updateUserService as jest.Mock;
const mockedDeleteUser = deleteUserService as jest.Mock;

describe('User Controller Integration Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // POST /user
  describe('POST /user', () => {
    it('should create a user successfully', async () => {
      const userData = { name: 'John Doe', email: 'john@example.com' };
      mockedCreateUser.mockResolvedValue({ id: 1, ...userData });

      const res = await request(app).post('/user').send(userData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
      expect(res.body.user).toHaveProperty('id', 1);
    });

    it('should return 400 if user not created', async () => {
      mockedCreateUser.mockResolvedValue(null);

      const res = await request(app).post('/user').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'User not created');
    });
  });

  // GET /users
  describe('GET /users', () => {
    it('should return all users', async () => {
      mockedGetAllUsers.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/users');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no users found', async () => {
      mockedGetAllUsers.mockResolvedValue([]);

      const res = await request(app).get('/users');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No users found');
    });
  });

  // GET /user/:id
  describe('GET /user/:id', () => {
    it('should return a user by ID', async () => {
      mockedGetUserById.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/user/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/user/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid User ID');
    });

    it('should return 404 if user not found', async () => {
      mockedGetUserById.mockResolvedValue(null);

      const res = await request(app).get('/user/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  // PUT /user/:id
  describe('PUT /user/:id', () => {
    it('should update a user successfully', async () => {
      mockedGetUserById.mockResolvedValue({ id: 1 });
      mockedUpdateUser.mockResolvedValue('User updated successfully');

      const res = await request(app).put('/user/1').send({ name: 'Jane Doe' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'User updated successfully');
    });

    it('should return 404 if user not found', async () => {
      mockedGetUserById.mockResolvedValue(null);

      const res = await request(app).put('/user/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

  // DELETE /user/:id
  describe('DELETE /user/:id', () => {
    it('should delete a user successfully', async () => {
      mockedGetUserById.mockResolvedValue({ id: 1 });
      mockedDeleteUser.mockResolvedValue('User deleted successfully');

      const res = await request(app).delete('/user/1');

      expect(res.status).toBe(202);  // Assuming your controller returns 202
      expect(res.body).toEqual({ message: 'User deleted successfully' });
    });

    it('should return 404 if user not found', async () => {
      mockedGetUserById.mockResolvedValue(null);

      const res = await request(app).delete('/user/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });

});

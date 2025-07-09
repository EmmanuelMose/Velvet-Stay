import request from 'supertest';
import app from '../../src/index';
//import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService
} from '../../src/payments/payments.service';

jest.mock('../payments/payments.service');

const mockedCreateService = createPaymentService as jest.Mock;
const mockedGetAllService = getAllPaymentsService as jest.Mock;
const mockedGetByIdService = getPaymentByIdService as jest.Mock;
const mockedUpdateService = updatePaymentService as jest.Mock;
const mockedDeleteService = deletePaymentService as jest.Mock;

describe('Payment Controller Integration Tests', () => {

  describe('POST /api/payments', () => {
    it('should create a payment successfully', async () => {
      const paymentData = { amount: 100, paymentDate: '2024-08-01', method: 'Credit Card' };
      mockedCreateService.mockResolvedValue({ id: 1, ...paymentData });

      const res = await request(app).post('/api/payments').send(paymentData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Payment created successfully');
      expect(res.body.payment).toHaveProperty('id', 1);
    });

    it('should return 400 if payment not created', async () => {
      mockedCreateService.mockResolvedValue(null);

      const res = await request(app).post('/api/payments').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Payment not created');
    });
  });

  describe('GET /api/payments', () => {
    it('should return all payments', async () => {
      mockedGetAllService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/api/payments');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no payments found', async () => {
      mockedGetAllService.mockResolvedValue([]);

      const res = await request(app).get('/api/payments');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No payments found');
    });
  });

  describe('GET /api/payments/:id', () => {
    it('should return a payment by ID', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/api/payments/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/api/payments/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Payment ID');
    });

    it('should return 404 if payment not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).get('/api/payments/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Payment not found');
    });
  });

  describe('PUT /api/payments/:id', () => {
    it('should update a payment successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateService.mockResolvedValue('Payment updated successfully');

      const res = await request(app).put('/api/payments/1').send({ amount: 150 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Payment updated successfully');
    });

    it('should return 404 if payment not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).put('/api/payments/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Payment not found');
    });
  });

  describe('DELETE /api/payments/:id', () => {
    it('should delete a payment successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteService.mockResolvedValue('Payment deleted successfully');

      const res = await request(app).delete('/api/payments/1');

      expect(res.status).toBe(204);
    });

    it('should return 404 if payment not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/api/payments/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Payment not found');
    });
  });

});

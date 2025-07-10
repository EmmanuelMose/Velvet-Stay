import request from 'supertest';
import app from '../../src/index';

import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService
} from '../../src/payments/payments.service';

// Fix the path of the mocked service
jest.mock('../../src/payments/payments.service');

const mockedCreateService = createPaymentService as jest.Mock;
const mockedGetAllService = getAllPaymentsService as jest.Mock;
const mockedGetByIdService = getPaymentByIdService as jest.Mock;
const mockedUpdateService = updatePaymentService as jest.Mock;
const mockedDeleteService = deletePaymentService as jest.Mock;

describe('Payment Controller Integration Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // POST /payment
  describe('POST /payment', () => {
    it('should create a payment successfully', async () => {
      const paymentData = { amount: 100, paymentDate: '2024-08-01', method: 'Credit Card' };
      mockedCreateService.mockResolvedValue({ id: 1, ...paymentData });

      const res = await request(app).post('/payment').send(paymentData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Payment created successfully');
      expect(res.body.payment).toHaveProperty('id', 1);
    });

    it('should return 400 if payment not created', async () => {
      mockedCreateService.mockResolvedValue(null);

      const res = await request(app).post('/payment').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Payment not created');
    });
  });

  // GET /payments
  describe('GET /payments', () => {
    it('should return all payments', async () => {
      mockedGetAllService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/payments');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no payments found', async () => {
      mockedGetAllService.mockResolvedValue([]);

      const res = await request(app).get('/payments');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No payments found');
    });
  });

  // GET /payment/:id
  describe('GET /payment/:id', () => {
    it('should return a payment by ID', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/payment/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/payment/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Payment ID');
    });

    it('should return 404 if payment not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).get('/payment/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Payment not found');
    });
  });

  // PUT /payment/:id
  describe('PUT /payment/:id', () => {
    it('should update a payment successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateService.mockResolvedValue('Payment updated successfully');

      const res = await request(app).put('/payment/1').send({ amount: 150 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Payment updated successfully');
    });

    it('should return 404 if payment not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).put('/payment/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Payment not found');
    });
  });

  // DELETE /payment/:id
  describe('DELETE /payment/:id', () => {
    it('should delete a payment successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteService.mockResolvedValue('Payment deleted successfully');

      const res = await request(app).delete('/payment/1');

      expect(res.status).toBe(202);  // ✅ Assuming your controller returns 202
      expect(res.body).toEqual({ message: 'Payment deleted successfully' });
    });

    it('should return 404 if payment not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/payment/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Payment not found');
    });
  });

});

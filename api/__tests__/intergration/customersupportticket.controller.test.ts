import request from 'supertest';
import app from '../../src/index';
//import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  createCustomerSupportTicketService,
  getAllCustomerSupportTicketsService,
  getCustomerSupportTicketByIdService,
  updateCustomerSupportTicketService,
  deleteCustomerSupportTicketService
} from '../../src/customerSupportTickets/customerSupportTickets.service';

jest.mock('../customerSupportTickets/customerSupportTickets.service');

const mockedCreateService = createCustomerSupportTicketService as jest.Mock;
const mockedGetAllService = getAllCustomerSupportTicketsService as jest.Mock;
const mockedGetByIdService = getCustomerSupportTicketByIdService as jest.Mock;
const mockedUpdateService = updateCustomerSupportTicketService as jest.Mock;
const mockedDeleteService = deleteCustomerSupportTicketService as jest.Mock;

describe('Customer Support Ticket Controller Integration Tests', () => {

  describe('POST /api/support-tickets', () => {
    it('should create a ticket successfully', async () => {
      const ticketData = { subject: 'Issue', description: 'Details here' };
      mockedCreateService.mockResolvedValue({ id: 1, ...ticketData });

      const res = await request(app).post('/api/support-tickets').send(ticketData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Ticket created successfully');
      expect(res.body.ticket).toHaveProperty('id', 1);
    });

    it('should return 400 if ticket not created', async () => {
      mockedCreateService.mockResolvedValue(null);

      const res = await request(app).post('/api/support-tickets').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Ticket not created');
    });
  });

  describe('GET /api/support-tickets', () => {
    it('should return all tickets', async () => {
      mockedGetAllService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/api/support-tickets');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no tickets found', async () => {
      mockedGetAllService.mockResolvedValue([]);

      const res = await request(app).get('/api/support-tickets');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No tickets found');
    });
  });

  describe('GET /api/support-tickets/:id', () => {
    it('should return a ticket by ID', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/api/support-tickets/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/api/support-tickets/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Ticket ID');
    });

    it('should return 404 if ticket not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).get('/api/support-tickets/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Ticket not found');
    });
  });

  describe('PUT /api/support-tickets/:id', () => {
    it('should update a ticket successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateService.mockResolvedValue('Ticket updated successfully');

      const res = await request(app).put('/api/support-tickets/1').send({ subject: 'Updated subject' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Ticket updated successfully');
    });

    it('should return 404 if ticket not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).put('/api/support-tickets/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Ticket not found');
    });
  });

  describe('DELETE /api/support-tickets/:id', () => {
    it('should delete a ticket successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteService.mockResolvedValue('Ticket deleted successfully');

      const res = await request(app).delete('/api/support-tickets/1');

      expect(res.status).toBe(204);
    });

    it('should return 404 if ticket not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/api/support-tickets/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Ticket not found');
    });
  });

});
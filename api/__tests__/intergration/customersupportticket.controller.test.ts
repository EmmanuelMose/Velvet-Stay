import request from 'supertest';
import app from '../../src/index';

import {
  createCustomerSupportTicketService,
  getAllCustomerSupportTicketsService,
  getCustomerSupportTicketByIdService,
  updateCustomerSupportTicketService,
  deleteCustomerSupportTicketService
} from '../../src/customerSupportTickets/customerSupportTickets.service';

jest.mock('../../src/customerSupportTickets/customerSupportTickets.service');

const mockedCreateService = createCustomerSupportTicketService as jest.Mock;
const mockedGetAllService = getAllCustomerSupportTicketsService as jest.Mock;
const mockedGetByIdService = getCustomerSupportTicketByIdService as jest.Mock;
const mockedUpdateService = updateCustomerSupportTicketService as jest.Mock;
const mockedDeleteService = deleteCustomerSupportTicketService as jest.Mock;

describe('Customer Support Ticket Controller Integration Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  // POST /ticket
  describe('POST /ticket', () => {
    it('should create a ticket successfully', async () => {
      const ticketData = { subject: 'Issue', description: 'Details here' };
      mockedCreateService.mockResolvedValue({ id: 1, ...ticketData });

      const res = await request(app).post('/ticket').send(ticketData);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('message', 'Ticket created successfully');
      expect(res.body.ticket).toHaveProperty('id', 1);
    });

    it('should return 400 if ticket not created', async () => {
      mockedCreateService.mockResolvedValue(null);

      const res = await request(app).post('/ticket').send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Ticket not created');
    });
  });

  // GET /tickets
  describe('GET /tickets', () => {
    it('should return all tickets', async () => {
      mockedGetAllService.mockResolvedValue([{ id: 1 }, { id: 2 }]);

      const res = await request(app).get('/tickets');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return 404 if no tickets found', async () => {
      mockedGetAllService.mockResolvedValue([]);

      const res = await request(app).get('/tickets');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'No tickets found');
    });
  });

  // GET /ticket/:id
  describe('GET /ticket/:id', () => {
    it('should return a ticket by ID', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });

      const res = await request(app).get('/ticket/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).get('/ticket/abc');

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Invalid Ticket ID');
    });

    it('should return 404 if ticket not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).get('/ticket/999');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Ticket not found');
    });
  });

  // PUT /ticket/:id
  describe('PUT /ticket/:id', () => {
    it('should update a ticket successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedUpdateService.mockResolvedValue('Ticket updated successfully');

      const res = await request(app).put('/ticket/1').send({ subject: 'Updated subject' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Ticket updated successfully');
    });

    it('should return 404 if ticket not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).put('/ticket/1').send({});

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Ticket not found');
    });
  });

  // DELETE /ticket/:id
  describe('DELETE /ticket/:id', () => {
    it('should delete a ticket successfully', async () => {
      mockedGetByIdService.mockResolvedValue({ id: 1 });
      mockedDeleteService.mockResolvedValue('Ticket deleted successfully');

      const res = await request(app).delete('/ticket/1');

      expect(res.status).toBe(202);  // ✅ Match your controller’s status code
      expect(res.body).toEqual({ message: 'Ticket deleted successfully' });
    });

    it('should return 404 if ticket not found', async () => {
      mockedGetByIdService.mockResolvedValue(null);

      const res = await request(app).delete('/ticket/1');

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Ticket not found');
    });
  });

});


import express, { Request, Response } from 'express';
import { handleUserQuery } from '../services/chatService.js';

const router = express.Router();

router.post('/chat', async (req: Request, res: Response): Promise<void> => {
  const { question } = req.body;

  if (!question) {
    res.status(400).json({ error: 'Question is required.' });
    return;
  }

  try {
    const answer = await handleUserQuery(question);
    res.status(200).json({ answer });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

export default router;

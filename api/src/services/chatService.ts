import { loadDocuments } from '../../src/utils/loadDocs.js';

export const handleUserQuery = async (question: string): Promise<string> => {
  const docs = await loadDocuments();
  const questionLower = question.toLowerCase();

  const match = docs.find((doc) => doc.toLowerCase().includes(questionLower));

  if (match) return match;

  return "Sorry, I couldn't find a relevant answer in the documentation.";
};

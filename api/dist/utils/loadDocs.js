import fs from 'fs';
import path from 'path';
export const loadDocuments = async () => {
    const filePath = path.join(__dirname, '../../docs/car-system.txt');
    const rawText = fs.readFileSync(filePath, 'utf-8');
    return rawText.split(/\n\s*\n/).filter((line) => line.trim() !== '');
};

import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'iletisim.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const data = fs.readFileSync(filePath, 'utf-8');
        res.status(200).json(JSON.parse(data));
    } else if (req.method === 'POST') {
        const { adres, telefon, eposta } = req.body;
        fs.writeFileSync(filePath, JSON.stringify({ adres, telefon, eposta }, null, 2));
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 
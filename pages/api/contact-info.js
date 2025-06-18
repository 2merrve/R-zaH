import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'data', 'iletisim.json');

    if (req.method === 'GET') {
        try {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const contactInfo = JSON.parse(fileData);
            res.status(200).json(contactInfo);
        } catch (error) {
            console.error('İletişim bilgileri okuma hatası:', error);
            res.status(500).json({ error: 'İletişim bilgileri yüklenirken hata oluştu' });
        }
    } else if (req.method === 'POST') {
        try {
            const { adres, telefon, eposta } = req.body;

            if (!adres || !telefon || !eposta) {
                return res.status(400).json({ error: 'Tüm alanlar gereklidir' });
            }

            const contactInfo = { adres, telefon, eposta };
            fs.writeFileSync(filePath, JSON.stringify(contactInfo, null, 2));

            res.status(200).json(contactInfo);
        } catch (error) {
            console.error('İletişim bilgileri güncelleme hatası:', error);
            res.status(500).json({ error: 'İletişim bilgileri güncellenirken hata oluştu' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 
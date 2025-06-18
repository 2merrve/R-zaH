import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'messages.json');

  if (req.method === 'GET') {
    try {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const messages = JSON.parse(fileData);
      res.status(200).json(messages);
    } catch (error) {
      console.error('Mesajlar okuma hatası:', error);
      res.status(500).json({ error: 'Mesajlar yüklenirken hata oluştu' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Tüm alanlar gereklidir' });
      }

      const fileData = fs.readFileSync(filePath, 'utf-8');
      const messages = JSON.parse(fileData);

      const newMessage = {
        id: Date.now(),
        name,
        email,
        message,
        isRead: false,
        createdAt: new Date().toISOString()
      };

      messages.push(newMessage);
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Mesaj ekleme hatası:', error);
      res.status(500).json({ error: 'Mesaj eklenirken hata oluştu' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { isRead } = req.body;

      const fileData = fs.readFileSync(filePath, 'utf-8');
      const messages = JSON.parse(fileData);

      const messageIndex = messages.findIndex(m => m.id === parseInt(id));
      if (messageIndex === -1) {
        return res.status(404).json({ error: 'Mesaj bulunamadı' });
      }

      messages[messageIndex].isRead = isRead;
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));

      res.status(200).json(messages[messageIndex]);
    } catch (error) {
      console.error('Mesaj güncelleme hatası:', error);
      res.status(500).json({ error: 'Mesaj güncellenirken hata oluştu' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      const fileData = fs.readFileSync(filePath, 'utf-8');
      const messages = JSON.parse(fileData);

      const filteredMessages = messages.filter(m => m.id !== parseInt(id));
      fs.writeFileSync(filePath, JSON.stringify(filteredMessages, null, 2));

      res.status(200).json({ message: 'Mesaj silindi' });
    } catch (error) {
      console.error('Mesaj silme hatası:', error);
      res.status(500).json({ error: 'Mesaj silinirken hata oluştu' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
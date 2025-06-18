import fs from 'fs';
import path from 'path';

const messagesFilePath = path.join(process.cwd(), 'data', 'messages.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const messagesData = fs.readFileSync(messagesFilePath, 'utf-8');
      res.status(200).json(JSON.parse(messagesData));
    } catch (error) {
      console.error('Error reading messages file:', error);
      res.status(500).json({ message: 'Error reading messages' });
    }
  } else if (req.method === 'POST') {
    try {
      const messagesData = fs.readFileSync(messagesFilePath, 'utf-8');
      const messages = JSON.parse(messagesData);
      
      const newMessage = {
        id: Date.now(),
        ...req.body,
        isRead: false,
        reply: null,
        createdAt: new Date().toISOString()
      };
      
      messages.push(newMessage);
      fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
      
      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error saving message:', error);
      res.status(500).json({ message: 'Error saving message' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { isRead, reply } = req.body;
      
      const messagesData = fs.readFileSync(messagesFilePath, 'utf-8');
      const messages = JSON.parse(messagesData);
      
      const messageIndex = messages.findIndex(m => m.id === parseInt(id));
      
      if (messageIndex === -1) {
        return res.status(404).json({ message: 'Message not found' });
      }
      
      if (isRead !== undefined) {
        messages[messageIndex].isRead = isRead;
      }
      
      if (reply !== undefined) {
        messages[messageIndex].reply = reply;
        messages[messageIndex].repliedAt = new Date().toISOString();
      }
      
      fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));
      
      res.status(200).json(messages[messageIndex]);
    } catch (error) {
      console.error('Error updating message:', error);
      res.status(500).json({ message: 'Error updating message' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
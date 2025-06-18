import fs from 'fs';
import path from 'path';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;
      const adminFilePath = path.join(process.cwd(), 'data', 'admin.json');
      const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));

      if (username === adminData.username && password === adminData.password) {
        res.setHeader('Set-Cookie', serialize('admin-token', 'authenticated', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 30, // 30 gün (çıkış yapılana kadar sürmesi için büyük bir değer)
          path: '/'
        }));

        return res.status(200).json({ success: true });
      }

      return res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
    } catch (error) {
      console.error('Giriş hatası:', error);
      return res.status(500).json({ error: 'Sunucu hatası' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { oldPassword, newPassword } = req.body;
      const adminFilePath = path.join(process.cwd(), 'data', 'admin.json');
      const adminData = JSON.parse(fs.readFileSync(adminFilePath, 'utf8'));

      // Eski şifre kontrolü
      if (oldPassword !== adminData.password) {
        return res.status(401).json({ error: 'Eski şifre yanlış.' });
      }

      // Şifreyi güncelle
      adminData.password = newPassword;

      // Güncellenmiş veriyi dosyaya kaydet
      fs.writeFileSync(adminFilePath, JSON.stringify(adminData, null, 2), 'utf8');

      return res.status(200).json({ success: true, message: 'Şifre başarıyla güncellendi.' });

    } catch (error) {
      console.error('Şifre değiştirme hatası:', error);
      return res.status(500).json({ error: 'Bir sunucu hatası oluştu.' });
    }
  }

  res.setHeader('Allow', ['PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 
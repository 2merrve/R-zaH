import { NextApiRequest, NextApiResponse } from 'next';
import { addUser } from '../../../lib/db'; // Yolu doğru ayarlayın

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Sadece POST istekleri kabul edilir.' });
    }

    const { name, email, sifre, password } = req.body;
    const userPassword = password || sifre;

    if (!name || !email || !userPassword) {
        return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
    }

    try {
        await addUser(name, email, userPassword);
        return res.status(201).json({ message: 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.' });
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({ message: 'Bu e-posta adresi zaten kullanımda.' });
        }
        console.error('Kayıt hatası:', error);
        return res.status(500).json({ message: 'Sunucu hatası oluştu.' });
    }
} 
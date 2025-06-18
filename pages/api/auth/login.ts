import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUser } from '../../../lib/db'; // Yolu doğru ayarlayın
import { serialize } from 'cookie';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Sadece POST istekleri kabul edilir.' });
    }

    const { email, sifre } = req.body;

    try {
        const user = await verifyUser(email, sifre);

        if (user) {
            // Basit bir oturum yönetimi için çerez oluştur
            const cookie = serialize('auth', JSON.stringify({ userId: user.id, email: user.email, name: user.name }), {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development', // HTTPS üzerinde çalışırken true olmalı
                maxAge: 60 * 60 * 24 * 7, // 1 hafta
                path: '/',
            });

            res.setHeader('Set-Cookie', cookie);
            return res.status(200).json({ message: 'Giriş başarılı!', user: { id: user.id, email: user.email, name: user.name } });
        } else {
            return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
        }
    } catch (error) {
        console.error('Giriş hatası:', error);
        return res.status(500).json({ message: 'Sunucu hatası oluştu.' });
    }
} 
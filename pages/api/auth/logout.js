import { serialize } from 'cookie';

export default function handler(req, res) {
    if (req.method === 'POST') {
        // Admin token cookie'sini sil
        res.setHeader('Set-Cookie', serialize('admin-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0), // Cookie'yi hemen sil
            path: '/'
        }));

        return res.status(200).json({ success: true, message: 'Başarıyla çıkış yapıldı' });
    }

    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
} 
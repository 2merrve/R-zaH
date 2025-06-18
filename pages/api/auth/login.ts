import { NextApiRequest, NextApiResponse } from 'next';
import { verifyUser } from '../../../lib/db'; // Yolu doğru ayarlayın
import { serialize } from 'cookie';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
        return;
    }

    const { email, password } = req.body;

    try {
        const user = await verifyUser(email, password);
        if (user) {
            res.setHeader('Set-Cookie', serialize('user', JSON.stringify(user), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            }));
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
} 
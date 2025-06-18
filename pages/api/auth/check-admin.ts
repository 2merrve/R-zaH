import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const cookies = parse(req.headers.cookie || '');
        const adminToken = cookies['admin-token'];

        if (adminToken === 'authenticated') {
            return res.status(200).json({ isAdmin: true });
        } else {
            return res.status(401).json({ isAdmin: false });
        }
    }

    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
} 
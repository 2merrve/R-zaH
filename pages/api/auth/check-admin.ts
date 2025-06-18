import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;
    if (cookies['admin-token']) {
        return res.status(200).json({ admin: true });
    } else {
        return res.status(401).json({ admin: false });
    }
} 
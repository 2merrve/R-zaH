import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;
    if (cookies.auth) {
        try {
            const user = JSON.parse(decodeURIComponent(cookies.auth));
            return res.status(200).json({ loggedIn: true, name: user.name, email: user.email });
        } catch {
            return res.status(200).json({ loggedIn: true });
        }
    } else {
        return res.status(401).json({ loggedIn: false });
    }
} 
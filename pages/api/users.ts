import { NextApiRequest, NextApiResponse } from 'next';
import { getUsers, updateUser, deleteUser } from '../../lib/db';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        const users = await getUsers();
        res.status(200).json(users);
    } else if (req.method === 'PUT') {
        const { id, name, email } = req.body;
        const user = await updateUser(id, name, email);
        res.status(200).json(user);
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await deleteUser(id);
        res.status(200).json({ message: 'User deleted' });
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
} 
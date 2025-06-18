import { getUsers, updateUser, deleteUser } from '../../lib/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const users = await getUsers();
        res.status(200).json(users);
    } else if (req.method === 'PUT') {
        const { id, name, email } = req.body;
        await updateUser(id, name, email);
        res.status(200).json({ success: true });
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await deleteUser(id);
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
} 
import pool from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM messages ORDER BY id DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Mesajlar okuma hatası:', error);
      res.status(500).json({ error: 'Mesajlar yüklenirken hata oluştu' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: 'Tüm alanlar gereklidir' });
      }
      const result = await pool.query(
        `INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *`,
        [name, email, message]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Mesaj ekleme hatası:', error);
      res.status(500).json({ error: 'Mesaj eklenirken hata oluştu' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const { isRead, reply } = req.body;
      let query = 'UPDATE messages SET ';
      const params = [];
      let idx = 1;
      if (isRead !== undefined) {
        query += `is_read=$${idx++},`;
        params.push(isRead);
      }
      if (reply !== undefined) {
        query += `reply=$${idx++},replied_at=NOW(),`;
        params.push(reply);
      }
      query = query.replace(/,$/, '');
      query += ` WHERE id=$${idx} RETURNING *`;
      params.push(id);
      const result = await pool.query(query, params);
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Mesaj güncelleme hatası:', error);
      res.status(500).json({ error: 'Mesaj güncellenirken hata oluştu' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await pool.query('DELETE FROM messages WHERE id=$1', [id]);
      res.status(200).json({ message: 'Mesaj silindi' });
    } catch (error) {
      console.error('Mesaj silme hatası:', error);
      res.status(500).json({ error: 'Mesaj silinirken hata oluştu' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
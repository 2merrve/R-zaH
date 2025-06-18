import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import pool from '../../lib/db';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { rows } = await pool.query('SELECT * FROM projects ORDER BY id DESC');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Projeler okuma hatası:', error);
      res.status(500).json({ error: 'Projeler yüklenirken hata oluştu' });
    }
  } else if (req.method === 'POST') {
    try {
      const form = formidable({ uploadDir: uploadsDir, keepExtensions: true });
      const [fields, files] = await form.parse(req);
      let imagePath = '';
      if (files.image && files.image[0]) {
        imagePath = `/uploads/${path.basename(files.image[0].filepath)}`;
      }
      const { name, description, status, location, startDate, endDate } = fields;
      const result = await pool.query(
        `INSERT INTO projects (name, description, status, location, start_date, end_date, image) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [name?.[0] || '', description?.[0] || '', status?.[0] || 'planlandı', location?.[0] || '', startDate?.[0] || '', endDate?.[0] || '', imagePath]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Proje ekleme hatası:', error);
      res.status(500).json({ error: 'Proje eklenirken hata oluştu' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const form = formidable({ uploadDir: uploadsDir, keepExtensions: true });
      const [fields, files] = await form.parse(req);
      let imagePath = fields.image?.[0] || '';
      if (files.image && files.image[0]) {
        imagePath = `/uploads/${path.basename(files.image[0].filepath)}`;
      }
      const { name, description, status, location, startDate, endDate } = fields;
      const result = await pool.query(
        `UPDATE projects SET name=$1, description=$2, status=$3, location=$4, start_date=$5, end_date=$6, image=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
        [name?.[0] || '', description?.[0] || '', status?.[0] || 'planlandı', location?.[0] || '', startDate?.[0] || '', endDate?.[0] || '', imagePath, id]
      );
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Proje güncelleme hatası:', error);
      res.status(500).json({ error: 'Proje güncellenirken hata oluştu' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await pool.query('DELETE FROM projects WHERE id=$1', [id]);
      res.status(200).json({ message: 'Proje silindi' });
    } catch (error) {
      console.error('Proje silme hatası:', error);
      res.status(500).json({ error: 'Proje silinirken hata oluştu' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
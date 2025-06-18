import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const filePath = path.join(process.cwd(), 'data', 'projects.json');
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const projects = JSON.parse(fileData);
      res.status(200).json(projects);
    } catch (error) {
      console.error('Projeler okuma hatası:', error);
      res.status(500).json({ error: 'Projeler yüklenirken hata oluştu' });
    }
  } else if (req.method === 'POST') {
    try {
      const form = formidable();
      const [fields, files] = await form.parse(req);

      const filePath = path.join(process.cwd(), 'data', 'projects.json');
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const projects = JSON.parse(fileData);

      const newProject = {
        id: Date.now(),
        name: [fields.name?.[0] || ''],
        description: [fields.description?.[0] || ''],
        status: [fields.status?.[0] || 'planlandı'],
        location: [fields.location?.[0] || ''],
        startDate: [fields.startDate?.[0] || ''],
        endDate: fields.endDate?.[0] ? [fields.endDate[0]] : undefined,
        image: files.image?.[0] ? `/uploads/${files.image[0].newFilename}` : '',
        createdAt: [new Date().toISOString()],
        updatedAt: new Date().toISOString()
      };

      projects.push(newProject);
      fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));

      res.status(201).json(newProject);
    } catch (error) {
      console.error('Proje ekleme hatası:', error);
      res.status(500).json({ error: 'Proje eklenirken hata oluştu' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id } = req.query;
      const form = formidable();
      const [fields, files] = await form.parse(req);

      const filePath = path.join(process.cwd(), 'data', 'projects.json');
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const projects = JSON.parse(fileData);

      const projectIndex = projects.findIndex(p => p.id === parseInt(id));
      if (projectIndex === -1) {
        return res.status(404).json({ error: 'Proje bulunamadı' });
      }

      projects[projectIndex] = {
        ...projects[projectIndex],
        name: [fields.name?.[0] || projects[projectIndex].name?.[0] || ''],
        description: [fields.description?.[0] || projects[projectIndex].description?.[0] || ''],
        status: [fields.status?.[0] || projects[projectIndex].status?.[0] || 'planlandı'],
        location: [fields.location?.[0] || projects[projectIndex].location?.[0] || ''],
        startDate: [fields.startDate?.[0] || projects[projectIndex].startDate?.[0] || ''],
        endDate: fields.endDate?.[0] ? [fields.endDate[0]] : projects[projectIndex].endDate,
        image: files.image?.[0] ? `/uploads/${files.image[0].newFilename}` : projects[projectIndex].image,
        updatedAt: new Date().toISOString()
      };

      fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
      res.status(200).json(projects[projectIndex]);
    } catch (error) {
      console.error('Proje güncelleme hatası:', error);
      res.status(500).json({ error: 'Proje güncellenirken hata oluştu' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const filePath = path.join(process.cwd(), 'data', 'projects.json');
      const fileData = fs.readFileSync(filePath, 'utf-8');
      const projects = JSON.parse(fileData);

      const filteredProjects = projects.filter(p => p.id !== parseInt(id));
      fs.writeFileSync(filePath, JSON.stringify(filteredProjects, null, 2));

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
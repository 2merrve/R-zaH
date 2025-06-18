import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

const projectsFilePath = path.join(process.cwd(), 'data', 'projects.json');
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parser
  },
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const projectsData = fs.readFileSync(projectsFilePath, 'utf-8');
      res.status(200).json(JSON.parse(projectsData));
    } catch (error) {
      console.error('Error reading projects file:', error);
      res.status(500).json({ message: 'Error reading projects' });
    }

  } else if (req.method === 'POST' || req.method === 'PUT') {
    const form = formidable({
      uploadDir: uploadsDir,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ message: 'Error uploading file' });
      }

      try {
        const projectsData = fs.readFileSync(projectsFilePath, 'utf-8');
        const projects = JSON.parse(projectsData);

        let updatedProjects = [...projects];
        let projectData = {
          ...fields,
          // Assuming single file upload for now
          image: files.image ? `/uploads/${path.basename(files.image[0].filepath)}` : (req.method === 'PUT' ? null : undefined), // Keep existing image on PUT if no new file
          updatedAt: new Date().toISOString(),
        };

        if (req.method === 'POST') {
          // Add new project
          const newProject = {
            id: Date.now(), // Simple ID
            ...projectData,
            createdAt: new Date().toISOString(),
          };
          updatedProjects.push(newProject);
          res.status(201).json(newProject);

        } else { // req.method === 'PUT'
          // Update existing project
          const projectId = req.query.id;
          if (!projectId) {
            return res.status(400).json({ message: 'Project ID is required' });
          }

          const projectIndex = updatedProjects.findIndex(p => p.id === parseInt(projectId, 10));

          if (projectIndex > -1) {
            // If no new image is uploaded, retain the old image path
            if (!files.image && updatedProjects[projectIndex].image) {
              projectData.image = updatedProjects[projectIndex].image;
            }
             // Ensure ID is not overwritten by form fields
            delete projectData.id;

            updatedProjects[projectIndex] = {
              ...updatedProjects[projectIndex],
              ...projectData,
               id: parseInt(projectId, 10), // Ensure ID is correct integer
            };
            res.status(200).json(updatedProjects[projectIndex]);
          } else {
            return res.status(404).json({ message: 'Project not found' });
          }
        }

        // Save updated projects data
        fs.writeFileSync(projectsFilePath, JSON.stringify(updatedProjects, null, 2));

      } catch (fileReadError) {
        console.error('Error processing project data:', fileReadError);
        res.status(500).json({ message: 'Error processing project data' });
      }
    });

  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  location: string;
  startDate: string;
  endDate: string;
  image?: string;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    name: '',
    description: '',
    status: 'planlandı',
    location: '',
    startDate: '',
    endDate: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/projects?id=${editingId}` : '/api/projects';

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined) {
        formDataToSend.append(key, String(value));
      }
    });

    if (selectedImage) {
      formDataToSend.append('image', selectedImage);
    }

    const res = await fetch(url, {
      method,
      body: formDataToSend
    });

    if (res.ok) {
      await fetchProjects();
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: 'planlandı',
      location: '',
      startDate: '',
      endDate: ''
    });
    setSelectedImage(null);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsAdding(true);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/admin/login');
  };

  const handleGoBack = () => {
    router.push('/admin');
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Projeleri Yönet</h1>
          <div className="header-buttons">
            <Link href="/" passHref>
              <button className="site-button">
                Siteye Dön
              </button>
            </Link>
            <button className="back-button" onClick={handleGoBack}>
              Geri
            </button>
            <button className="add-button" onClick={() => setIsAdding(true)}>
              Yeni Proje Ekle
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {isAdding && (
          <div className="form-container">
            <h2>{editingId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Proje Adı:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Durum:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="planlandı">Planlandı</option>
                    <option value="devam_ediyor">Devam Ediyor</option>
                    <option value="tamamlandı">Tamamlandı</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Konum:</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Başlangıç Tarihi:</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Bitiş Tarihi:</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Açıklama:</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Proje Fotoğrafı:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
                  />
                  {formData.image && !selectedImage && (
                    <div className="current-image">
                      <p>Mevcut Fotoğraf:</p>
                      <img src={formData.image} alt="Proje fotoğrafı" />
                    </div>
                  )}
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-button">
                  {editingId ? 'Güncelle' : 'Ekle'}
                </button>
                <button type="button" className="cancel-button" onClick={resetForm}>
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="projects-section">
          <h2>Mevcut Projeler</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                {project.image && (
                  <div className="project-image">
                    <img src={project.image} alt={project.name} />
                  </div>
                )}
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <div className="project-details">
                    <p><strong>Durum:</strong> <span className={`status-badge ${project.status}`}>{project.status}</span></p>
                    <p><strong>Konum:</strong> {project.location}</p>
                    <p><strong>Başlangıç:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
                    {project.endDate && <p><strong>Bitiş:</strong> {new Date(project.endDate).toLocaleDateString()}</p>}
                  </div>
                  <p className="project-description">{project.description}</p>
                  <button className="edit-button" onClick={() => handleEdit(project)}>
                    Düzenle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background-color: #212121;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #121212 0%, #333333 100%);
          color: white;
          padding: 1.5rem 2rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
          color: #f5f5f5;
        }

        .header-buttons {
          display: flex;
          gap: 10px;
        }

        .logout-button,
        .back-button,
        .add-button,
        .site-button {
          background-color: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .logout-button:hover,
        .back-button:hover,
        .add-button:hover,
        .site-button:hover {
          background-color: rgba(255,255,255,0.2);
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .form-container {
          background: #333333;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          margin-bottom: 2rem;
          color: #e0e0e0;
        }

        .form-container h2 {
          margin: 0 0 1.5rem 0;
          color: #f5f5f5;
          text-align: center;
          font-size: 1.8rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #bdbdbd;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #555;
          border-radius: 6px;
          background-color: #424242;
          color: #e0e0e0;
          font-size: 1rem;
          box-sizing: border-box;
          outline: none;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #66bb6a; // Green accent for focus
          box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.2);
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .current-image img {
          max-width: 150px;
          height: auto;
          margin-top: 10px;
          border-radius: 4px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .submit-button,
        .cancel-button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-button {
          background-color: #66bb6a; // Green for submit
          color: white;
        }

        .submit-button:hover {
          background-color: #5cb85c;
          transform: translateY(-1px);
        }

        .cancel-button {
          background-color: #ef5350; // Red for cancel
          color: white;
        }

        .cancel-button:hover {
          background-color: #d32f2f;
          transform: translateY(-1px);
        }

        .projects-section {
          background: #333333;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .projects-section h2 {
          margin: 0 0 1.5rem 0;
          color: #f5f5f5;
          text-align: center;
          font-size: 1.8rem;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .project-card {
          background: #424242;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          transition: transform 0.2s ease-in-out;
          color: #e0e0e0;
        }

        .project-card:hover {
          transform: translateY(-5px);
        }

        .project-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-content {
          padding: 1.5rem;
        }

        .project-content h3 {
          margin-top: 0;
          margin-bottom: 0.8rem;
          color: #f5f5f5;
          font-size: 1.4rem;
        }

        .project-details p {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: #bdbdbd;
        }

        .project-details strong {
          color: #f5f5f5;
        }

        .project-description {
          font-size: 0.9rem;
          color: #bdbdbd;
          line-height: 1.5;
          margin-top: 1rem;
          margin-bottom: 1.5rem;
        }

        .status-badge {
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
        }

        .status-badge.planlandı {
          background-color: #FF9800; // Orange
        }

        .status-badge.devam_ediyor {
          background-color: #2196F3; // Blue
        }

        .status-badge.tamamlandı {
          background-color: #4CAF50; // Green
        }

        .edit-button {
          background-color: #7986cb; // Indigo
          color: white;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .edit-button:hover {
          background-color: #5c6bc0;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .dashboard-header,
          .dashboard-content {
            padding: 0 1rem;
          }

          .header-buttons {
            flex-direction: column;
            align-items: flex-end;
          }

          .header-buttons button {
            width: 100%;
            margin-bottom: 5px; /* Add some space between buttons */
          }
        }
      `}</style>
    </div>
  );
} 
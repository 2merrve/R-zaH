import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/admin');
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/admin/login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Yeni şifreler uyuşmuyor.');
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Şifre Değiştir</h1>
          <div className="header-buttons">
            <Link href="/" passHref>
              <button className="site-button">
                Siteye Dön
              </button>
            </Link>
            <button className="back-button" onClick={handleGoBack}>
              Geri
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="password-form-container">
          <h2>Şifrenizi Değiştirin</h2>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Mevcut Şifre:</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Yeni Şifre:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Yeni Şifre (Tekrar):</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                Şifreyi Değiştir
              </button>
            </div>
          </form>
        </div>
      </main>

      <style jsx>{`
        .admin-dashboard {
          min-height: 100vh;
          background-color: #212121; // Dark background
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #121212 0%, #333333 100%); // Darker gradient
          color: white;
          padding: 1.5rem 2rem;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          border-bottom: 1px solid #424242;
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

        .site-button,
        .back-button,
        .logout-button {
          padding: 0.6rem 1.2rem;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          color: white;
          background: rgba(255,255,255,0.1);
        }

        .site-button:hover,
        .back-button:hover,
        .logout-button:hover {
          background-color: rgba(255,255,255,0.2);
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        .dashboard-content {
          max-width: 600px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .password-form-container {
          background: #333333; // Darker background
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          border: 1px solid #424242;
          color: #e0e0e0;
        }

        .password-form-container h2 {
          color: #f5f5f5;
          margin: 0 0 2rem 0;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #bdbdbd;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #555; // Darker border
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background-color: #424242; // Darker input background
          color: #e0e0e0;
        }

        .form-group input:focus {
          border-color: #66bb6a; // Green accent for focus
          box-shadow: 0 0 0 3px rgba(102, 187, 106, 0.2);
          outline: none;
        }

        .form-actions {
          margin-top: 2rem;
        }

        .submit-button {
          background-color: #4CAF50; // Green
          color: white;
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          width: 100%;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .submit-button:hover {
          background-color: #43A047;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .success-message {
          background-color: #d4edda;
          color: #155724;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          text-align: center;
        }

        .error-message {
          background-color: #f8d7da;
          color: #721c24;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 15px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            padding: 0 1rem;
          }

          .header-buttons {
            flex-direction: column;
            gap: 0.5rem;
          }

          .password-form-container {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
} 
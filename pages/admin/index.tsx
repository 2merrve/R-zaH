import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminPanel() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/auth/check-admin');
        if (res.ok) {
          setIsAdmin(true);
        } else {
          router.push('/admin/login');
        }
      } catch (err) {
        console.error('Admin kontrolü hatası:', err);
        router.push('/admin/login');
      }
    };
    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/admin/login');
  };

  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    {
      title: 'Projeleri Yönet',
      description: 'Projeleri ekle, düzenle ve yönet',
      icon: '📊',
      path: '/admin/projects',
      color: '#424242'
    },
    {
      title: 'Gelen Mesajlar',
      description: 'Müşteri mesajlarını görüntüle ve yanıtla',
      icon: '✉️',
      path: '/admin/messages',
      color: '#455A64'
    },
    {
      title: 'Kullanıcıları Yönet',
      description: 'Kullanıcıları listele, düzenle ve sil',
      icon: '👤',
      path: '/admin/users',
      color: '#388e3c'
    },
    {
      title: 'Şifre Değiştir',
      description: 'Admin paneli şifrenizi güncelleyin',
      icon: '🔒',
      path: '/admin/change-password',
      color: '#5D4037'
    },
    {
      title: 'İletişim Bilgilerini Yönet',
      description: 'Adres, telefon ve e-posta bilgisini güncelle',
      icon: '📞',
      path: '/admin/contact-info',
      color: '#1976d2'
    }
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Admin Paneli</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/" passHref>
              <button className="site-button">
                Siteye Dön
              </button>
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-section">
          <h2>Hoş Geldiniz!</h2>
          <p>Admin panelinden tüm içerikleri yönetebilirsiniz.</p>
        </div>

        <div className="menu-grid">
          {menuItems.map((item, index) => (
            <Link href={item.path} key={index} className="menu-item">
              <div className="menu-item-content" style={{ borderColor: item.color }}>
                <div className="menu-icon" style={{ backgroundColor: item.color }}>
                  {item.icon}
                </div>
                <div className="menu-text">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
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

        .logout-button,
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
        .site-button:hover {
          background-color: rgba(255,255,255,0.2);
        }

        .dashboard-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .welcome-section {
          background: #333333;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          margin-bottom: 2rem;
        }

        .welcome-section h2 {
          margin: 0 0 0.5rem 0;
          color: #e0e0e0;
          font-size: 1.5rem;
        }

        .welcome-section p {
          margin: 0;
          color: #bdbdbd;
          font-size: 1rem;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .menu-item {
          text-decoration: none;
          color: inherit;
        }

        .menu-item-content {
          background: #424242;
          border-radius: 8px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .menu-item-content:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }

        .menu-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .menu-text h3 {
          margin: 0 0 0.5rem 0;
          color: #f5f5f5;
          font-size: 1.2rem;
        }

        .menu-text p {
          margin: 0;
          color: #bdbdbd;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            padding: 0 1rem;
          }

          .menu-grid {
            grid-template-columns: 1fr;
          }

          .menu-item-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
} 
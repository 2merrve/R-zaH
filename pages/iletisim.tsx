import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { FormEvent } from 'react';
import fs from 'fs';
import path from 'path';
import { useRouter } from 'next/router';

interface IletisimData {
  adres: string;
  telefon: string;
  eposta: string;
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'iletisim.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const iletisim = JSON.parse(fileData);
  return { props: { iletisim } };
}

export default function Iletisim({ iletisim }: { iletisim: IletisimData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Giriş durumunu kontrol et
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error('Auth kontrolü hatası:', err);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setStatus('Mesaj göndermek için giriş yapmalısınız.');
      return;
    }

    setStatus('Gönderiliyor...');

    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (res.status === 201) {
      setStatus('Mesajınız başarıyla gönderildi!');
      setName('');
      setEmail('');
      setMessage('');
    } else {
      setStatus(`Mesaj gönderilirken bir hata oluştu: ${data.error}`);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1,
      background: '#ffffff'
    }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '50vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
      }}>
        <Image
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80"
          alt="Şehir İnşaatı"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1,
        }}></div>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, padding: '0 20px' }}>
          <h1 style={{
            fontSize: 48,
            fontWeight: 'bold',
            marginBottom: 20,
            letterSpacing: 2,
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
            background: 'linear-gradient(45deg, #fff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            padding: '10px 20px',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            backdropFilter: 'blur(5px)',
            display: 'inline-block'
          }}>İletişim</h1>
        </div>
      </section>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 16px', position: 'relative', zIndex: 1, width: '100%' }}>
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#f9f9f9',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#333' }}>İletişim Bilgileri</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 25, justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', color: '#333', borderTop: '3px solid #556270' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>Adres</h3>
              <p style={{ fontSize: 15, color: '#555' }}>{iletisim.adres}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', color: '#333', borderTop: '3px solid #556270' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>Telefon</h3>
              <p style={{ fontSize: 15, color: '#555' }}>{iletisim.telefon}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', textAlign: 'center', color: '#333', borderTop: '3px solid #556270' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>E-posta</h3>
              <p style={{ fontSize: 15, color: '#555' }}>{iletisim.eposta}</p>
            </div>
          </div>
        </section>

        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#f9f9f9',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#333' }}>İletişim Formu</h2>
          <form style={{ maxWidth: 600, margin: '0 auto' }} onSubmit={handleSubmit}>
            <div style={{ marginBottom: 20 }}>
              <input
                type="text"
                placeholder="Adınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: 5,
                  border: '1px solid #ddd',
                  fontSize: 16,
                  outline: 'none'
                }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <input
                type="email"
                placeholder="E-posta Adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: 5,
                  border: '1px solid #ddd',
                  fontSize: 16,
                  outline: 'none'
                }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <textarea
                placeholder="Mesajınız"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  borderRadius: 5,
                  border: '1px solid #ddd',
                  fontSize: 16,
                  outline: 'none',
                  resize: 'vertical'
                }}></textarea>
            </div>
            <button
              type="submit"
              style={{
                padding: '12px 30px',
                backgroundColor: isLoggedIn ? '#333' : '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                opacity: 1,
                pointerEvents: 'auto',
                marginTop: 10
              }}
              onClick={!isLoggedIn ? () => router.push('/giris') : undefined}
            >
              Mesajı Gönder
            </button>
            {status && (
              <div style={{ marginTop: 20, color: status.includes('başarıyla') ? '#28a745' : '#dc3545' }}>
                {status}
              </div>
            )}
          </form>
        </section>

        {/* Sosyal Medya Bölümü */}
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#e8e8e8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          textAlign: 'center',
          border: '1px solid #d0d0d0'
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 25, color: '#222', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>Bizi Takip Edin</h2>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.6, maxWidth: 800, margin: '0 auto 40px auto' }}>Sosyal medya hesaplarımızdan bizi takip ederek güncel projelerimizden ve haberlerden haberdar olabilirsiniz.</p>
          <div style={{ display: 'flex', gap: 30, justifyContent: 'center' }}>
            {/* Facebook */}
            <a href="https://www.facebook.com/gokmeninsaat" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', backgroundColor: '#3b5998', color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }} className="social-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.63 5.12 12.09 11.62 12.91v-9.13h-3.5v-3.78h3.5v-2.88c0-3.46 2.07-5.36 5.24-5.36 1.52 0 3.11.27 3.11.27v3.42h-1.75c-1.72 0-2.26 1.07-2.26 2.17v2.38h3.84l-.61 3.78h-3.23v9.13C23.88 28.09 29 22.63 29 16z" fill="#fff" /></svg>
            </a>
            {/* X (Twitter) */}
            <a href="https://www.twitter.com/gokmeninsaat" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', backgroundColor: '#222', color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }} className="social-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><path d="M16.01 3C9.37 3 3.99 8.38 3.99 15.02c0 6.64 5.38 12.02 12.02 12.02s12.02-5.38 12.02-12.02C28.03 8.38 22.65 3 16.01 3zm5.7 16.7l-1.41 1.41-4.29-4.29-4.29 4.29-1.41-1.41 4.29-4.29-4.29-4.29 1.41-1.41 4.29 4.29 4.29-4.29 1.41 1.41-4.29 4.29 4.29 4.29z" fill="#fff" /></svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/gokmeninsaat" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)', color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }} className="social-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="7" y="7" width="18" height="18" rx="5" fill="#fff" fillOpacity="0.2" /><path d="M16 11.5A4.5 4.5 0 1 0 16 20.5a4.5 4.5 0 0 0 0-9zm0 7.5a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.25-7.75a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" fill="#fff" /></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/gokmeninsaat" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, borderRadius: '50%', backgroundColor: '#0077B5', color: '#fff', textDecoration: 'none', transition: 'all 0.3s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }} className="social-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="7" y="7" width="18" height="18" rx="5" fill="#fff" fillOpacity="0.2" /><path d="M12.5 13.5h2v7h-2v-7zm1-1.5a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm3 1.5h2v1h.03c.28-.53.97-1.09 2-1.09 2.14 0 2.53 1.41 2.53 3.25v3.84h-2v-3.41c0-.81-.01-1.85-1.13-1.85-1.13 0-1.3.88-1.3 1.79v3.47h-2v-7z" fill="#fff" /></svg>
            </a>
          </div>

          {/* Arama Çubuğu */}
          <div style={{ marginTop: 40, width: '100%', maxWidth: 500, margin: '40px auto 0 auto', padding: '10px', background: '#fff', borderRadius: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <input
              type="text"
              placeholder="Sitede Arayın..."
              style={{
                width: '100%',
                padding: '12px 15px',
                borderRadius: 8,
                border: '1px solid #ccc',
                fontSize: 16,
                outline: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            />
          </div>
          <style jsx>{`
            .social-icon:hover {
              background-color: #555;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              transform: translateY(-3px);
            }
            .contact-submit-button:hover {
              background-color: #555;
              box-shadow: 0 6px 15px rgba(0,0,0,0.3);
              transform: translateY(-2px);
            }
          `}</style>
        </section>
      </main>

    </div>
  );
} 
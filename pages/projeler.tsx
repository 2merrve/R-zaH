import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

interface Proje {
  id: number;
  baslik: string;
  aciklama: string;
  resim: string;
  kategori: string;
  konum: string;
  tarih: string;
}

interface ProjelerProps {
  projects: Proje[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'data', 'projects.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const projects = JSON.parse(fileData);
    return { props: { projects } };
  } catch (error) {
    console.error('Projeler yüklenirken hata:', error);
    return { props: { projects: [] } };
  }
};

export default function Projeler({ projects }: ProjelerProps) {
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
      <section style={{
        position: 'relative',
        width: '100%',
        height: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#222',
        background: '#fff',
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 'bold',
          letterSpacing: 2,
        }}>Projelerimiz</h1>
      </section>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 16px', position: 'relative', zIndex: 1, width: '100%' }}>
        <section style={{
          width: '100%',
          maxWidth: 1200,
          marginBottom: 60,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 32,
            margin: '0 auto',
            maxWidth: 1100,
            width: '100%'
          }}>
            {projects.map((proje) => (
              <div
                key={proje.id}
                className="proje-card"
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 6px 32px rgba(0,0,0,0.10)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  minWidth: 0,
                  minHeight: 420,
                  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)',
                  border: '1.5px solid #f0f0f0',
                }}
              >
                {proje.resim && (
                  <div style={{ position: 'relative', width: '100%', height: 320, maxWidth: '100%', margin: '0 auto' }}>
                    <Image
                      src={proje.resim}
                      alt={Array.isArray(proje.baslik) ? proje.baslik[0] : proje.baslik}
                      fill
                      sizes="350px"
                      style={{ objectFit: 'cover', borderRadius: 0 }}
                    />
                  </div>
                )}
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, color: '#23272f', letterSpacing: 0.2, lineHeight: 1.2 }}>{Array.isArray(proje.baslik) ? proje.baslik[0] : proje.baslik}</h3>
                  <p style={{ fontSize: 16, color: '#555', marginBottom: 12, lineHeight: 1.6 }}>{Array.isArray(proje.aciklama) ? proje.aciklama[0] : proje.aciklama}</p>
                  <div style={{ fontSize: 14, color: '#666', marginBottom: 6 }}>
                    <b>Konum:</b> {Array.isArray(proje.konum) ? proje.konum[0] : proje.konum}
                  </div>
                  <div style={{ fontSize: 14, color: '#666', marginBottom: 6 }}>
                    <b>Tarih:</b> {Array.isArray(proje.tarih) ? proje.tarih[0] : proje.tarih}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <style>{`
      .proje-card:hover {
        transform: scale(1.04);
        box-shadow: 0 8px 32px rgba(0,0,0,0.16);
        z-index: 2;
      }
      @media (max-width: 900px) {
        .projeler-grid { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 600px) {
        .projeler-grid { grid-template-columns: 1fr !important; }
      }
      `}</style>
    </div>
  );
} 
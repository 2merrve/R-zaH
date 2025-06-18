import React from 'react';
import { getProjeler } from '../lib/db';
import { GetServerSidePropsContext } from 'next';

interface ProjeItem {
  id: string;
  baslik: string;
  aciklama: string;
  durum: string;
  gorselUrl: string | null;
}

export default function Projelerimiz({ projeler }: { projeler: ProjeItem[] }) {
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
        width: '100%',
        textAlign: 'center',
        padding: '40px 0 20px 0',
        background: '#fff',
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 'bold',
          marginBottom: 20,
          letterSpacing: 2,
          color: '#222',
        }}>Projelerimiz</h1>
      </section>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 16px', position: 'relative', zIndex: 1, width: '100%' }}>
        <section style={{
          maxWidth: 1200,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 40,
          marginBottom: 60,
          padding: '0 20px',
        }}>
          {projeler.map((proje) => (
            <div key={proje.id} style={{
              background: '#fafafa',
              borderRadius: 12,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 24,
              minHeight: 180,
              justifyContent: 'center',
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>{proje.baslik}</h2>
              <p style={{ fontSize: 15, color: '#555', marginBottom: 10 }}>{proje.aciklama}</p>
              <span style={{
                display: 'inline-block',
                background: '#e0e0e0',
                borderRadius: 5,
                padding: '5px 12px',
                fontSize: 14,
                fontWeight: 500,
                color: '#444',
              }}>{proje.durum}</span>
            </div>
          ))}
        </section>
      </main>
      <footer style={{ textAlign: 'center', padding: '25px 0', color: '#888', fontSize: 14, background: '#f0f0f0', borderTop: '1px solid #e0e0e0', position: 'relative', zIndex: 1 }}>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const projeler = await getProjeler();
  return {
    props: { projeler },
  };
} 
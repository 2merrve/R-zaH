import React from 'react';
import { GetServerSideProps } from 'next';
import pool from '../lib/db';

interface ProjeItem {
  id: number;
  name: string[];
  description: string[];
  status: string[];
  location: string[];
  startDate: string[];
  endDate?: string[];
  image: string;
  updatedAt?: string;
  createdAt?: string[] | string;
}

interface ProjelerProps {
  projeler: ProjeItem[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM projects ORDER BY id DESC');
    return { props: { projeler: rows } };
  } catch (error) {
    console.error('Projeler yüklenirken hata:', error);
    return { props: { projeler: [] } };
  }
};

export default function Projelerimiz({ projeler }: ProjelerProps) {
  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Projelerimiz</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        justifyContent: 'center',
      }}>
        {projeler.map((proje) => (
          <div key={proje.id} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 420 }}>
            {proje.image && (
              <img src={proje.image} alt={proje.name?.[0] || ''} style={{ width: '100%', height: 180, objectFit: 'cover', borderTopLeftRadius: 14, borderTopRightRadius: 14 }} />
            )}
            <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: '#23272f' }}>{proje.name?.[0] || ''}</h3>
              <div style={{ fontSize: 15, color: '#888', marginBottom: 8 }}>
                <b>Tarih:</b> {proje.startDate?.[0] || '-'}
              </div>
              <div style={{ fontSize: 15, color: '#888', marginBottom: 8 }}>
                <b>Durum:</b> {proje.status?.[0] || '-'}
              </div>
              <div style={{ fontSize: 15, color: '#888', marginBottom: 8 }}>
                <b>Konum:</b> {proje.location?.[0] || '-'}
              </div>
              <p style={{ fontSize: 16, color: '#555', marginBottom: 0, flex: 1 }}>{proje.description?.[0] || ''}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
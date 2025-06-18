import React from 'react';
import Image from 'next/image';

const hizmetler = [
  {
    id: 1,
    baslik: 'Anahtar Teslim İnşaat',
    aciklama: 'Projelerinizi baştan sona anahtar teslim olarak yönetiyoruz.'
  },
  {
    id: 2,
    baslik: 'Tadilat ve Yenileme',
    aciklama: 'Mevcut yapılarınızı modern ve güvenli hale getiriyoruz.'
  }
];

export default function Hizmetler() {
  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Hizmetlerimiz</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32 }}>
        {hizmetler.map((item) => (
          <div key={item.id} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.baslik}</h3>
            <p style={{ fontSize: 15, color: '#555', marginBottom: 0 }}>{item.aciklama}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 
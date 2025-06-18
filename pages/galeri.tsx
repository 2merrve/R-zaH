import React from 'react';
import Image from 'next/image';

const galeriler = [
  {
    id: 1,
    baslik: 'Örnek Galeri',
    resim: '/proje-resim-1.jpg',
    aciklama: 'Bu bir örnek galeri açıklamasıdır.'
  }
];

export default function Galeri() {
  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Galeri</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
        {galeriler.map((item) => (
          <div key={item.id} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 320 }}>
            <div style={{ position: 'relative', width: '100%', height: 220 }}>
              <Image src={item.resim} alt={item.baslik} fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 20 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{item.baslik}</h3>
              <p style={{ fontSize: 15, color: '#555', marginBottom: 0 }}>{item.aciklama}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
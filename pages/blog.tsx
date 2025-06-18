import React from 'react';

interface BlogItem {
  baslik: string;
  icerik: string;
  tarih: string;
  yazar?: string;
}

const bloglar: BlogItem[] = [
  {
    baslik: 'Örnek Blog',
    icerik: 'Bu bir örnek blog yazısıdır.',
    tarih: '2024-06-01',
    yazar: 'Admin'
  }
];

export default function Blog() {
  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>Blog</h1>
      {bloglar.map((blog, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 14, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>{blog.baslik}</h2>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>{blog.tarih} {blog.yazar && <>| {blog.yazar}</>}</div>
          <p style={{ fontSize: 16, color: '#555', marginBottom: 0 }}>{blog.icerik}</p>
        </div>
      ))}
    </div>
  );
} 
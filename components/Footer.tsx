import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      padding: '20px',
      textAlign: 'center',
      marginTop: '40px',
      borderTop: '1px solid #eee',
      backgroundColor: '#f8f8f8',
      color: '#555'
    }}>
      <p>&copy; {new Date().getFullYear()} GÖKMEN İNŞAAT. Tüm Hakları Saklıdır.</p>
      <p>
        <Link href="/admin/login" style={{ color: '#555', textDecoration: 'none' }}>Admin Girişi</Link>
      </p>
    </footer>
  );
} 
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Menu() {
    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            background: '#fff',
            borderBottom: '2px solid #e0e0e0',
            minHeight: 70,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Link href="/">
                    <Image src="/gokmen-insaat-logo.jpg" alt="Logo" width={56} height={56} style={{ borderRadius: 8 }} />
                </Link>
                <span style={{ fontWeight: 700, fontSize: 24, color: '#23272f', letterSpacing: 1, marginLeft: 8 }}>
                    GÖKMEN İNŞAAT
                </span>
            </div>
            <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
                <Link href="/" style={{ color: '#23272f', fontWeight: 500, fontSize: 18, textDecoration: 'none' }}>Anasayfa</Link>
                <Link href="/hakkimizda" style={{ color: '#23272f', fontWeight: 500, fontSize: 18, textDecoration: 'none' }}>Hakkımızda</Link>
                <Link href="/faaliyetler" style={{ color: '#23272f', fontWeight: 500, fontSize: 18, textDecoration: 'none' }}>Faaliyetlerimiz</Link>
                <Link href="/projelerimiz" style={{ color: '#23272f', fontWeight: 500, fontSize: 18, textDecoration: 'none' }}>Projelerimiz</Link>
            </div>
        </nav>
    );
} 
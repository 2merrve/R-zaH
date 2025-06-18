import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'projects.json');
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const projects = JSON.parse(fileData);
  return { props: { projects } };
}

export default function Home({ projects = [] }) {
  return (
    <div style={{
      minHeight: '100vh',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1,
      background: '#f5f5f5'
    }}>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '80vh', // Yüksekliği biraz daha artırıldı
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff', // Metin rengi beyaz
      }}>
        {/* Arka Plan Görseli - Yeni ve profesyonel görsel */}
        <Image
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80" // Yeni inşaat görseli URL'si (Unsplash)
          alt="Şehir İnşaatı"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority // Yüksek öncelikli yükleme
        />
        {/* Üzerine Gelen Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)', // Overlay biraz daha koyu yapıldı
          zIndex: 1,
        }}></div>
        {/* İçerik */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1000, padding: '0 20px' }}>
          <h1 style={{
            fontSize: 72,
            fontWeight: 'bold',
            marginBottom: 25,
            letterSpacing: 2,
            textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
          }}>GÖKMEN İNŞAAT</h1>
          <p style={{
            fontSize: 20,
            fontWeight: 400,
            marginBottom: 50,
            textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
          }}>Her Tuğlada Güven, Her Katmanda Kalite</p>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/iletisim" className="hero-button primary" style={{
              padding: '12px 25px',
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              border: 'none',
              backgroundColor: '#333',
              transition: 'all 0.3s ease',
              color: '#fff',
              textShadow: 'none'
            }}>İletişim</Link>
            <Link href="/projeler" className="hero-button secondary" style={{
              padding: '12px 25px',
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              border: 'none',
              backgroundColor: '#f0f0f0',
              transition: 'all 0.3s ease',
              color: '#333',
              textShadow: 'none'
            }}>Projelerimiz</Link>
          </div>
        </div>
      </section>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 16px', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Hakkımızda Kısa Bölüm */}
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#ffffff',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(45deg, rgba(0,0,0,0.01), rgba(0,0,0,0.03))',
            zIndex: 0
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 25, color: '#222' }}>Biz Kimiz?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 30 }}>
              <div style={{ position: 'relative', height: 200, borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                  alt="Modern İnşaat"
                  layout="fill"
                  objectFit="cover"
                  style={{ filter: 'grayscale(30%)' }}
                />
              </div>
              <div style={{ position: 'relative', height: 200, borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                  alt="Profesyonel Ekip"
                  layout="fill"
                  objectFit="cover"
                  style={{ filter: 'grayscale(50%)' }}
                />
              </div>
            </div>
            <p style={{ fontSize: 17, color: '#444', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>
              Gökmen İnşaat olarak; sağlam temeller üzerine sadece binalar değil, güven, kalite ve gelecek inşa ediyoruz. Sektörde genç bir firma olabiliriz; fakat cesaretimiz, işimize duyduğumuz saygı ve detaylara verdiğimiz önemle fark yaratmaya kararlıyız.

              Kurulduğumuz günden bu yana hedefimiz; modern, estetik ve işlevsel yapılarla yaşam alanlarını daha yaşanabilir kılmak. Proje yönetiminden malzeme seçimine, iş gücünden zaman planlamasına kadar her adımda şeffaf, disiplinli ve çözüm odaklı bir anlayışla ilerliyoruz.

              Gökmen İnşaat, sadece betonarme yapılardan ibaret değil; aynı zamanda verdiği sözleri tutan, her işte kaliteyi ve insanı önceleyen bir duruşun temsilcisidir.

              Biz; bugünün emeğini, yarının değerine dönüştüren genç ama kararlı bir inşaat firmasıyız.
            </p>
            <div style={{ display: 'flex', gap: 15, justifyContent: 'center', marginTop: 30 }}>
              <div style={{ background: '#fff', padding: '12px 20px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
                <div style={{ fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 5 }}>4</div>
                <div style={{ fontSize: 13, color: '#666' }}>Yıllık Deneyim</div>
              </div>
              <div style={{ background: '#fff', padding: '12px 20px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
                <div style={{ fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 5 }}>15+</div>
                <div style={{ fontSize: 13, color: '#666' }}>Tamamlanan Proje</div>
              </div>
              <div style={{ background: '#fff', padding: '12px 20px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
                <div style={{ fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 5 }}>50+</div>
                <div style={{ fontSize: 13, color: '#666' }}>Uzman Personel</div>
              </div>
            </div>
            <Link href="/hakkimizda" style={{
              display: 'inline-block',
              marginTop: 30,
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 16,
              padding: '10px 25px',
              border: 'none',
              borderRadius: 8,
              transition: 'all 0.3s ease',
              background: '#333',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }} className="about-button">Devamını Oku &rarr;</Link>
          </div>
        </section>

        {/* İletişim Kısa Bölüm */}
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#f8f8f8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          textAlign: 'center',
          border: '1px solid #d0d0d0'
        }}>
          <h2 style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 25, color: '#222', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>İletişime Geçin</h2>
          <p style={{ fontSize: 17, color: '#444', lineHeight: 1.6, maxWidth: 800, margin: '0 auto' }}>Bize Ulaşın, Beton Gibi Sağlam Bir İletişim Kuralım!</p>
          <Link href="/iletisim" style={{
            display: 'inline-block',
            marginTop: 30,
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 16,
            padding: '10px 25px',
            backgroundColor: '#333',
            borderRadius: 8,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }} className="contact-button">İletişim Formu &rarr;</Link>
        </section>

        {/* Projeler Bölümü */}
        <section style={{ width: '100%', maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#222' }}>Öne Çıkan Projeler</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {projects.slice(0, 3).map((proje: any) => (
              <div key={proje.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: 24, width: 320 }}>
                <Image src={proje.gorselUrl || '/proje-resim-1.jpg'} alt={proje.baslik} width={300} height={180} style={{ borderRadius: 8, objectFit: 'cover' }} />
                <h3 style={{ fontSize: 22, fontWeight: 600, margin: '16px 0 8px 0' }}>{proje.baslik}</h3>
                <p style={{ color: '#555', fontSize: 16 }}>{proje.aciklama}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '25px 0', color: '#888', fontSize: 14, background: '#e0e0e0', borderTop: '1px solid #d0d0d0', position: 'relative', zIndex: 1 }}>
      </footer>

      {/* styled-jsx ile hover stilleri */}
      <style jsx>{`
        .hero-button {
          transition: all 0.3s ease;
        }
        .hero-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.4);
          background-color: rgba(255, 255, 255, 0.2) !important;
        }
        .contact-button:hover {
          background-color: #555;
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
        }
        .about-button:hover,
        .services-button:hover {
          background-color: #555;
          box-shadow: 0 6px 15px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
} 
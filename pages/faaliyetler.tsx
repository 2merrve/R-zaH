import React from 'react';
import Image from 'next/image';

const styles = {
  card: {
    background: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  }
};

export default function Hizmetlerimiz() {
  return (
    <div style={{
      minHeight: '100vh',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 1,
      background: '#ffffff',
    }}>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 16px 80px 16px', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* Hero Section */}
        <section style={{
          position: 'relative',
          width: '100%',
          maxWidth: 1200,
          height: '80vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: 16,
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          color: '#fff',
        }}>
          <Image
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80"
            alt="Faaliyetlerimiz Arka Planı"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
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
            }}>Faaliyetlerimiz</h1>
          </div>
        </section>

        {/* Hizmetler Bölümü */}
        <section style={{
          width: '100%',
          maxWidth: 1200,
          marginTop: 80,
          marginBottom: 60,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: 30,
        }}>

          {/* Proje Yönetimi */}
          <div style={styles.card}>
            <div style={{ position: 'relative', height: 250, width: '100%' }}>
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
                alt="Proje Yönetimi"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                padding: '20px',
                color: '#fff'
              }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Proje Yönetimi</h3>
              </div>
            </div>
            <div style={{ padding: 25 }}>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>Her projenin bir hikâyesi vardır. Biz, bu hikâyeyi en doğru şekilde planlar, süreci profesyonelce yönetir, zamanında ve eksiksiz tamamlarız.</p>
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Planlama</span>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Yönetim</span>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Takip</span>
              </div>
            </div>
          </div>

          {/* İnşaat Mühendisliği */}
          <div style={styles.card}>
            <div style={{ position: 'relative', height: 250, width: '100%' }}>
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                alt="İnşaat Mühendisliği"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                padding: '20px',
                color: '#fff'
              }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>İnşaat Mühendisliği</h3>
              </div>
            </div>
            <div style={{ padding: 25 }}>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>Güvenli, dayanıklı ve modern yapılar için mühendislik çözümleri sunuyoruz. Tasarım, analiz ve uygulama konularında uzman ekibimizle yanınızdayız.</p>
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Tasarım</span>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Analiz</span>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Uygulama</span>
              </div>
            </div>
          </div>

          {/* Danışmanlık */}
          <div style={styles.card}>
            <div style={{ position: 'relative', height: 250, width: '100%' }}>
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                alt="Danışmanlık"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                padding: '20px',
                color: '#fff'
              }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Danışmanlık</h3>
              </div>
            </div>
            <div style={{ padding: 25 }}>
              <p style={{ fontSize: 16, color: '#555', lineHeight: 1.6 }}>Sektördeki bilgi ve deneyimimizi sizinle paylaşarak projelerinizde doğru kararları almanıza yardımcı oluyoruz. Fizibilite çalışmalarından risk yönetimine kadar geniş bir alanda danışmanlık hizmeti sunuyoruz.</p>
              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Fizibilite</span>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Risk Yönetimi</span>
                <span style={{ background: '#f0f0f0', padding: '5px 10px', borderRadius: 5, fontSize: 14, color: '#666' }}>Strateji</span>
              </div>
            </div>
          </div>
        </section>

        {/* Teklif Süreçleri Bölümü */}
        <section style={{
          width: '100%',
          maxWidth: 1000,
          marginBottom: 60,
          background: '#f8f8f8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          borderLeft: 'none',
        }}>
          <h2 style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 25, color: '#333', textAlign: 'center' }}>Teklif Süreçlerimiz</h2>
          <div style={{ fontSize: 17, color: '#555', lineHeight: 1.7, maxWidth: 800, margin: '0 auto' }}>
            <p style={{ marginBottom: 25, textAlign: 'center' }}>
              Firmamızda teklif süreci, müşteri ihtiyaçlarının detaylı analizi ile başlar. Proje kapsamı ve teknik gereksinimler belirlenerek, maliyet ve zaman çizelgesi titizlikle hazırlanır. Uzman ekibimiz tarafından oluşturulan teklif, şeffaf ve detaylı olarak müşteriye sunulur. Onay sonrası, proje planlaması ve sözleşme aşamasına geçilir. Süreç boyunca iletişim ve revizyonlar etkin şekilde yönetilir, kaliteli ve zamanında hizmet garantisi sağlanır.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20, marginTop: 30 }}>
              <div style={{ background: '#fff', padding: 25, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 15 }}>📊</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: '#333' }}>Analiz</h3>
                <p style={{ fontSize: 15, color: '#666' }}>Müşteri ihtiyaçları ve proje gereksinimlerinin detaylı analizi</p>
              </div>

              <div style={{ background: '#fff', padding: 25, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 15 }}>📝</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: '#333' }}>Planlama</h3>
                <p style={{ fontSize: 15, color: '#666' }}>Maliyet ve zaman çizelgesi hazırlığı</p>
              </div>

              <div style={{ background: '#fff', padding: 25, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 15 }}>🤝</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: '#333' }}>Onay</h3>
                <p style={{ fontSize: 15, color: '#666' }}>Teklif sunumu ve sözleşme süreci</p>
              </div>

              <div style={{ background: '#fff', padding: 25, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 15 }}>📈</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10, color: '#333' }}>Takip</h3>
                <p style={{ fontSize: 15, color: '#666' }}>Süreç yönetimi ve kalite kontrolü</p>
              </div>
            </div>
          </div>
        </section>

        {/* Proje Takip Bölümü */}
        <section style={{
          width: '100%',
          maxWidth: 1000,
          marginBottom: 40,
          background: '#fff',
          borderRadius: 12,
          padding: 40,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        }}>
          <h2 style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 30, color: '#333', textAlign: 'center' }}>Proje Takibi</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 30, marginBottom: 40 }}>
            <div style={{ padding: 25, background: '#f8f9fa', borderRadius: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 15, color: '#333' }}>İlerleme Raporları</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }}>Haftalık ve aylık detaylı ilerleme raporları ile projenin durumu takip edilir</p>
            </div>

            <div style={{ padding: 25, background: '#f8f9fa', borderRadius: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 15, color: '#333' }}>Online Takip</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }}>7/24 erişilebilir online platform üzerinden proje durumu izlenebilir</p>
            </div>

            <div style={{ padding: 25, background: '#f8f9fa', borderRadius: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 15, color: '#333' }}>Kalite Kontrol</h3>
              <p style={{ fontSize: 15, color: '#666', lineHeight: 1.6 }}>Her aşamada detaylı kalite kontrol ve denetim raporları</p>
            </div>
          </div>

          <div style={{ background: '#f8f9fa', padding: 30, borderRadius: 8 }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20, color: '#333' }}>Proje Takip Süreci</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}>1</div>
                <p style={{ fontSize: 15, color: '#666', margin: 0, lineHeight: 1.6 }}>Proje başlangıcında detaylı planlama ve hedef belirleme</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}>2</div>
                <p style={{ fontSize: 15, color: '#666', margin: 0, lineHeight: 1.6 }}>Düzenli ilerleme toplantıları ve raporlama</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}>3</div>
                <p style={{ fontSize: 15, color: '#666', margin: 0, lineHeight: 1.6 }}>Risk analizi ve önleyici tedbirler</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15 }}>
                <div style={{ minWidth: 24, height: 24, borderRadius: '50%', background: '#333', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 'bold' }}>4</div>
                <p style={{ fontSize: 15, color: '#666', margin: 0, lineHeight: 1.6 }}>Kalite kontrol ve performans değerlendirmesi</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer style={{ textAlign: 'center', padding: '25px 0', color: '#888', fontSize: 14, background: '#f0f0f0', borderTop: '1px solid #e0e0e0', position: 'relative', zIndex: 1 }}>
      </footer>
    </div>
  );
} 
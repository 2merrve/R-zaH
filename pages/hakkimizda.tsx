import React from 'react';
import Image from 'next/image';

export default function Hakkimizda() {
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
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '80vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
      }}>
        <Image
          src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1600&q=80"
          alt="Şehir İnşaatı"
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
          }}>Hakkımızda</h1>
        </div>
      </section>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 16px', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Biz Kimiz? Bölümü */}
        <section style={{
          maxWidth: 800,
          width: '100%',
          marginBottom: 60,
          background: '#f8f8f8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          border: '1px solid #eee'
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 25, color: '#222', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>Biz Kimiz?</h2>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.7, margin: '0 auto' }}>
            Gökmen İnşaat olarak; sağlam temeller üzerine sadece binalar değil, güven, kalite ve gelecek inşa ediyoruz. Sektörde genç bir firma olabiliriz; fakat cesaretimiz, işimize duyduğumuz saygı ve detaylara verdiğimiz önemle fark yaratmaya kararlıyız.

            Kurulduğumuz günden bu yana hedefimiz; modern, estetik ve işlevsel yapılarla yaşam alanlarını daha yaşanabilir kılmak. Proje yönetiminden malzeme seçimine, iş gücünden zaman planlamasına kadar her adımda şeffaf, disiplinli ve çözüm odaklı bir anlayışla ilerliyoruz.

            Gökmen İnşaat, sadece betonarme yapılardan ibaret değil; aynı zamanda verdiği sözleri tutan, her işte kaliteyi ve insanı önceleyen bir duruşun temsilcisidir.

            Biz; bugünün emeğini, yarının değerine dönüştüren genç ama kararlı bir inşaat firmasıyız.</p>
        </section>

        {/* Hizmetlerimiz Bölümü */}
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#f8f8f8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          border: '1px solid #eee'
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#222', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>Hizmetlerimiz</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 25, justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', color: '#444', borderTop: '3px solid #555' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>Proje Yönetimi</h3>
              <p style={{ fontSize: 15, color: '#666' }}>Projelerinizin A&apos;dan Z&apos;ye tüm süreçlerini profesyonelce yönetiyoruz.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', color: '#444', borderTop: '3px solid #555' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>İnşaat</h3>
              <p style={{ fontSize: 15, color: '#666' }}>Yüksek standartlarda, güvenli ve modern yapılar inşa ediyoruz.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', color: '#444', borderTop: '3px solid #555' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>Danışmanlık</h3>
              <p style={{ fontSize: 15, color: '#666' }}>Sektördeki deneyimimizle projelerinize değer katan danışmanlık hizmetleri sunuyoruz.</p>
            </div>
          </div>
        </section>

        {/* Değerlerimiz Bölümü */}
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#e8e8e8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          textAlign: 'center',
          border: '1px solid #d0d0d0'
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#222', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>Değerlerimiz</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 30, justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', color: '#444', borderTop: '3px solid #555' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>Güvenilirlik</h3>
              <p style={{ fontSize: 15, color: '#666' }}>Söz verdiğimiz her şeyi, temelden çatıya kadar eksiksiz yerine getiririz.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', color: '#444', borderTop: '3px solid #555' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>Kalite</h3>
              <p style={{ fontSize: 15, color: '#666' }}>Detaylarda saklı mükemmelliği, her projemize özenle işleriz.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', color: '#444', borderTop: '3px solid #555' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>İnovasyon</h3>
              <p style={{ fontSize: 15, color: '#666' }}>Kalıpları kırar, yenilikle inşa ederiz—hem fikri hem yapıyı.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 10, padding: '20px 30px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', color: '#444', borderTop: '3px solid #555' }}>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 10, color: '#333' }}>Müşteri Memnuniyeti</h3>
              <p style={{ fontSize: 15, color: '#666' }}>Bizim için "işin bitmesi" değil, "memnuniyetin başlaması" önemlidir.</p>
            </div>
          </div>
        </section>

        {/* İş Yapış Şeklimiz Bölümü */}
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#f8f8f8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          border: '1px solid #eee'
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#222', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>İş Yapış Şeklimiz</h2>
          <div style={{ fontSize: 18, color: '#444', lineHeight: 1.6, maxWidth: 800, margin: '0 auto', textAlign: 'left' }}>
            <p style={{ marginBottom: 25, textAlign: 'center' }}>
              Projelerimizi; analiz, planlama, uygulama ve denetim aşamalarında sistematik bir yaklaşımla yürütürüz. Her işte ölçek fark etmeksizin mühendislik prensiplerine, iş sağlığı ve güvenliği kurallarına ve yasal mevzuata tam uyum sağlarız.
            </p>
            <p style={{ marginBottom: 25, textAlign: 'center' }}>
              Zaman, maliyet ve kalite üçgeninde denge kurarak; iş programına sadık, kaynakları verimli kullanan ve süreci şeffaf şekilde yöneten bir anlayış benimsiyoruz.
            </p>
            <p style={{ marginBottom: 25, textAlign: 'center' }}>
              İletişimi sürekli, kararları veri odaklı ve uygulamayı sahaya uygun hale getirerek, her projede sürdürülebilir başarıyı hedefliyoruz.
            </p>
          </div>
        </section>

        {/* Ekibimiz Bölümü */}
        <section style={{
          maxWidth: 1000,
          width: '100%',
          marginBottom: 60,
          background: '#f8f8f8',
          borderRadius: 16,
          padding: 40,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center',
          border: '1px solid #eee'
        }}>
          <h2 style={{ fontSize: 36, fontWeight: 'bold', marginBottom: 30, color: '#222', textShadow: '1px 1px 3px rgba(0,0,0,0.1)' }}>Ekibimiz</h2>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.6, maxWidth: 800, margin: '0 auto 40px auto' }}>Biz projeleri Excel'de başlatır, sahada sonuçlandırırız. Krizlere soğukkanlı, kahveye sıcak bakarız. İş bitmeden masasından kalkmayan, plan yapmadan adım atmayan bir ekibiz.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 30, justifyContent: 'center' }}>
            {/* Yönetici */}
            <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center', paddingBottom: 20 }}>
              <div style={{ position: 'relative', width: '100%', height: 600, marginBottom: 15 }}>
                <Image
                  src="/yonetimekibi.jpg"
                  alt="Yönetim Ekibi"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 5, color: '#333' }}>Yönetim Ekibi</h3>
              <p style={{ fontSize: 15, color: '#555', marginBottom: 15 }}>Profesyonel Yönetim Kadrosu</p>
              <p style={{ fontSize: 16, color: '#444', lineHeight: 1.6, padding: '0 20px' }}>
                Gökmen Kardeşler olarak, bu yolda omuz omuza yürümekten doğan birlik ruhunu işimize yansıtıyor; birlikte başarmanın gururunu ve güvenle ilerlemenin mutluluğunu yaşıyoruz.
              </p>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
} 
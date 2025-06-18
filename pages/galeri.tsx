import React from 'react';
import { getGaleri, addGaleri, deleteGaleri, updateGaleri } from '../lib/db';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';

interface GaleriItem {
  id: string;
  baslik: string;
  tip: string;
  medyaUrl: string | null;
}

export default function Galeri({ galeriler }: { galeriler: GaleriItem[] }) {
  return (
    <div>
      <h1>Galeri</h1>
      <ul>
        {galeriler.map((g: GaleriItem) => (
          <li key={g.id}>
            <b>{g.baslik}</b> - {g.tip}
            {g.medyaUrl && (g.tip === 'fotoğraf' ? <Image src={g.medyaUrl} alt={g.baslik || 'Galeri görseli'} width={50} height={50} /> : <video src={g.medyaUrl} width={50} height={50} controls><source src={g.medyaUrl} type={`video/${g.medyaUrl.split('.').pop()}`} />Tarayıcınız video etiketini desteklemiyor.</video>)}
            <form method="post" style={{ display: 'inline', marginLeft: 8 }}>
              <input type="hidden" name="sil_id" value={g.id} />
              <button type="submit">Sil</button>
            </form>
            <details style={{ display: 'inline', marginLeft: 8 }}>
              <summary>Düzenle</summary>
              <form method="post">
                <input type="hidden" name="guncelle_id" value={g.id} />
                <input name="baslik" defaultValue={g.baslik} required />
                <input name="medyaUrl" defaultValue={g.medyaUrl || ''} required />
                <select name="tip" defaultValue={g.tip} required>
                  <option value="fotoğraf">fotoğraf</option>
                  <option value="video">video</option>
                </select>
                <button type="submit">Kaydet</button>
              </form>
            </details>
          </li>
        ))}
      </ul>
      <h2>Yeni Medya Ekle</h2>
      <form method="post">
        <input name="baslik" placeholder="Başlık" required />
        <input name="medyaUrl" placeholder="Medya URL" required />
        <select name="tip" required>
          <option value="fotoğraf">fotoğraf</option>
          <option value="video">video</option>
        </select>
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.req.method === 'POST') {
    const body = await new Promise<{ sil_id?: string; guncelle_id?: string; baslik?: string; medyaUrl?: string; tip?: string }>((resolve) => {
      let data = '';
      context.req.on('data', (chunk: string) => { data += chunk; });
      context.req.on('end', () => {
        resolve(Object.fromEntries(new URLSearchParams(data)));
      });
    });
    if (body.sil_id) {
      await deleteGaleri(body.sil_id);
    } else if (body.guncelle_id) {
      await updateGaleri(Number(body.guncelle_id), {
        baslik: body.baslik,
        resim: body.medyaUrl,
        kategori: body.tip
      });
    } else if (body.baslik && body.medyaUrl && body.tip) {
      await addGaleri({
        baslik: body.baslik,
        resim: body.medyaUrl,
        kategori: body.tip
      });
    }
    return {
      redirect: {
        destination: '/galeri',
        permanent: false,
      },
    };
  }
  const galeriler = await getGaleri();
  return { props: { galeriler } };
} 
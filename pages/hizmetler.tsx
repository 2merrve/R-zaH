import React from 'react';
import { getHizmetler, addHizmet, deleteHizmet, updateHizmet } from '../lib/db';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';

interface HizmetItem {
  id: string;
  baslik: string;
  aciklama: string;
  gorselUrl: string | null;
}

export default function Hizmetler({ hizmetler }: { hizmetler: HizmetItem[] }) {
  return (
    <div>
      <h1>Hizmetler</h1>
      <ul>
        {hizmetler.map((hizmet: HizmetItem) => (
          <li key={hizmet.id}>
            <b>{hizmet.baslik}</b> - {hizmet.aciklama}
            {hizmet.gorselUrl && <Image src={hizmet.gorselUrl} alt={hizmet.baslik || 'Hizmet görseli'} width={50} height={50} />}
            <form method="post" style={{ display: 'inline', marginLeft: 8 }}>
              <input type="hidden" name="sil_id" value={hizmet.id} />
              <button type="submit">Sil</button>
            </form>
            <details style={{ display: 'inline', marginLeft: 8 }}>
              <summary>Düzenle</summary>
              <form method="post">
                <input type="hidden" name="guncelle_id" value={hizmet.id} />
                <input name="baslik" defaultValue={hizmet.baslik} required />
                <input name="aciklama" defaultValue={hizmet.aciklama} required />
                <input name="gorselUrl" defaultValue={hizmet.gorselUrl || ''} />
                <button type="submit">Kaydet</button>
              </form>
            </details>
          </li>
        ))}
      </ul>
      <h2>Yeni Hizmet Ekle</h2>
      <form method="post">
        <input name="baslik" placeholder="Başlık" required />
        <input name="aciklama" placeholder="Açıklama" required />
        <input name="gorselUrl" placeholder="Görsel URL" />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.req.method === 'POST') {
    const body = await new Promise<{ sil_id?: string; guncelle_id?: string; baslik?: string; aciklama?: string; gorselUrl?: string; resim?: string; fiyat?: string }>((resolve) => {
      let data = '';
      context.req.on('data', (chunk: string) => { data += chunk; });
      context.req.on('end', () => {
        resolve(Object.fromEntries(new URLSearchParams(data)));
      });
    });
    if (body.sil_id) {
      await deleteHizmet(body.sil_id);
    } else if (body.guncelle_id) {
      await updateHizmet(Number(body.guncelle_id), {
        baslik: body.baslik,
        aciklama: body.aciklama,
        resim: body.resim,
        fiyat: Number(body.fiyat)
      });
    } else if (body.baslik && body.aciklama) {
      await addHizmet({
        baslik: body.baslik,
        aciklama: body.aciklama,
        resim: body.resim,
        fiyat: Number(body.fiyat)
      });
    }
    return {
      redirect: {
        destination: '/hizmetler',
        permanent: false,
      },
    };
  }
  const hizmetler = await getHizmetler();
  return { props: { hizmetler } };
} 
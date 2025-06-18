import React from 'react';
import { getBlog, addBlog, deleteBlog, updateBlog } from '../lib/db';
import { GetServerSidePropsContext } from 'next';

interface BlogItem {
  id: string;
  baslik: string;
  icerik: string;
  tarih: string;
}

export default function Blog({ bloglar }: { bloglar: BlogItem[] }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {bloglar.map((blog: BlogItem) => (
          <li key={blog.id}>
            <b>{blog.baslik}</b> - {blog.icerik} - <i>{blog.tarih}</i>
            <form method="post" style={{ display: 'inline', marginLeft: 8 }}>
              <input type="hidden" name="sil_id" value={blog.id} />
              <button type="submit">Sil</button>
            </form>
            <details style={{ display: 'inline', marginLeft: 8 }}>
              <summary>Düzenle</summary>
              <form method="post">
                <input type="hidden" name="guncelle_id" value={blog.id} />
                <input name="baslik" defaultValue={blog.baslik} required />
                <input name="icerik" defaultValue={blog.icerik} required />
                <input name="tarih" defaultValue={blog.tarih} required />
                <button type="submit">Kaydet</button>
              </form>
            </details>
          </li>
        ))}
      </ul>
      <h2>Yeni Blog Ekle</h2>
      <form method="post">
        <input name="baslik" placeholder="Başlık" required />
        <input name="icerik" placeholder="İçerik" required />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (context.req.method === 'POST') {
    const body = await new Promise<{ sil_id?: string; guncelle_id?: string; baslik?: string; icerik?: string; tarih?: string }>((resolve) => {
      let data = '';
      context.req.on('data', (chunk: string) => { data += chunk; });
      context.req.on('end', () => {
        resolve(Object.fromEntries(new URLSearchParams(data)));
      });
    });
    if (body.sil_id) {
      await deleteBlog(body.sil_id);
    } else if (body.guncelle_id) {
      await updateBlog(Number(body.guncelle_id), {
        baslik: body.baslik,
        icerik: body.icerik,
        tarih: body.tarih
      });
    } else if (body.baslik && body.icerik) {
      const tarih = new Date().toISOString().slice(0, 10);
      await addBlog({
        baslik: body.baslik,
        icerik: body.icerik,
        tarih: tarih,
        yazar: 'Admin'
      });
    }
    return {
      redirect: {
        destination: '/blog',
        permanent: false,
      },
    };
  }
  const bloglar = await getBlog();
  return { props: { bloglar } };
} 
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT
      );

      CREATE TABLE IF NOT EXISTS hizmetler (
        id SERIAL PRIMARY KEY,
        baslik TEXT NOT NULL,
        aciklama TEXT NOT NULL,
        gorselUrl TEXT
      );

      CREATE TABLE IF NOT EXISTS projeler (
        id SERIAL PRIMARY KEY,
        baslik TEXT NOT NULL,
        aciklama TEXT NOT NULL,
        durum TEXT NOT NULL,
        gorselUrl TEXT
      );

      CREATE TABLE IF NOT EXISTS blog (
        id SERIAL PRIMARY KEY,
        baslik TEXT NOT NULL,
        icerik TEXT NOT NULL,
        tarih TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS galeri (
        id SERIAL PRIMARY KEY,
        baslik TEXT NOT NULL,
        medyaUrl TEXT NOT NULL,
        tip TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS iletisim (
        id SERIAL PRIMARY KEY,
        adSoyad TEXT NOT NULL,
        email TEXT NOT NULL,
        mesaj TEXT NOT NULL,
        tarih TEXT NOT NULL
      );
    `;

    // Admin kullanıcısı ekle
    const hashedPassword = await bcrypt.hash('password', 10);
    await sql`
      INSERT INTO users (email, password)
      VALUES ('admin@example.com', ${hashedPassword})
      ON CONFLICT (email) DO NOTHING;
    `;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

interface User {
  id: number;
  email: string;
  password?: string;
  name?: string;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = result.rows[0] as User | undefined;

    if (user && user.password && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('User verification error:', error);
    return null;
  }
}

export async function getHizmetler() {
  try {
    const result = await sql`SELECT * FROM hizmetler`;
    return result.rows;
  } catch (error) {
    console.error('Get hizmetler error:', error);
    return [];
  }
}

export async function addHizmet(baslik: string, aciklama: string, gorselUrl: string | null) {
  try {
    return await sql`
      INSERT INTO hizmetler (baslik, aciklama, gorselUrl)
      VALUES (${baslik}, ${aciklama}, ${gorselUrl})
      RETURNING *
    `;
  } catch (error) {
    console.error('Add hizmet error:', error);
    throw error;
  }
}

export async function deleteHizmet(id: string) {
  try {
    return await sql`DELETE FROM hizmetler WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete hizmet error:', error);
    throw error;
  }
}

export async function getProjeler() {
  try {
    const result = await sql`SELECT * FROM projeler`;
    return result.rows;
  } catch (error) {
    console.error('Get projeler error:', error);
    return [];
  }
}

export async function addProje(baslik: string, aciklama: string, durum: string, gorselUrl: string | null) {
  try {
    return await sql`
      INSERT INTO projeler (baslik, aciklama, durum, gorselUrl)
      VALUES (${baslik}, ${aciklama}, ${durum}, ${gorselUrl})
      RETURNING *
    `;
  } catch (error) {
    console.error('Add proje error:', error);
    throw error;
  }
}

export async function deleteProje(id: string) {
  try {
    return await sql`DELETE FROM projeler WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete proje error:', error);
    throw error;
  }
}

export async function getBlog() {
  try {
    const result = await sql`SELECT * FROM blog`;
    return result.rows;
  } catch (error) {
    console.error('Get blog error:', error);
    return [];
  }
}

export async function deleteBlog(id: string) {
  try {
    return await sql`DELETE FROM blog WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete blog error:', error);
    throw error;
  }
}

export async function getGaleri() {
  try {
    const result = await sql`SELECT * FROM galeri`;
    return result.rows;
  } catch (error) {
    console.error('Get galeri error:', error);
    return [];
  }
}

export async function deleteGaleri(id: string) {
  try {
    return await sql`DELETE FROM galeri WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete galeri error:', error);
    throw error;
  }
}

export async function getIletisim() {
  try {
    const result = await sql`SELECT * FROM iletisim`;
    return result.rows;
  } catch (error) {
    console.error('Get iletisim error:', error);
    return [];
  }
}

export async function addIletisim(adSoyad: string, email: string, mesaj: string, tarih: string) {
  try {
    return await sql`
      INSERT INTO iletisim (adSoyad, email, mesaj, tarih)
      VALUES (${adSoyad}, ${email}, ${mesaj}, ${tarih})
      RETURNING *
    `;
  } catch (error) {
    console.error('Add iletisim error:', error);
    throw error;
  }
}

export async function deleteIletisim(id: string) {
  try {
    return await sql`DELETE FROM iletisim WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete iletisim error:', error);
    throw error;
  }
}

export async function addUser(name: string, email: string, password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING *
    `;
  } catch (error) {
    console.error('Add user error:', error);
    throw error;
  }
}

export async function getUsers(): Promise<User[]> {
  try {
    const result = await sql`SELECT id, name, email FROM users`;
    return result.rows as User[];
  } catch (error) {
    console.error('Get users error:', error);
    return [];
  }
}

export async function updateUser(id: number, name: string, email: string) {
  try {
    return await sql`
      UPDATE users 
      SET name = ${name}, email = ${email}
      WHERE id = ${id}
      RETURNING *
    `;
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
}

export async function deleteUser(id: number) {
  try {
    return await sql`DELETE FROM users WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
}

export async function addBlog(data: {
  baslik: string;
  icerik: string;
  resim?: string;
  yazar: string;
  tarih: string;
}) {
  try {
    const result = await sql`
      INSERT INTO blog (baslik, icerik, resim, yazar, tarih)
      VALUES (${data.baslik}, ${data.icerik}, ${data.resim}, ${data.yazar}, ${data.tarih})
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Blog ekleme hatası:', error);
    throw error;
  }
}

export async function updateBlog(id: number, data: {
  baslik?: string;
  icerik?: string;
  resim?: string;
  yazar?: string;
  tarih?: string;
}) {
  try {
    const result = await sql`
      UPDATE blog 
      SET 
        baslik = COALESCE(${data.baslik}, baslik),
        icerik = COALESCE(${data.icerik}, icerik),
        resim = COALESCE(${data.resim}, resim),
        yazar = COALESCE(${data.yazar}, yazar),
        tarih = COALESCE(${data.tarih}, tarih)
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Blog güncelleme hatası:', error);
    throw error;
  }
}

export async function addGaleri(data: {
  baslik: string;
  resim: string;
  aciklama?: string;
  kategori?: string;
}) {
  try {
    const result = await sql`
      INSERT INTO galeri (baslik, resim, aciklama, kategori)
      VALUES (${data.baslik}, ${data.resim}, ${data.aciklama}, ${data.kategori})
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Galeri ekleme hatası:', error);
    throw error;
  }
}

export async function updateGaleri(id: number, data: {
  baslik?: string;
  resim?: string;
  aciklama?: string;
  kategori?: string;
}) {
  try {
    const result = await sql`
      UPDATE galeri 
      SET 
        baslik = COALESCE(${data.baslik}, baslik),
        resim = COALESCE(${data.resim}, resim),
        aciklama = COALESCE(${data.aciklama}, aciklama),
        kategori = COALESCE(${data.kategori}, kategori)
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Galeri güncelleme hatası:', error);
    throw error;
  }
} 
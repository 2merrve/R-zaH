import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export async function initDb() {
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
}

interface User {
  id: number;
  email: string;
  password?: string;
  name?: string;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
  const result = await sql`SELECT * FROM users WHERE email = ${email}`;
  const user = result.rows[0] as User | undefined;

  if (user && user.password && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}

export async function getHizmetler() {
  const result = await sql`SELECT * FROM hizmetler`;
  return result.rows;
}

export async function addHizmet(baslik: string, aciklama: string, gorselUrl: string | null) {
  return sql`
    INSERT INTO hizmetler (baslik, aciklama, gorselUrl)
    VALUES (${baslik}, ${aciklama}, ${gorselUrl})
    RETURNING *
  `;
}

export async function deleteHizmet(id: string) {
  return sql`DELETE FROM hizmetler WHERE id = ${id}`;
}

export async function getProjeler() {
  const result = await sql`SELECT * FROM projeler`;
  return result.rows;
}

export async function addProje(baslik: string, aciklama: string, durum: string, gorselUrl: string | null) {
  return sql`
    INSERT INTO projeler (baslik, aciklama, durum, gorselUrl)
    VALUES (${baslik}, ${aciklama}, ${durum}, ${gorselUrl})
    RETURNING *
  `;
}

export async function deleteProje(id: string) {
  return sql`DELETE FROM projeler WHERE id = ${id}`;
}

export async function getBlog() {
  const result = await sql`SELECT * FROM blog`;
  return result.rows;
}

export async function deleteBlog(id: string) {
  return sql`DELETE FROM blog WHERE id = ${id}`;
}

export async function getGaleri() {
  const result = await sql`SELECT * FROM galeri`;
  return result.rows;
}

export async function deleteGaleri(id: string) {
  return sql`DELETE FROM galeri WHERE id = ${id}`;
}

export async function getIletisim() {
  const result = await sql`SELECT * FROM iletisim`;
  return result.rows;
}

export async function addIletisim(adSoyad: string, email: string, mesaj: string, tarih: string) {
  return sql`
    INSERT INTO iletisim (adSoyad, email, mesaj, tarih)
    VALUES (${adSoyad}, ${email}, ${mesaj}, ${tarih})
    RETURNING *
  `;
}

export async function deleteIletisim(id: string) {
  return sql`DELETE FROM iletisim WHERE id = ${id}`;
}

export async function addUser(name: string, email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return sql`
    INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword})
    RETURNING *
  `;
}

export async function getUsers(): Promise<User[]> {
  const result = await sql`SELECT id, name, email FROM users`;
  return result.rows as User[];
}

export async function updateUser(id: number, name: string, email: string) {
  return sql`
    UPDATE users 
    SET name = ${name}, email = ${email}
    WHERE id = ${id}
    RETURNING *
  `;
}

export async function deleteUser(id: number) {
  return sql`DELETE FROM users WHERE id = ${id}`;
} 
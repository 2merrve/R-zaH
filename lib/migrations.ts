import { sql } from '@vercel/postgres';

export async function createTables() {
    await sql`
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
} 
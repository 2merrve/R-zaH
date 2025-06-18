import { sql } from '@vercel/postgres';
import pool from './db';

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

export async function runMigrations() {
  // Projeler tablosu
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      status TEXT,
      location TEXT,
      start_date TEXT,
      end_date TEXT,
      image TEXT,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Mesajlar tablosu
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT false,
      reply TEXT,
      replied_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
}

// Komut satırından çalıştırmak için:
if (require.main === module) {
  runMigrations().then(() => {
    console.log('Migration tamamlandı.');
    process.exit(0);
  });
} 
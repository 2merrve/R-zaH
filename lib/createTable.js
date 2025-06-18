import sqlite3 from 'sqlite3';
sqlite3.verbose();
const db = new sqlite3.Database('./dev.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS hizmetler (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    baslik TEXT NOT NULL,
    aciklama TEXT NOT NULL,
    gorselUrl TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS projeler (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    baslik TEXT NOT NULL,
    aciklama TEXT NOT NULL,
    durum TEXT NOT NULL,
    gorselUrl TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS blog (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    baslik TEXT NOT NULL,
    icerik TEXT NOT NULL,
    tarih TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS galeri (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    baslik TEXT NOT NULL,
    medyaUrl TEXT NOT NULL,
    tip TEXT NOT NULL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS iletisim (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    adSoyad TEXT NOT NULL,
    email TEXT NOT NULL,
    mesaj TEXT NOT NULL,
    tarih TEXT NOT NULL
  )`);
});

db.close(); 

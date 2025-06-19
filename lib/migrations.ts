# Query

Query is available on[Pro and Enterprise plans](/docs/plans / enterprise)

Those with the[owner, member, developer](/docs/rbac / access - roles#owner, member, developer - role) role can access this feature

Observability allows you to visualize and quantify the performance and traffic of your projects through creating queries:

Use the chart button on the top right of the Observability tab to create a query.

* View pre - filled queries by clicking the Explore query button on observability charts
  * Explore query results in detail and use filters to adjust the date, aggregation, and dimensions

![Create query in Observability Tab.](/_next/image ? url = https % 3A % 2F % 2Fassets.vercel.com % 2Fimage % 2Fupload % 2Fv1689795055 % 2Fdocs - assets % 2Fstatic % 2Fdocs % 2Fquery - builder % 2Fquery - builder - light.png & w=1920 & q=75)![Create query in Observability Tab.](/_next/image ? url = https % 3A % 2F % 2Fassets.vercel.com % 2Fimage % 2Fupload % 2Fv1689795055 % 2Fdocs - assets % 2Fstatic % 2Fdocs % 2Fquery - builder % 2Fquery - builder - dark.png & w=1920 & q=75)

Create query in Observability Tab.

##[Enable Query](#enable - query)

Enabling and disabling Observability Plus are available on[Pro and Enterprise plans](/docs/plans / enterprise)

Those with the[owner](/docs/rbac / access - roles#owner - role) role can access this feature

  * Pro and Enterprise teams should[Upgrade to Observability Plus](/docs/observability#enabling - observability - plus) to edit queries in modal.
* Free observability users can still open query, but they cannot modify any filters or create new queries.

[Enterprise](/docs/plans / enterprise) teams can[contact sales](/contact/sales) to get a customized plan based on their requirements.

##[Manage IP Address visibility for Query](#manage - ip - address - visibility -for-query)

Managing IP Address visibility is available on[Pro and Enterprise plans](/docs/plans / enterprise)

Those with the[owner, admin](/docs/rbac / access - roles#owner, admin - role) role can access this feature

Vercel creates events each time a request is made to your website.These events include unique parameters such as execution time and bandwidth used.

Certain events such as `public_ip` may be considered personal information under certain data protection laws.To hide IP addresses from your query:

1.  Go to the Vercel[dashboard](/dashboard) and ensure your team is selected in the scope selector.
2.  Go to the Settings tab and navigate to Security & Privacy.
3.  Under IP Address Visibility, toggle the switch next to "Off" so the text reads IP addresses are currently hidden in the Vercel Dashboard..

For business purposes, such as DDoS mitigation, Vercel will still collect IP addresses.

##[More resources](#more - resources)

  * [Reference](/docs/observability / query / query - reference)

Last updated on June 19, 2025import { sql } from '@vercel/postgres';
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
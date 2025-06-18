import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export default function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', [
      serialize('admin-token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      }),
      serialize('auth', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      })
    ]);
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 
import React, { useState, useEffect } from 'react';

export default function AdminContactInfo() {
    const [form, setForm] = useState({ adres: '', telefon: '', eposta: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetch('/api/contact-info')
            .then(res => res.json())
            .then(data => setForm(data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Kaydediliyor...');
        const res = await fetch('/api/contact-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        if (res.ok) setStatus('Başarıyla kaydedildi!');
        else setStatus('Hata oluştu!');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', color: '#222' }}>
            <div style={{ maxWidth: 500, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 32 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>İletişim Bilgilerini Düzenle</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ fontWeight: 600 }}>Adres</label>
                        <input name="adres" value={form.adres} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginTop: 6, fontSize: 16 }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ fontWeight: 600 }}>Telefon</label>
                        <input name="telefon" value={form.telefon} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginTop: 6, fontSize: 16 }} />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                        <label style={{ fontWeight: 600 }}>E-posta</label>
                        <input name="eposta" value={form.eposta} onChange={handleChange} style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', marginTop: 6, fontSize: 16 }} />
                    </div>
                    <button type="submit" style={{ padding: '12px 30px', background: '#333', color: '#fff', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 10 }}>Kaydet</button>
                </form>
                {status && <p style={{ marginTop: 18, color: status.includes('Başarı') ? 'green' : 'red' }}>{status}</p>}
            </div>
        </div>
    );
} 
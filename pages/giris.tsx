import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Giris() {
    const [email, setEmail] = useState('');
    const [sifre, setSifre] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, sifre }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500);
            } else {
                setError(data.message || 'Giriş başarısız oldu.');
            }
        } catch (err) {
            setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            console.error('Giriş hatası:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f5f5f5'
        }}>
            <div style={{
                background: '#fff',
                padding: 40,
                borderRadius: 8,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: 400
            }}>
                <h1 style={{
                    margin: '0 0 30px 0',
                    textAlign: 'center',
                    color: '#333'
                }}>Giriş Yap</h1>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 20 }}>
                        <label style={{
                            display: 'block',
                            marginBottom: 8,
                            color: '#666'
                        }}>
                            E-posta Adresi
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ddd',
                                borderRadius: 4,
                                fontSize: 16
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <label style={{
                            display: 'block',
                            marginBottom: 8,
                            color: '#666'
                        }}>
                            Şifre
                        </label>
                        <input
                            type="password"
                            value={sifre}
                            onChange={(e) => setSifre(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #ddd',
                                borderRadius: 4,
                                fontSize: 16
                            }}
                            required
                        />
                    </div>

                    {error && (
                        <div style={{
                            color: '#dc3545',
                            marginBottom: 20,
                            fontSize: 14
                        }}>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div style={{
                            color: '#28a745',
                            marginBottom: 20,
                            fontSize: 14
                        }}>
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#333',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            fontSize: 16,
                            cursor: 'pointer',
                            transition: 'background 0.3s ease'
                        }}
                        disabled={loading}
                    >
                        {loading ? 'Yükleniyor...' : 'Giriş Yap'}
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <a href="/kayit" style={{ color: '#007bff', textDecoration: 'none' }}>
                        Hesabınız yok mu? Kayıt olun
                    </a>
                </div>
            </div>
        </div>
    );
} 
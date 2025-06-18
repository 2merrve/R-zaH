import React, { useEffect, useState } from 'react';
import Link from 'next/link';

function getUserNameFromCookie() {
    if (typeof document === 'undefined') return '';
    const match = document.cookie.match(/auth=([^;]+)/);
    if (!match) return '';
    try {
        const val = decodeURIComponent(match[1]);
        const obj = JSON.parse(val);
        return obj.name || obj.email || '';
    } catch {
        return '';
    }
}

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('/api/auth/check');
                setIsLoggedIn(res.ok);
                if (res.ok) {
                    setUserName(getUserNameFromCookie());
                } else {
                    setUserName('');
                }
            } catch {
                setIsLoggedIn(false);
                setUserName('');
            }
        };
        checkAuth();
    }, []);

    return (
        <header className="bg-white shadow">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-gray-800">
                                Gökmen İnşaat
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                                Ana Sayfa
                            </Link>
                            <Link href="/hizmetler" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                                Hizmetler
                            </Link>
                            <Link href="/hakkimizda" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                                Hakkımızda
                            </Link>
                            <Link href="/iletisim" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300">
                                İletişim
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn && userName && (
                            <span className="text-gray-700 font-semibold">{userName}</span>
                        )}
                        {!isLoggedIn && (
                            <>
                                <Link href="/giris" className="text-gray-600 hover:text-gray-900">
                                    Giriş Yap
                                </Link>
                                <Link href="/kayit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <button
                                onClick={async () => {
                                    await fetch('/api/auth/logout', { method: 'POST' });
                                    window.location.href = '/';
                                }}
                                className="text-gray-600 hover:text-gray-900 border border-gray-300 rounded px-3 py-1"
                            >
                                Çıkış Yap
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
} 
import React, { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<{ name: string; email: string }>({ name: '', email: '' });
    const [status, setStatus] = useState('');

    const fetchUsers = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleEdit = (user: User) => {
        setEditId(user.id);
        setEditForm({ name: user.name, email: user.email });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleEditSave = async () => {
        await fetch('/api/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editId, ...editForm }),
        });
        setEditId(null);
        setStatus('Güncellendi!');
        fetchUsers();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Kullanıcıyı silmek istediğinize emin misiniz?')) return;
        await fetch('/api/users', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setStatus('Silindi!');
        fetchUsers();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', color: '#222' }}>
            <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.10)', padding: 32 }}>
                <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>Kullanıcıları Yönet</h2>
                {status && <p style={{ color: 'green', marginBottom: 16 }}>{status}</p>}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f0f0f0' }}>
                            <th style={{ padding: 10, borderRadius: 6, textAlign: 'left' }}>Ad Soyad</th>
                            <th style={{ padding: 10, borderRadius: 6, textAlign: 'left' }}>E-posta</th>
                            <th style={{ padding: 10, borderRadius: 6 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: 10 }}>
                                    {editId === user.id ? (
                                        <input name="name" value={editForm.name} onChange={handleEditChange} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }} />
                                    ) : (
                                        user.name
                                    )}
                                </td>
                                <td style={{ padding: 10 }}>
                                    {editId === user.id ? (
                                        <input name="email" value={editForm.email} onChange={handleEditChange} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }} />
                                    ) : (
                                        user.email
                                    )}
                                </td>
                                <td style={{ padding: 10 }}>
                                    {editId === user.id ? (
                                        <>
                                            <button onClick={handleEditSave} style={{ marginRight: 8, padding: '6px 14px', borderRadius: 4, background: '#333', color: '#fff', border: 'none', cursor: 'pointer' }}>Kaydet</button>
                                            <button onClick={() => setEditId(null)} style={{ padding: '6px 14px', borderRadius: 4, background: '#bbb', color: '#fff', border: 'none', cursor: 'pointer' }}>İptal</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(user)} style={{ marginRight: 8, padding: '6px 14px', borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer' }}>Düzenle</button>
                                            <button onClick={() => handleDelete(user.id)} style={{ padding: '6px 14px', borderRadius: 4, background: '#d32f2f', color: '#fff', border: 'none', cursor: 'pointer' }}>Sil</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
} 
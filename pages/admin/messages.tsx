import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  updatedAt?: string;
  reply?: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [reply, setReply] = useState('');
  const [replyStatus, setReplyStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch('/api/messages');
    const data = await res.json();
    setMessages(Array.isArray(data) ? data : []);
  };

  const handleMarkAsRead = async (messageId: number) => {
    const res = await fetch(`/api/messages?id=${messageId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isRead: true })
    });

    if (res.ok) {
      await fetchMessages();
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
    const res = await fetch(`/api/messages?id=${messageId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setSelectedMessage(null);
      await fetchMessages();
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    router.push('/admin/login');
  };

  const handleGoBack = () => {
    router.push('/admin');
  };

  const handleReply = async () => {
    if (!selectedMessage) return;
    setReplyStatus('Gönderiliyor...');
    const res = await fetch(`/api/messages?id=${selectedMessage.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    });
    if (res.ok) {
      setReply('');
      setReplyStatus('Cevap gönderildi!');
      await fetchMessages();
    } else {
      setReplyStatus('Cevap gönderilemedi!');
    }
  };

  return (
    <div className="admin-container">
      <header>
        <h1>Gelen Mesajlar</h1>
        <div className="header-buttons">
          <Link href="/" passHref>
            <button className="site-button">
              Siteye Dön
            </button>
          </Link>
          <button className="back-button" onClick={handleGoBack}>
            Geri
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Çıkış Yap
          </button>
        </div>
      </header>

      <div className="messages-layout">
        <div className="message-list">
          {messages.map(message => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`message-item ${selectedMessage?.id === message.id ? 'selected' : ''} ${message.isRead ? 'read' : ''}`}
            >
              <div className="message-name">
                {message.name}
              </div>
              <div className="message-date">
                {new Date(message.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="message-detail">
          {selectedMessage ? (
            <div>
              <div className="detail-header">
                <h2>Mesaj Detayı</h2>
                <div className="message-date">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="detail-field">
                <strong>Gönderen:</strong> {selectedMessage.name}
              </div>
              <div className="detail-field">
                <strong>E-posta:</strong> {selectedMessage.email}
              </div>
              <div className="message-content">
                {selectedMessage.message}
              </div>

              {!selectedMessage.isRead && (
                <button className="mark-read-button" onClick={() => handleMarkAsRead(selectedMessage.id)}>
                  Okundu Olarak İşaretle
                </button>
              )}
              <button className="logout-button" style={{ marginLeft: 10, background: '#b71c1c' }} onClick={() => handleDeleteMessage(selectedMessage.id)}>
                Mesajı Sil
              </button>

              <div style={{ marginTop: 24 }}>
                <h3>Cevapla</h3>
                {selectedMessage.reply ? (
                  <div style={{ background: '#333', padding: 12, borderRadius: 6, marginBottom: 8 }}>
                    <b>Verilen Cevap:</b>
                    <div>{selectedMessage.reply}</div>
                  </div>
                ) : (
                  <>
                    <textarea
                      value={reply}
                      onChange={e => setReply(e.target.value)}
                      placeholder="Cevabınızı yazın..."
                      style={{ width: '100%', minHeight: 80, borderRadius: 6, padding: 8, marginBottom: 8 }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button className="mark-read-button" onClick={handleReply} style={{ marginRight: 8 }}>
                        Cevapla
                      </button>
                      {replyStatus && <span>{replyStatus}</span>}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="no-message-selected">
              Mesaj seçilmedi
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          padding: 20px;
          max-width: 1200px;
          margin: 40px auto;
          background-color: #212121; // Dark background
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          color: #e0e0e0;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #424242;
        }
        h1 {
          margin: 0;
          color: #f5f5f5;
          font-size: 28px;
        }
        .header-buttons {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .header-buttons a {
          text-decoration: none;
        }
        .back-button, .logout-button, .mark-read-button, .site-button {
          padding: 8px 16px;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s ease;
        }
         .site-button {
          background-color: rgba(255,255,255,0.1); 
          border: 1px solid rgba(255,255,255,0.2);
        }
        .site-button:hover {
          background-color: rgba(255,255,255,0.2);
        }
        .back-button {
          background-color: #616161; // Darker grey
        }
        .back-button:hover {
          background-color: #424242;
        }
        .logout-button {
          background-color: #D32F2F; // Darker red
        }
        .logout-button:hover {
          background-color: #C62828;
        }
        .mark-read-button {
          background-color: #4CAF50; // Green
        }
        .mark-read-button:hover {
          background-color: #43A047;
        }

        .messages-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          background: #333333; // Darker background
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        .message-list {
          border-right: 1px solid #424242;
          max-height: calc(100vh - 200px); 
          overflow-y: auto;
        }
        .message-item {
          padding: 15px;
          border-bottom: 1px solid #424242;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .message-item:hover {
          background-color: #424242;
        }
        .message-item.selected {
          background-color: #555555;
        }
        .message-item.read {
          opacity: 0.7;
        }
        .message-name {
          font-weight: bold;
          color: #f5f5f5;
        }
        .message-item.read .message-name {
          font-weight: normal;
        }
        .message-date {
          font-size: 14px;
          color: #bdbdbd;
          margin-top: 5px;
        }

        .message-detail {
          padding: 20px;
        }
        .detail-header {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #424242;
        }
        .detail-header h2 {
          margin: 0 0 5px 0;
          color: #f5f5f5;
        }
        .detail-field {
          margin-bottom: 15px;
          font-size: 16px;
          color: #e0e0e0;
        }
        .detail-field strong {
          color: #f5f5f5;
        }
        .message-content {
          margin-bottom: 20px;
          padding: 15px;
          background: #424242; // Darker background
          border-radius: 4px;
          color: #e0e0e0;
        }

        .no-message-selected {
          text-align: center;
          padding: 50px;
          color: #bdbdbd;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 10px;
            margin: 20px auto;
          }
          .messages-layout {
            grid-template-columns: 1fr;
          }
          .message-list {
            border-right: none;
            border-bottom: 1px solid #424242;
            max-height: 250px; /* Adjust height for mobile */
          }
        }
      `}</style>
    </div>
  );
} 
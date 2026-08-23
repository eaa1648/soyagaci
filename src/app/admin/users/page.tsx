'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@yilmaz.com', role: 'Platform Admin', family: 'Yılmaz Hanedanı', credits: 100, status: 'Aktif', joined: '15.08.2026' },
    { id: '2', name: 'Ayşe Yılmaz (Demir)', email: 'ayse@yilmaz.com', role: 'Aile Admin', family: 'Yılmaz Hanedanı', credits: 450, status: 'Aktif', joined: '16.08.2026' },
    { id: '3', name: 'Ali Yılmaz', email: 'ali@yilmaz.com', role: 'Aile Admin', family: 'Yılmaz Hanedanı', credits: 300, status: 'Aktif', joined: '18.08.2026' },
    { id: '4', name: 'Zeynep Yılmaz (Kaya)', email: 'zeynep@kaya.com', role: 'Üye', family: 'Yılmaz Hanedanı', credits: 120, status: 'Aktif', joined: '20.08.2026' },
    { id: '5', name: 'Elif Yılmaz', email: 'elif@yilmaz.com', role: 'Üye', family: 'Yılmaz Hanedanı', credits: 100, status: 'Onay Bekliyor', joined: '23.08.2026' },
  ]);

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    alert('Kullanıcı rolü ve Custom Claim yetkileri güncellendi!');
  };

  return (
    <div>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>👥 Kullanıcı & Yetki Yönetimi</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Platformdaki tüm aile fertleri, rolleri, kredi bakiyeleri ve erişim izinleri
          </p>
        </div>

        <Button variant="primary">+ Yeni Aile Üyesi Davet Et</Button>
      </div>

      {/* Users Table */}
      <Card style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Kullanıcı</th>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Bağlı Aile</th>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Rol & Yetki</th>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Kredi</th>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Durum</th>
              <th style={{ padding: '16px 20px', fontWeight: 600, textAlign: 'right' }}>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s ease' }}>
                <td style={{ padding: '16px 20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <strong style={{ color: '#ffffff', display: 'block' }}>{user.name}</strong>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{user.email} • Katılım: {user.joined}</span>
                    </div>
                  </div>
                </td>
                
                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>
                  {user.family}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: user.role === 'Platform Admin' ? 'rgba(99, 102, 241, 0.2)' : user.role === 'Aile Admin' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      color: user.role === 'Platform Admin' ? '#c7d2fe' : user.role === 'Aile Admin' ? '#fbbf24' : 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Platform Admin" style={{ background: '#0f172a' }}>Platform Admin</option>
                    <option value="Aile Admin" style={{ background: '#0f172a' }}>Aile Admin</option>
                    <option value="Üye" style={{ background: '#0f172a' }}>Üye</option>
                  </select>
                </td>

                <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  ✨ {user.credits}
                </td>

                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '9999px',
                    background: user.status === 'Aktif' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: user.status === 'Aktif' ? '#34d399' : '#fbbf24',
                    fontWeight: 700
                  }}>
                    ● {user.status}
                  </span>
                </td>

                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                  <button 
                    onClick={() => alert(`${user.name} kullanıcısının ayarları açıldı.`)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </div>
  );
}

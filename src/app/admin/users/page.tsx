'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Search, UserPlus, X } from 'lucide-react';

export default function UsersAdminPage() {
  const [users, setUsers] = useState([
    { id: '1', name: 'Ahmet Yılmaz', email: 'ahmet@yilmaz.com', role: 'family_admin', roleLabel: 'Aile Yöneticisi', credits: 100, joinDate: '12.01.2026', status: 'Aktif' },
    { id: '2', name: 'Ali Yılmaz', email: 'ali@yilmaz.com', role: 'family_admin', roleLabel: 'Aile Yöneticisi', credits: 50, joinDate: '15.01.2026', status: 'Aktif' },
    { id: '3', name: 'Zeynep Kaya', email: 'zeynep@kaya.com', role: 'user', roleLabel: 'Aile Üyesi', credits: 25, joinDate: '20.02.2026', status: 'Aktif' },
    { id: '4', name: 'Elif Yılmaz', email: 'elif@yilmaz.com', role: 'user', roleLabel: 'Aile Üyesi', credits: 100, joinDate: '10.03.2026', status: 'Aktif' },
  ]);

  const [search, setSearch] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          role: newRole,
          roleLabel: newRole === 'platform_admin' ? 'Platform Yöneticisi' : newRole === 'family_admin' ? 'Aile Yöneticisi' : 'Aile Üyesi'
        };
      }
      return u;
    }));
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;
    const newUser = {
      id: `u-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: 'user',
      roleLabel: 'Aile Üyesi',
      credits: 100,
      joinDate: 'Bugün',
      status: 'Davet Edildi'
    };
    setUsers(prev => [...prev, newUser]);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteName('');
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      
      {/* Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Kullanıcı ve Rol Yönetimi</h2>
          <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Aile ağacına erişim izinlerini ve rolleri düzenleyin</p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0 12px' }}>
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Kullanıcı ara..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.82rem', height: '36px' }}
            />
          </div>

          <button 
            onClick={() => setShowInviteModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 16px', height: '36px', background: 'var(--brand-primary)', border: 'none', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
          >
            <UserPlus size={15} />
            <span>Yeni Üye Davet Et</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <Card style={{ overflow: 'hidden', padding: 0, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Ad Soyad</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>E-posta</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Sistem Rolü</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Bireysel Bakiye</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Kayıt Tarihi</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Durum</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '14px 18px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {u.name}
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                  {u.email}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <select 
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    style={{
                      padding: '4px 10px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--text-primary)',
                      fontSize: '0.78rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="user">Aile Üyesi</option>
                    <option value="family_admin">Aile Yöneticisi</option>
                    <option value="platform_admin">Platform Yöneticisi</option>
                  </select>
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                  {u.credits} Kredi
                </td>
                <td style={{ padding: '14px 18px', color: 'var(--text-muted)' }}>
                  {u.joinDate}
                </td>
                <td style={{ padding: '14px 18px' }}>
                  <span style={{ 
                    fontSize: '0.72rem', 
                    fontWeight: 500, 
                    padding: '2px 8px', 
                    borderRadius: 'var(--radius-full)',
                    background: u.status === 'Aktif' ? 'var(--accent-emerald-bg)' : 'var(--bg-main)',
                    color: u.status === 'Aktif' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Invite Modal */}
      {showInviteModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <Card style={{ maxWidth: '440px', width: '100%', padding: '24px', background: 'var(--bg-surface-solid)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>Yeni Aile Üyesi Davet Et</h3>
              <button onClick={() => setShowInviteModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>Ad Soyad</label>
                <input 
                  type="text" 
                  required
                  placeholder="Örn: Canan Yılmaz" 
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  style={{ width: '100%', height: '38px', padding: '0 12px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>E-posta Adresi</label>
                <input 
                  type="email" 
                  required
                  placeholder="canan@yilmaz.com" 
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  style={{ width: '100%', height: '38px', padding: '0 12px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.84rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowInviteModal(false)} style={{ padding: '8px 14px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontSize: '0.82rem', cursor: 'pointer' }}>
                  İptal
                </button>
                <button type="submit" style={{ padding: '8px 16px', background: 'var(--brand-primary)', border: 'none', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
                  Davet Gönder
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}

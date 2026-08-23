'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

export default function LogsPage() {
  const [filterType, setFilterType] = useState('ALL');

  const LOGS = [
    { id: 1, action: 'AĞAÇ DÜZENLEME', user: 'Ahmet Yılmaz', detail: 'Mustafa Yılmaz profiline 1968 tarihli düğün fotoğrafı eklendi.', time: '4 dakika önce', type: 'INFO' },
    { id: 2, action: 'YAPAY ZEKÂ KULLANIMI', user: 'Zeynep Yılmaz', detail: 'Hafıza Asistanı ile "Bursa öğretmenleri" konulu sohbet gerçekleştirildi (-10 Kredi).', time: '18 dakika önce', type: 'INFO' },
    { id: 3, action: 'ONAYLANDI', user: 'Ali Yılmaz', detail: 'Can Kaya kullanıcısının aileye katılım isteği onaylandı.', time: '1 saat önce', type: 'SUCCESS' },
    { id: 4, action: 'BAŞARISIZ GİRİŞ', user: 'Bilinmeyen (IP: 85.102.44.12)', detail: 'Yanlış şifre denemesi (3. deneme) - Oturum geçici olarak kilitlendi.', time: '2 saat önce', type: 'WARN' },
    { id: 5, action: 'KASA KATKISI', user: 'Ahmet Yılmaz', detail: 'Aile Ortak Kasasına +500 Kredi aktarımı yapıldı.', time: '5 saat önce', type: 'SUCCESS' },
    { id: 6, action: 'YEDEKLEME ALINDI', user: 'Sistem', detail: 'Otomatik şifreli JSON yedeği Storage üzerinde arşivlendi.', time: '12 saat önce', type: 'INFO' },
  ];

  const filteredLogs = filterType === 'ALL' ? LOGS : LOGS.filter(l => l.type === filterType);

  return (
    <div>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Denetim & Güvenlik Günlüğü</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
            Aile ağacında gerçekleştirilen tüm düzenleme ve yetki değişiklikleri
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'INFO', 'SUCCESS', 'WARN'].map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${filterType === f ? 'var(--text-primary)' : 'var(--border-subtle)'}`,
                background: filterType === f ? 'var(--text-primary)' : 'var(--bg-surface)',
                color: filterType === f ? 'var(--bg-main)' : 'var(--text-secondary)',
                fontWeight: filterType === f ? 600 : 500,
                fontSize: '0.76rem',
                cursor: 'pointer'
              }}
            >
              {f === 'ALL' ? 'Tümü' : f === 'WARN' ? 'Güvenlik Uyarıları' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <Card style={{ overflow: 'hidden', padding: 0, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-main)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Zaman</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>İşlem</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Yetkili / Kullanıcı</th>
              <th style={{ padding: '14px 18px', fontWeight: 500 }}>Açıklama</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr 
                key={log.id} 
                style={{ 
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: log.type === 'WARN' ? 'rgba(239, 68, 68, 0.04)' : 'transparent'
                }}
              >
                <td style={{ padding: '14px 18px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>
                  {log.time}
                </td>
                
                <td style={{ padding: '14px 18px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-xs)',
                    background: log.type === 'SUCCESS' ? 'var(--accent-emerald-bg)' : log.type === 'WARN' ? 'var(--accent-rose-bg)' : 'var(--bg-surface-raised)',
                    color: log.type === 'SUCCESS' ? 'var(--accent-emerald)' : log.type === 'WARN' ? 'var(--accent-rose)' : 'var(--text-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    {log.action}
                  </span>
                </td>

                <td style={{ padding: '14px 18px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {log.user}
                </td>

                <td style={{ padding: '14px 18px', color: 'var(--text-secondary)' }}>
                  {log.detail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

    </div>
  );
}

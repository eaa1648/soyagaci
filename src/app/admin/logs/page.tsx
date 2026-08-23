'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

export default function LogsPage() {
  const [filterType, setFilterType] = useState('ALL');

  const LOGS = [
    { id: 1, action: 'AĞAÇ DÜZENLEME', user: 'Ahmet Yılmaz', detail: 'Mustafa Yılmaz profiline 1968 tarihli düğün fotoğrafı eklendi.', time: '4 dakika önce', type: 'INFO' },
    { id: 2, action: 'YAPAY ZEKÂ KULLANIMI', user: 'Zeynep Yılmaz', detail: 'Hafıza Asistanı ile "Bursa öğretmenleri" konulu sohbet gerçekleştirildi (-10 Kredi).', time: '18 dakika önce', type: 'INFO' },
    { id: 3, action: 'ONAYLANDI', user: 'Ali Yılmaz (Admin)', detail: 'Can Kaya kullanıcısının aileye katılım isteği onaylandı.', time: '1 saat önce', type: 'SUCCESS' },
    { id: 4, action: 'BAŞARISIZ GİRİŞ', user: 'Bilinmeyen (IP: 85.102.44.12)', detail: 'Yanlış şifre denemesi (3. deneme) - Oturum kilitlendi.', time: '2 saat önce', type: 'WARN' },
    { id: 5, action: 'KASA KATKISI', user: 'Ahmet Yılmaz', detail: 'Aile Kasasına +500 Kredi aktarımı yapıldı.', time: '5 saat önce', type: 'SUCCESS' },
    { id: 6, action: 'YEDEKLEME ALINDI', user: 'Sistem (Cron)', detail: 'Otomatik şifreli JSON yedeği Cloud Storage üzerinde arşivlendi.', time: '12 saat önce', type: 'INFO' },
  ];

  const filteredLogs = filterType === 'ALL' ? LOGS : LOGS.filter(l => l.type === filterType);

  return (
    <div>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>📜 Sistem & Denetim Logları (Audit Trail)</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Aile ağacında kimin ne zaman hangi değişikliği yaptığını gösteren güvenli denetim kayıtları
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '9999px', border: '1px solid var(--border-color)' }}>
          {['ALL', 'INFO', 'SUCCESS', 'WARN'].map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: 'none',
                background: filterType === f ? 'var(--brand-primary)' : 'transparent',
                color: filterType === f ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {f === 'ALL' ? 'Tümü (6)' : f === 'WARN' ? 'Güvenlik Uyarıları' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <Card style={{ overflow: 'hidden', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.04)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Zaman</th>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>İşlem Türü</th>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Yetkili Kullanıcı</th>
              <th style={{ padding: '16px 20px', fontWeight: 600 }}>Açıklama & Detay</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr 
                key={log.id} 
                style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: log.type === 'WARN' ? 'rgba(239, 68, 68, 0.06)' : 'transparent'
                }}
              >
                <td style={{ padding: '16px 20px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {log.time}
                </td>
                
                <td style={{ padding: '16px 20px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: log.type === 'SUCCESS' ? 'rgba(16, 185, 129, 0.15)' : log.type === 'WARN' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                    color: log.type === 'SUCCESS' ? '#34d399' : log.type === 'WARN' ? '#f87171' : '#c7d2fe',
                    border: `1px solid ${log.type === 'SUCCESS' ? '#10b98140' : log.type === 'WARN' ? '#ef444440' : '#6366f140'}`
                  }}>
                    {log.action}
                  </span>
                </td>

                <td style={{ padding: '16px 20px', fontWeight: 600, color: '#ffffff' }}>
                  {log.user}
                </td>

                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>
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

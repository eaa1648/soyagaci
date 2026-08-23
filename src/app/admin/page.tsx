'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Users, 
  UserCheck, 
  Image as ImageIcon, 
  Coins, 
  Sparkles, 
  CheckCircle2,
  Activity
} from 'lucide-react';

export default function AdminDashboardPage() {
  const STAT_CARDS = [
    { label: 'Toplam Fert', value: '48', desc: '5 Kuşak', icon: Users },
    { label: 'Aktif Kullanıcı', value: '12', desc: 'Bu hafta 4 yeni giriş', icon: UserCheck },
    { label: 'Arşiv Belgesi', value: '342', desc: 'Fotoğraf, ses, tapu', icon: ImageIcon },
    { label: 'Kasa Bakiyesi', value: '2.550', desc: 'Ortak Fon Kredisi', icon: Coins },
    { label: 'AI Sorgulama', value: '184', desc: 'Bu ay yapılan tarama', icon: Sparkles },
    { label: 'Bekleyen Onay', value: '2', desc: 'İnceleme bekliyor', icon: CheckCircle2 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Stat Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {STAT_CARDS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} style={{ padding: '20px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>{stat.label}</span>
                <Icon size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.1, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{stat.desc}</span>
            </Card>
          );
        })}
      </div>

      {/* Activity Logs & Health Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
        
        {/* System Health */}
        <Card style={{ padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Haftalık Arşiv Aktivitesi</h3>
            <Activity size={16} style={{ color: 'var(--text-muted)' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
            {[40, 65, 30, 80, 95, 70, 85].map((val, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '100%', height: `${val}%`, background: 'var(--brand-surface)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: 'var(--radius-xs)' }} />
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][idx]}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span>Toplam 24 Yeni Belge Eklendi</span>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>+18% Artış</span>
          </div>
        </Card>

        {/* Security & Access */}
        <Card style={{ padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Güvenlik & Yedekleme</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Tüm aile soy kütüğü ve biyografiler otomatik günlük şifreli snapshot ile korunmaktadır.
            </p>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Son Başarılı Yedek: <strong>Bugün 04:00 (Otomatik)</strong>
          </div>
        </Card>

      </div>

    </div>
  );
}

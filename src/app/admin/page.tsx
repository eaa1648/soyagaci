import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>Yönetim Kokpiti</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Platform geneli ve Yılmaz Ailesi veritabanının anlık operasyonel durumu
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link 
            href="/admin/approvals" 
            style={{ 
              padding: '10px 20px', 
              borderRadius: '9999px', 
              background: 'linear-gradient(135deg, #f59e0b, #d97706)', 
              color: '#ffffff', 
              textDecoration: 'none', 
              fontWeight: 700,
              fontSize: '0.88rem',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.35)'
            }}
          >
            ⚡ 2 Onay Bekliyor
          </Link>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>TOPLAM AİLE</span>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>+12% bu ay</span>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-display)' }}>1,245</div>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>48 tanesi aktif yönetimde</span>
        </Card>

        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>KAYITLI KİŞİ (NODES)</span>
            <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>+184 yeni</span>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>14,890</div>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>%94 doğruluk oranı</span>
        </Card>

        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>MEDYA ARŞİVİ</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>42.8 GB</span>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fbbf24', fontFamily: 'var(--font-display)' }}>8,420</div>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Fotoğraf, Belge ve Ses</span>
        </Card>

        <Card style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 600 }}>YAPAY ZEKÂ İŞLEMİ</span>
            <span style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 700 }}>Gemini 2.5</span>
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-display)' }}>3,650</div>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Sorgu & Transkripsiyon</span>
        </Card>
      </div>

      {/* Main Grid: Activity Graph & System Status */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px', marginBottom: '32px' }}>
        
        {/* Activity Visualizer Card */}
        <Card style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#ffffff' }}>📈 Haftalık Aile Aktivitesi & Katılım Grafiği</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Son 7 Gün</span>
          </div>
          
          {/* Simulated Bars */}
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '20px 0 0 0', borderBottom: '1px solid var(--border-color)' }}>
            {[
              { day: 'Pzt', val: 40 },
              { day: 'Sal', val: 65 },
              { day: 'Çar', val: 45 },
              { day: 'Per', val: 80 },
              { day: 'Cum', val: 95 },
              { day: 'Cmt', val: 120 },
              { day: 'Paz', val: 140 }
            ].map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                <div 
                  style={{ 
                    width: '100%', 
                    height: `${(d.val / 140) * 100}%`, 
                    background: i === 6 ? 'linear-gradient(180deg, #6366f1, #4f46e5)' : 'rgba(99, 102, 241, 0.25)', 
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.3s ease',
                    boxShadow: i === 6 ? '0 0 15px rgba(99, 102, 241, 0.5)' : 'none'
                  }} 
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Health Status */}
        <Card style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.15rem', color: '#ffffff' }}>🛡️ Sistem Sağlığı & Güvenlik</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Firebase Authentication</span>
                <strong style={{ color: '#34d399' }}>● Çalışıyor</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Firestore Veritabanı</span>
                <strong style={{ color: '#34d399' }}>● Güvenli</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Gemini AI API Ağ Geçidi</span>
                <strong style={{ color: '#34d399' }}>● 120ms Yanıt</strong>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Otomatik Günlük Yedekleme</span>
                <strong style={{ color: '#34d399' }}>● 04:00 Başarılı</strong>
              </li>
            </ul>
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '10px' }}>
            <Link 
              href="/admin/merge-tool" 
              style={{ flex: 1, padding: '10px', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', color: '#c7d2fe', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700 }}
            >
              🔀 Çift Kayıt Kontrolü
            </Link>
          </div>
        </Card>

      </div>

    </div>
  );
}

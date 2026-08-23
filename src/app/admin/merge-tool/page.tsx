'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { GitMerge, Sparkles, Check, AlertTriangle, ArrowRightLeft } from 'lucide-react';

export default function MergeToolPage() {
  const [merged, setMerged] = useState(false);

  return (
    <div>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Sparkles size={14} style={{ color: 'var(--brand-primary)' }} />
          <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>YAPAY ZEKÂ ANALİZİ</span>
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Çift Kayıt ve Benzerlik Birleştirme</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
          Yapay zekâ algoritmaları tarafından tespit edilen ve aynı kişi olma olasılığı yüksek (%96.4) kayıtlar
        </p>
      </div>

      {merged ? (
        <Card style={{ padding: '48px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-lg)' }}>
          <Check size={36} style={{ color: 'var(--accent-emerald)', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 6px 0' }}>Kayıtlar Başarıyla Birleştirildi</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: '0 0 20px 0' }}>Mustafa Yılmaz şahıs dosyası tüm fotoğraflar ve akrabalık bağlarıyla tek çatı altında toplandı.</p>
          <button 
            onClick={() => setMerged(false)}
            style={{ padding: '8px 16px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.82rem', cursor: 'pointer' }}
          >
            Başka Kayıt İncele
          </button>
        </Card>
      ) : (
        <Card style={{ padding: '28px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} style={{ color: 'var(--brand-primary)' }} />
              <div>
                <strong style={{ fontSize: '0.96rem', color: 'var(--text-primary)' }}>Olası Çift Kayıt (Benzerlik: %96.4)</strong>
                <span style={{ display: 'block', fontSize: '0.76rem', color: 'var(--text-muted)' }}>İki farklı aile üyesi tarafından açılmış benzer doğum ve biyografi verileri</span>
              </div>
            </div>
            
            <span style={{ fontSize: '0.74rem', color: 'var(--brand-primary)', background: 'var(--brand-surface)', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
              AI Önerisi: Birleştir
            </span>
          </div>

          {/* Side by Side Diff */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
            
            {/* Kayıt A */}
            <div style={{ padding: '18px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 600, marginBottom: '6px' }}>KAYIT A (Ana Düğüm #1)</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>Mustafa Yılmaz</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <li><strong>Doğum:</strong> 15.04.1940 • Bursa</li>
                <li><strong>Ölüm:</strong> 22.08.2012 • İstanbul</li>
                <li><strong>Meslek:</strong> Başöğretmen</li>
                <li><strong>Ekleyen:</strong> Ahmet Yılmaz</li>
                <li><strong>Medya:</strong> 34 Fotoğraf & Belge</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <ArrowRightLeft size={18} />
            </div>

            {/* Kayıt B */}
            <div style={{ padding: '18px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>KAYIT B (Aday Düğüm #14)</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 8px 0', color: 'var(--text-primary)' }}>M. Yılmaz (Öğretmen)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <li><strong>Doğum:</strong> 1940 (Tahmini) • Bursa</li>
                <li><strong>Ölüm:</strong> 2012 • Kadıköy</li>
                <li><strong>Meslek:</strong> Öğretmen</li>
                <li><strong>Ekleyen:</strong> Ayşe Yılmaz</li>
                <li><strong>Medya:</strong> 6 Belge</li>
              </ul>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <button 
              onClick={() => alert('Kayıtlar ayrı şahıslar olarak işaretlendi.')}
              style={{ padding: '8px 14px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontSize: '0.82rem', cursor: 'pointer' }}
            >
              Farklı Kişiler (Yoksay)
            </button>
            <button 
              onClick={() => setMerged(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'var(--brand-primary)', border: 'none', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
            >
              <GitMerge size={14} />
              <span>Kayıtları Birleştir</span>
            </button>
          </div>

        </Card>
      )}

    </div>
  );
}

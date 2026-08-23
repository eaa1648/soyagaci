'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MergeToolPage() {
  const [merged, setMerged] = useState(false);

  return (
    <div>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: '#fff' }}>GEMINI AI ANALİZİ</span>
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>🔀 Aile Veri Kalitesi & Çift Kayıt Birleştirme</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Yapay zekâ algoritmaları tarafından taranan ve aynı kişi olma olasılığı yüksek (%96) tespit edilen çift kayıtlar
        </p>
      </div>

      {merged ? (
        <Card style={{ padding: '48px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>✨</span>
          <h3 style={{ color: '#34d399', margin: '0 0 8px 0' }}>Kayıtlar Başarıyla Tek Bir Düğümde Birleştirildi!</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>Mustafa Yılmaz profili tüm fotoğraflar ve akrabalık bağlarıyla tek çatı altında toplandı.</p>
          <Button variant="outline" onClick={() => setMerged(false)}>Geri Al veya Başka Kayıt İncele</Button>
        </Card>
      ) : (
        <Card style={{ padding: '32px', border: '1px solid rgba(99, 102, 241, 0.4)', background: 'rgba(15, 23, 42, 0.85)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '1.5rem' }}>⚠️</span>
              <div>
                <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>Olası Çift Kayıt Şüphesi (Benzerlik Oranı: %96.4)</strong>
                <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>İki farklı aile üyesi tarafından eklenmiş benzer biyografi ve doğum tarihleri</span>
              </div>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 12px', borderRadius: '9999px', fontWeight: 700 }}>
              AI Önerisi: Birleştir
            </span>
          </div>

          {/* Side by Side Diff Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: '20px', alignItems: 'center', marginBottom: '28px' }}>
            
            {/* Kayıt 1 */}
            <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--brand-text)', fontWeight: 700, marginBottom: '8px' }}>DÜĞÜM A (Ana Kayıt #1)</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#ffffff' }}>Mustafa Yılmaz</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <li><strong>Doğum:</strong> 15.04.1940 • Bursa</li>
                <li><strong>Ölüm:</strong> 22.08.2012 • İstanbul</li>
                <li><strong>Meslek:</strong> Başöğretmen</li>
                <li><strong>Ekleyen Üye:</strong> Ahmet Yılmaz</li>
                <li><strong>Medya:</strong> 34 Fotoğraf</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center', color: 'var(--brand-primary)', fontSize: '1.5rem', fontWeight: 800 }}>
              ⇄
            </div>

            {/* Kayıt 2 */}
            <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 700, marginBottom: '8px' }}>DÜĞÜM B (Aday Kayıt #14)</div>
              <h3 style={{ margin: '0 0 10px 0', color: '#ffffff' }}>M. Yılmaz (Öğretmen)</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                <li><strong>Doğum:</strong> 1940 (Tahmini) • Bursa</li>
                <li><strong>Ölüm:</strong> 2012 • Kadıköy</li>
                <li><strong>Meslek:</strong> Öğretmen</li>
                <li><strong>Ekleyen Üye:</strong> Ayşe Yılmaz</li>
                <li><strong>Medya:</strong> 6 Belge</li>
              </ul>
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <Button variant="outline" onClick={() => alert('Kayıtlar ayrı kişiler olarak işaretlendi ve yok sayıldı.')}>
              Farklı Kişiler (Yoksay)
            </Button>
            <Button variant="gold" onClick={() => setMerged(true)}>
              ✨ Kayıtları Akıllı Birleştir (Merge)
            </Button>
          </div>

        </Card>
      )}

    </div>
  );
}

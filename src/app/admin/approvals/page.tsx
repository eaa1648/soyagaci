'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminApprovalsPage() {
  const [approvals, setApprovals] = useState([
    {
      id: '1',
      requestType: 'AİLEYE KATILIM İSTEĞİ',
      user: 'Can Kaya',
      email: 'can.kaya@gmail.com',
      requestedAt: '15 Dakika önce',
      details: 'Zeynep Yılmaz (Kaya) tarafından gönderilen "YILMAZ-2026-DAVET" kodu ile aileye katılmak istiyor. (Akrabalık: Zeynep Hanım\'ın Oğlu / Kuzen)',
      tagColor: '#6366f1'
    },
    {
      id: '2',
      requestType: 'KRİTİK BİLGİ DÜZENLEME ONAYI',
      user: 'Ali Yılmaz',
      email: 'ali@yilmaz.com',
      requestedAt: '3 Saat önce',
      details: 'Büyük Dede "Mustafa Yılmaz" profilindeki askerlik görev yerini "Erzurum Aşkale (1962)" olarak güncelledi ve 1 adet terhis belgesi ekledi.',
      tagColor: '#f59e0b'
    },
    {
      id: '3',
      requestType: 'YENİ MEDYA ARŞİVLEME',
      user: 'Ayşe Yılmaz (Demir)',
      email: 'ayse@yilmaz.com',
      requestedAt: '1 Gün önce',
      details: '"1968 Kapalıçarşı Düğün Albümü - 12 Adet Fotoğraf" toplu albüm yükleme onayı bekliyor.',
      tagColor: '#10b981'
    }
  ]);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    alert(action === 'approve' ? 'Talep onaylandı ve soy ağacına işlendi!' : 'Talep reddedildi.');
  };

  return (
    <div>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>✅ Onay & Moderasyon Merkezi</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Aileye yeni katılmak isteyen akrabalar, düğüm değişiklikleri ve toplu fotoğraf yükleme onayları
        </p>
      </div>

      {approvals.length === 0 ? (
        <Card style={{ padding: '48px', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🎉</span>
          <h3 style={{ color: '#ffffff', margin: '0 0 6px 0' }}>Bekleyen Onay Talebi Yok</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Tüm aile istekleri incelendi ve güncellendi.</p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {approvals.map(app => (
            <Card key={app.id} style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    background: `${app.tagColor}20`,
                    color: app.tagColor,
                    border: `1px solid ${app.tagColor}40`
                  }}>
                    {app.requestType}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>🕒 {app.requestedAt}</span>
                </div>

                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: '#ffffff' }}>
                  {app.user} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>({app.email})</span>
                </h3>
                
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                  {app.details}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Button 
                  variant="outline" 
                  onClick={() => handleAction(app.id, 'reject')}
                  style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171' }}
                >
                  Reddet
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => handleAction(app.id, 'approve')}
                >
                  ✓ Onayla ve İşle
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
}

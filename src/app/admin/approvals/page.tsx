'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

export default function ApprovalsPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      type: 'YENİ_FERT_EKLEME',
      applicant: 'Ahmet Yılmaz',
      date: '2 saat önce',
      title: 'Can Kaya (3. Kuşak) Ağaca Eklensin',
      details: 'Doğum: 2008 / İzmir. Anne: Zeynep Yılmaz. Ağaçta 3. Kuşak olarak konumlandırılacak.',
      status: 'PENDING'
    },
    {
      id: 2,
      type: 'TARİHİ_BELGE',
      applicant: 'Zeynep Yılmaz',
      date: '5 saat önce',
      title: '1976 Maarif Müdürlüğü Beratı Arşive Eklensin',
      details: 'Mustafa Yılmaz şahıs dosyasına eklenecek resmi öğretmenlik teşekkür beratı taraması.',
      status: 'PENDING'
    }
  ]);

  const handleAction = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>İnceleme & Onay Merkezi</h2>
        <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
          Aile fertleri tarafından yüklenen ve soyağacına işlenmek üzere yönetici onayı bekleyen kayıtlar
        </p>
      </div>

      {items.length === 0 ? (
        <Card style={{ padding: '48px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
          <Check size={32} style={{ color: 'var(--accent-emerald)', margin: '0 auto 12px auto' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>Bekleyen Onay Yok</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0 }}>Tüm soy ağacı ekleme ve belge talepleri incelendi ve güncellendi.</p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map(item => (
            <Card key={item.id} style={{ padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-xs)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
                    {item.type === 'YENİ_FERT_EKLEME' ? 'Yeni Fert Kaydı' : 'Tarihi Belge'}
                  </span>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{item.date}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleAction(item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    <X size={14} />
                    <span>Reddet</span>
                  </button>

                  <button 
                    onClick={() => handleAction(item.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 14px', background: 'var(--brand-primary)', border: 'none', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    <Check size={14} />
                    <span>Onayla & Ağaca İşle</span>
                  </button>
                </div>
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>{item.title}</h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 12px 0', lineHeight: 1.5 }}>{item.details}</p>

              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Talep Eden: <strong>{item.applicant}</strong>
              </div>

            </Card>
          ))}
        </div>
      )}

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Landmark, 
  Coins, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Check, 
  ArrowLeft,
  ShieldCheck
} from 'lucide-react';

export default function FamilyVaultPage() {
  const [vaultBalance, setVaultBalance] = useState(2550);
  const [userBalance, setUserBalance] = useState(100);
  const [transferAmount, setTransferAmount] = useState(50);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const TRANSACTIONS = [
    { id: 1, title: 'Ahmet Yılmaz Bireysel Katkı', type: 'IN', amount: 500, date: '23 Ağustos 2026', user: 'Ahmet Yılmaz', category: 'Katkı' },
    { id: 2, title: 'AI Fotoğraf Restorasyonu & İyileştirme', type: 'OUT', amount: 150, date: '22 Ağustos 2026', user: 'Zeynep Yılmaz', category: 'Yapay Zekâ' },
    { id: 3, title: 'Davet Katılım Bonusu (Elif Yılmaz)', type: 'IN', amount: 200, date: '20 Ağustos 2026', user: 'Sistem', category: 'Bonus' },
    { id: 4, title: 'Osmanlıca Tapu Metin Çevirisi', type: 'OUT', amount: 50, date: '18 Ağustos 2026', user: 'Ali Yılmaz', category: 'Arşiv Çeviri' },
    { id: 5, title: 'Aile Kasası Açılış Tahsisi', type: 'IN', amount: 2000, date: '15 Ağustos 2026', user: 'Platform', category: 'Kurulum' },
  ];

  const handleTransfer = () => {
    if (userBalance < transferAmount) {
      alert('Yetersiz bireysel bakiye!');
      return;
    }
    setUserBalance(prev => prev - transferAmount);
    setVaultBalance(prev => prev + transferAmount);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
            <ArrowLeft size={14} />
            <span>Ana Sayfa</span>
          </Link>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 500 }}>Ortak Aile Kasası</span>
        </div>

        {/* User Balance Pill */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', padding: '6px 14px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Bireysel Bakiye:</span>
          <strong style={{ color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>{userBalance} Kredi</strong>
        </div>
      </div>

      {showSuccessToast && (
        <div style={{ padding: '12px 18px', background: 'var(--accent-emerald-bg)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-md)', color: 'var(--accent-emerald)', marginBottom: '24px', fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={16} />
          <span>{transferAmount} kredi başarıyla Aile Ortak Kasasına aktarıldı.</span>
        </div>
      )}

      {/* Top Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', marginBottom: '32px' }}>
        
        {/* Vault Balance Card */}
        <Card style={{ padding: '32px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>TOPLAM FON</span>
              <Landmark size={20} style={{ color: 'var(--brand-primary)' }} />
            </div>
            
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1, marginBottom: '8px', fontVariantNumeric: 'tabular-nums' }}>
              {vaultBalance.toLocaleString('tr-TR')} <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontWeight: 400 }}>Kredi</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Tüm aile bireylerinin ortak fotoğraf restorasyonu, belge çevirisi ve yapay zekâ işlemleri için kullanılır.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)', marginTop: '24px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={14} style={{ color: 'var(--accent-emerald)' }} />
            <span>Şifreli Fon • Yılmaz Ailesi İdare Heyeti Denetiminde</span>
          </div>
        </Card>

        {/* Transfer Action Card */}
        <Card style={{ padding: '28px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Kasaya Katkıda Bulun</h3>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Bireysel bakiyenizden ortak kasaya kredi aktarın</p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {[25, 50, 100].map(amt => (
              <button
                key={amt}
                onClick={() => setTransferAmount(amt)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${transferAmount === amt ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                  background: transferAmount === amt ? 'var(--brand-surface)' : 'var(--bg-main)',
                  color: transferAmount === amt ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                +{amt}
              </button>
            ))}
          </div>

          <button
            onClick={handleTransfer}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--brand-primary)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.84rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Coins size={15} />
            <span>{transferAmount} Kredi Aktar</span>
          </button>
        </Card>

      </div>

      {/* Transactions Ledger */}
      <Card style={{ padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Hesap Hareketleri</h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Son 5 İşlem</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {TRANSACTIONS.map(tx => (
            <div 
              key={tx.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-main)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.84rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: 'var(--radius-xs)', 
                  background: tx.type === 'IN' ? 'var(--accent-emerald-bg)' : 'var(--bg-surface-raised)',
                  color: tx.type === 'IN' ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {tx.type === 'IN' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>

                <div>
                  <strong style={{ display: 'block', color: 'var(--text-primary)', fontSize: '0.86rem' }}>{tx.title}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{tx.user} • {tx.date}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <strong style={{ 
                  color: tx.type === 'IN' ? 'var(--accent-emerald)' : 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontVariantNumeric: 'tabular-nums'
                }}>
                  {tx.type === 'IN' ? `+${tx.amount}` : `-${tx.amount}`} Kredi
                </strong>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{tx.category}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}

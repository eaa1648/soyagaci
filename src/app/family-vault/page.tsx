'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FamilyVaultPage() {
  const [vaultBalance, setVaultBalance] = useState(2550);
  const [userBalance, setUserBalance] = useState(100);
  const [transferAmount, setTransferAmount] = useState(50);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const TRANSACTIONS = [
    { id: 1, title: 'Ahmet Yılmaz Bireysel Katkı', type: 'IN', amount: 500, date: '23 Ağustos 2026', user: 'Ahmet Yılmaz', category: 'Katkı' },
    { id: 2, title: 'AI Toplu Fotoğraf Restorasyonu & Renklendirme', type: 'OUT', amount: 150, date: '22 Ağustos 2026', user: 'Zeynep Yılmaz', category: 'Yapay Zekâ' },
    { id: 3, title: 'Davet Bonusu (Elif Yılmaz Kaydoldu)', type: 'IN', amount: 200, date: '20 Ağustos 2026', user: 'Sistem', category: 'Bonus' },
    { id: 4, title: 'Osmanlıca Tapu Transkripsiyonu', type: 'OUT', amount: 50, date: '18 Ağustos 2026', user: 'Ali Yılmaz', category: 'Arşiv Çeviri' },
    { id: 5, title: 'Aile Kasası Hoş Geldin Kurulum Hibesi', type: 'IN', amount: 2000, date: '15 Ağustos 2026', user: 'Platform', category: 'Kurulum' },
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
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>← Ana Sayfa</Link>
            <span style={{ color: 'var(--border-color)' }}>/</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontWeight: 600 }}>Kasa & Finans</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>🏛️ Yılmaz Ailesi Ortak Kasası</h1>
        </div>

        {/* User personal credit pill */}
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '10px 20px', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bireysel Bakiyeniz:</span>
          <strong style={{ color: 'var(--accent-gold)', fontSize: '1.1rem' }}>✨ {userBalance} Kredi</strong>
        </div>
      </div>

      {showSuccessToast && (
        <div style={{ padding: '14px 20px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', borderRadius: '12px', color: '#34d399', marginBottom: '24px', fontWeight: 600, animation: 'fadeIn 0.2s' }}>
          ✅ {transferAmount} kredi başarıyla Aile Kasasına aktarıldı!
        </div>
      )}

      {/* Top Cards: Metallic Smart Card & Contribution Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '28px', marginBottom: '40px' }}>
        
        {/* Glowing Metallic Vault Card */}
        <Card style={{ 
          padding: '32px', 
          background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.95) 0%, rgba(15, 23, 42, 0.98) 50%, rgba(49, 46, 129, 0.9) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.4)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 35px rgba(99, 102, 241, 0.25)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '260px'
        }}>
          {/* Card Hologram Chip */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #fbbf24, #d97706)', border: '1px solid rgba(255, 255, 255, 0.4)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }} />
            <span style={{ fontSize: '0.78rem', color: '#c7d2fe', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>YILMAZ HANEDANI KASASI</span>
          </div>

          <div>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '4px' }}>Toplam Ortak Kredi Havuzu</span>
            <div style={{ fontSize: '3.4rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {vaultBalance.toLocaleString('tr-TR')} <span style={{ fontSize: '1.4rem', color: 'var(--accent-gold)' }}>KREDİ</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', fontSize: '0.82rem', color: '#94a3b8' }}>
            <span>Yetkili Yöneticiler: <strong>Ahmet Y. & Ali Y.</strong></span>
            <span>Durum: <strong style={{ color: '#34d399' }}>● Aktif & Güvenli</strong></span>
          </div>
        </Card>

        {/* Contribution Action Widget */}
        <Card style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#ffffff' }}>Kasaya Kredi Aktar</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 20px 0', lineHeight: 1.5 }}>
              Yapay zekâ ile eski fotoğrafların renklendirilmesi veya Osmanlıca belgelerin tercümesi için kasaya destek olun.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {[25, 50, 100].map(val => (
                <button
                  key={val}
                  onClick={() => setTransferAmount(val)}
                  style={{
                    flex: 1,
                    padding: '10px 0',
                    borderRadius: '10px',
                    background: transferAmount === val ? 'var(--brand-primary)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff',
                    border: '1px solid var(--border-color)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  +{val} Kredi
                </button>
              ))}
            </div>
          </div>

          <Button variant="gold" fullWidth onClick={handleTransfer}>
            Kasaya {transferAmount} Kredi Gönder ✨
          </Button>
        </Card>

      </div>

      {/* Progress towards AI Family Goal */}
      <Card style={{ padding: '24px', marginBottom: '40px', background: 'rgba(15, 23, 42, 0.7)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <strong style={{ fontSize: '1rem', color: '#ffffff' }}>🎯 Aile Hedefi: 342 Eski Fotoğrafın Yapay Zekâ ile Renklendirilmesi</strong>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Toplanan kredilerle tüm siyah-beyaz aile albümü 4K çözünürlükte restore edilecek.</span>
          </div>
          <strong style={{ color: 'var(--accent-gold)', fontSize: '1.1rem' }}>%74 Tamamlandı</strong>
        </div>
        
        {/* Progress bar */}
        <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
          <div style={{ width: '74%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #f59e0b)', borderRadius: '9999px' }} />
        </div>
      </Card>

      {/* Transactions History Table */}
      <Card style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#ffffff' }}>📋 Kasa Hesap Defteri ve Harcama Hareketleri</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Son 30 Günlük Kayıtlar</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {TRANSACTIONS.map((tx) => (
            <div 
              key={tx.id} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: tx.type === 'IN' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: tx.type === 'IN' ? '#34d399' : '#f87171',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.1rem'
                }}>
                  {tx.type === 'IN' ? '↓' : '↑'}
                </div>
                
                <div>
                  <strong style={{ fontSize: '0.94rem', color: '#ffffff', display: 'block' }}>{tx.title}</strong>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{tx.date} • {tx.user}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 800,
                  color: tx.type === 'IN' ? '#34d399' : '#f87171' 
                }}>
                  {tx.type === 'IN' ? `+${tx.amount}` : `-${tx.amount}`} Kredi
                </span>
                <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{tx.category}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

    </div>
  );
}

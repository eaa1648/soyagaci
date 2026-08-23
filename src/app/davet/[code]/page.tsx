import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '540px', 
        padding: '40px', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(245, 158, 11, 0.4)',
        boxShadow: 'var(--shadow-lg), 0 0 45px rgba(245, 158, 11, 0.2)'
      }}>
        
        <div style={{ 
          width: '76px', 
          height: '76px', 
          borderRadius: '50%', 
          background: 'rgba(245, 158, 11, 0.15)', 
          color: 'var(--accent-gold)', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.4rem',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 0 25px rgba(245, 158, 11, 0.3)'
        }}>
          💌
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>ÖZEL AİLE DAVETİ</span>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', margin: '6px 0' }}>
            Yılmaz Ailesi Hafızasına Davet Edildiniz
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Akrabanız tarafından oluşturulan <strong>&quot;{resolvedParams.code}&quot;</strong> kodlu güvenli daveti kabul ederek soy ağacına katılabilirsiniz.
          </p>
        </div>
        
        <div style={{ padding: '16px', backgroundColor: 'rgba(99, 102, 241, 0.12)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#c7d2fe', margin: 0 }}>
            🎁 Katıldığınızda hem size +100 Kredi tanımlanacak, hem de sizi davet eden akrabanıza +20 Kredi hediye edilecektir!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '14px', marginTop: '8px' }}>
          <Link href={`/register?invite=${resolvedParams.code}`} style={{ flex: 1, textDecoration: 'none' }}>
            <Button fullWidth variant="gold">Daveti Kabul Et & Kaydol</Button>
          </Link>
          <Link href="/" style={{ flex: 1, textDecoration: 'none' }}>
            <Button fullWidth variant="outline">Siteyi İncele</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

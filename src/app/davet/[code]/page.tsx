import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = await params;
  
  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '480px', 
        padding: '36px', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-lg)'
      }}>
        
        <div style={{ 
          width: '56px', 
          height: '56px', 
          borderRadius: 'var(--radius-md)', 
          background: 'var(--brand-surface)', 
          color: 'var(--brand-primary)', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Mail size={28} />
        </div>

        <div>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--brand-primary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AİLE DAVETİ</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-primary)', margin: '6px 0' }}>
            Yılmaz Ailesi Arşivine Davet Edildiniz
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Akrabanız tarafından oluşturulan <strong>&quot;{resolvedParams.code}&quot;</strong> kodlu davet ile soy ağacına katılabilirsiniz.
          </p>
        </div>
        
        <div style={{ padding: '12px 16px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <ShieldCheck size={16} style={{ color: 'var(--accent-emerald)' }} />
          <span>Şifreli & Yetkili Aile Kütük Erişimi</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
          <Link href={`/register?invite=${resolvedParams.code}`} style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '6px', 
            padding: '10px 16px', 
            background: 'var(--brand-primary)', 
            color: '#FFFFFF', 
            borderRadius: 'var(--radius-sm)', 
            textDecoration: 'none', 
            fontSize: '0.84rem', 
            fontWeight: 600 
          }}>
            <span>Daveti Kabul Et</span>
            <ArrowRight size={14} />
          </Link>

          <Link href="/" style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '10px 16px', 
            background: 'var(--bg-surface-raised)', 
            color: 'var(--text-secondary)', 
            border: '1px solid var(--border-subtle)', 
            borderRadius: 'var(--radius-sm)', 
            textDecoration: 'none', 
            fontSize: '0.84rem' 
          }}>
            İncele
          </Link>
        </div>
      </Card>
    </div>
  );
}

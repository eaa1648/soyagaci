import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { MailCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - var(--header-height))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '440px', 
        padding: '36px', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '18px',
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
          <MailCheck size={28} />
        </div>

        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
            E-postanızı Doğrulayın
          </h1>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Hesabınızın güvenliğini sağlamak için e-posta adresinize bir doğrulama bağlantısı gönderdik.
          </p>
        </div>

        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Link href="/login" style={{ 
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
            <span>Giriş Ekranına Dön</span>
            <ArrowRight size={14} />
          </Link>
          
          <Link href="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '6px', 
            padding: '8px 16px', 
            background: 'transparent', 
            color: 'var(--text-muted)', 
            textDecoration: 'none', 
            fontSize: '0.8rem' 
          }}>
            <ArrowLeft size={13} />
            <span>Ana Sayfa</span>
          </Link>
        </div>
      </Card>
    </div>
  );
}

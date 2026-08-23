import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: '480px', 
        padding: '40px', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        boxShadow: 'var(--shadow-lg), 0 0 40px rgba(99, 102, 241, 0.2)'
      }}>
        
        <div style={{ 
          width: '72px', 
          height: '72px', 
          borderRadius: '50%', 
          background: 'rgba(99, 102, 241, 0.15)', 
          color: '#818cf8', 
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.2rem',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
        }}>
          📩
        </div>

        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
          E-postanızı Doğrulayın
        </h1>
        
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          Hesabınızı ve aile arşivinizin güvenliğini sağlamak için e-posta adresinize tek tıkla onaylama bağlantısı gönderdik.
        </p>

        <div style={{ padding: '16px', backgroundColor: 'rgba(245, 158, 11, 0.12)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--accent-gold)', margin: 0 }}>
            🎁 E-postanızı doğruladığınız an hesabınıza +100 Hoş Geldin Kredisi yüklenecektir!
          </p>
        </div>
        
        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="primary">
              Giriş Ekranına Dön →
            </Button>
          </Link>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Button fullWidth variant="outline">
              Ana Sayfaya Git
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

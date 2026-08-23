'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleDemoLogin = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      
      {/* Split Hero Card */}
      <div className={styles.authWrapper}>
        
        {/* Left Side: Nostalgic Family Visual */}
        <div className={styles.visualSide}>
          <div className={styles.quoteBadge}>📜 NESİLDEN NESİLE MİRAS</div>
          <h2 className={styles.quoteTitle}>
            &ldquo;Kökleri derinde olan bir ailenin dalları geleceğe uzanır.&rdquo;
          </h2>
          <p className={styles.quoteSub}>
            Yılmaz Hanedanı Dijital Arşivi • 1880&apos;den günümüze taşınan 342 fotoğraf ve ses kaydı
          </p>

          <div className={styles.vintageStamps}>
            <span>📍 Bursa Kütüğü</span>
            <span>🕊️ 5 Kuşak Hafıza</span>
            <span>✨ Gemini AI Destekli</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <div className={styles.logoBadge}>🌳</div>
            <h1 className={styles.title}>Aile Hafızası Girişi</h1>
            <p className={styles.subtitle}>Ailenizin ortak arşivine ve soy ağacına bağlanın</p>
          </div>

          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleDemoLogin(); }}>
            <Input 
              label="E-posta Adresi" 
              type="email" 
              placeholder="ahmet@yilmaz.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <Input 
              label="Şifre" 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            
            <Button fullWidth type="submit" variant="primary">
              Giriş Yap →
            </Button>

            <button 
              type="button" 
              onClick={handleDemoLogin}
              className={styles.demoLoginBtn}
            >
              🚀 Misafir / Demo Girişi ile Keşfet
            </button>
          </form>

          <div className={styles.footer}>
            <p>Aileye yeni misiniz? <Link href="/register" className={styles.link}>Kayıt Ol & +100 Kredi Kazan</Link></p>
          </div>
        </Card>

      </div>
    </div>
  );
}

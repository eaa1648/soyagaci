'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleDemoLogin = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.authWrapper}>
        
        {/* Left Side: Heritage Visual */}
        <div className={styles.visualSide}>
          <div className={styles.crestBox}>Y</div>
          
          <h2 className={styles.quoteTitle}>
            &ldquo;Kökünü bilmeyen ağacın meyvesi tatlı olmaz.&rdquo;
          </h2>
          <p className={styles.quoteSub}>
            Yılmaz Ailesi Dijital Arşivi • 1880&apos;den günümüze uzanan aile hafızası
          </p>

          <div className={styles.vintageTags}>
            <span>Bursa & İstanbul Kütükleri</span>
            <span>5 Kuşak Şecere</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Aile Arşivi Girişi</h1>
            <p className={styles.subtitle}>Ailenizin ortak şeceresine ve belgelerine erişin</p>
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
            
            <button type="submit" className={styles.primaryBtn}>
              <span>Giriş Yap</span>
              <ArrowRight size={15} />
            </button>

            <button 
              type="button" 
              onClick={handleDemoLogin}
              className={styles.demoLoginBtn}
            >
              Misafir / Önizleme Girişi
            </button>
          </form>

          <div className={styles.footer}>
            <p>Hesabınız yok mu? <Link href="/register" className={styles.link}>Kayıt Ol</Link></p>
          </div>
        </Card>

      </div>
    </div>
  );
}

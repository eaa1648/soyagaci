'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import { setCurrentUser } from '@/lib/services/authService';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      id: `u-${Date.now()}`,
      name: name,
      email: email,
      role: 'user' as const,
      roleLabel: 'Aile Üyesi',
      credits: 100,
    };

    setCurrentUser(newUser);

    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authWrapper}>
        
        {/* Visual Side */}
        <div className={styles.visualSide}>
          <div className={styles.crestBox}>Y</div>
          
          <h2 className={styles.quoteTitle}>
            Aile Hafızasına Katılın
          </h2>
          <p className={styles.quoteSub}>
            Kaydolun, soy ağacınızı inceleyin ve ailenizin tarihi belgelerini keşfetmeye başlayın.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}><Check size={14} /> Sınırsız soy kütüğü ve akraba kaydı (Dayı, Hala, Amca, Teyze, Kuzen)</div>
            <div className={styles.featureItem}><Check size={14} /> Yüksek çözünürlüklü belge ve fotoğraf arşivi</div>
            <div className={styles.featureItem}><Check size={14} /> Yapay zekâ hafıza asistanı (Gemini AI)</div>
            <div className={styles.featureItem}><Check size={14} /> 100 Başlangıç Kredisi hediye</div>
          </div>
        </div>

        {/* Form Side */}
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Yeni Hesap Aç</h1>
            <p className={styles.subtitle}>Aile arşivine katılmak için bilgilerinizi girin</p>
          </div>

          <form className={styles.form} onSubmit={handleRegister}>
            <Input 
              label="Adınız ve Soyadınız" 
              type="text" 
              placeholder="Örn: Ahmet Yılmaz" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              label="E-posta Adresi" 
              type="email" 
              placeholder="ahmet@yilmaz.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
              label="Şifre" 
              type="password" 
              placeholder="En az 6 karakter" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type="submit" className={styles.primaryBtn} disabled={loading}>
              <span>{loading ? 'Hesap Açılıyor...' : 'Kayıt Ol ve Giriş Yap'}</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className={styles.footer}>
            <p>Zaten bir hesabınız var mı? <Link href="/login" className={styles.link}>Giriş Yap</Link></p>
          </div>
        </Card>

      </div>
    </div>
  );
}

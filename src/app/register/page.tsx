'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import styles from './page.module.css';
import Link from 'next/link';
import { auth, db } from '@/lib/firebase/config';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });
        await sendEmailVerification(user);
        await setDoc(doc(db, 'users', user.uid), {
          fullName: name,
          email: email,
          emailVerified: false,
          createdAt: new Date().toISOString(),
          role: 'user',
          credits: 0,
        });
        router.push('/verify-email');
      } else {
        setTimeout(() => {
          router.push('/verify-email');
        }, 800);
      }
    } catch (err: unknown) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Kayıt sırasında bir hata oluştu.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
            <div className={styles.featureItem}><Check size={14} /> Sınırsız soy kütüğü ve fert kaydı</div>
            <div className={styles.featureItem}><Check size={14} /> Yüksek çözünürlüklü belge arşivi</div>
            <div className={styles.featureItem}><Check size={14} /> Yapay zekâ hafıza asistanı</div>
          </div>
        </div>

        {/* Form Side */}
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Yeni Hesap Aç</h1>
            <p className={styles.subtitle}>Aile arşivine katılmak için bilgilerinizi girin</p>
          </div>

          <form className={styles.form} onSubmit={handleRegister}>
            {error && <div className={styles.errorAlert}>{error}</div>}
            
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
              <span>{loading ? 'Hesap Açılıyor...' : 'Kayıt Ol'}</span>
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

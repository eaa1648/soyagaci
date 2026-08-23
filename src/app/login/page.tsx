'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, ShieldCheck, UserCheck, Users } from 'lucide-react';
import { setCurrentUser, DEMO_ACCOUNTS } from '@/lib/services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if matches demo accounts
    if (email.toLowerCase().includes('admin')) {
      setCurrentUser(DEMO_ACCOUNTS.admin.profile);
    } else if (email.toLowerCase().includes('ali')) {
      setCurrentUser(DEMO_ACCOUNTS.family_admin.profile);
    } else {
      setCurrentUser({
        id: `u-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        familyName: `${email.split('@')[0]} Ailesi`,
        role: 'user',
        roleLabel: 'Aile Üyesi',
        credits: 100
      });
    }
    router.push('/');
  };

  const loginAsDemo = (type: 'admin' | 'family_admin' | 'member') => {
    const acc = DEMO_ACCOUNTS[type];
    setEmail(acc.email);
    setPassword(acc.pass);
    setCurrentUser(acc.profile);
    setTimeout(() => {
      router.push('/');
    }, 400);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authWrapper}>
        
        {/* Left Side: Heritage Visual & Quick Demo Accounts */}
        <div className={styles.visualSide}>
          <div className={styles.crestBox}>Y</div>
          
          <h2 className={styles.quoteTitle}>
            Aile Arşivi & Şecere Portalı
          </h2>
          <p className={styles.quoteSub}>
            Deneyimlemek ve yetkileri test etmek için aşağıdaki hazır demo hesaplardan birine tek tıkla tıklayarak giriş yapabilirsiniz:
          </p>

          {/* Quick Demo Cards */}
          <div className={styles.demoAccountList}>
            
            <button 
              type="button" 
              className={styles.demoCardBtn}
              onClick={() => loginAsDemo('admin')}
            >
              <div className={styles.demoCardHeader}>
                <ShieldCheck size={16} className={styles.demoAdminIcon} />
                <strong>Platform Yöneticisi (Admin)</strong>
              </div>
              <span className={styles.demoCardEmail}>admin@yilmaz.com (Şifre: admin123)</span>
              <span className={styles.demoCardDesc}>Tam yetki, onaylar, kullanıcı rol değiştirme ve kütük yönetimi</span>
            </button>

            <button 
              type="button" 
              className={styles.demoCardBtn}
              onClick={() => loginAsDemo('family_admin')}
            >
              <div className={styles.demoCardHeader}>
                <UserCheck size={16} className={styles.demoFamilyIcon} />
                <strong>Aile Yöneticisi (Ali Yılmaz)</strong>
              </div>
              <span className={styles.demoCardEmail}>ali@yilmaz.com (Şifre: ali123)</span>
              <span className={styles.demoCardDesc}>Soy ağacı düzenleme ve belge onaylama yetkisi</span>
            </button>

            <button 
              type="button" 
              className={styles.demoCardBtn}
              onClick={() => loginAsDemo('member')}
            >
              <div className={styles.demoCardHeader}>
                <Users size={16} className={styles.demoMemberIcon} />
                <strong>Aile Üyesi (Ahmet Yılmaz)</strong>
              </div>
              <span className={styles.demoCardEmail}>ahmet@yilmaz.com (Şifre: ahmet123)</span>
              <span className={styles.demoCardDesc}>Hatıra yazma, belge yükleme, ağaç inceleme</span>
            </button>

          </div>
        </div>

        {/* Right Side: Login Form */}
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Giriş Yap</h1>
            <p className={styles.subtitle}>Hesap bilgilerinizi girin veya soldaki demo hesapları seçin</p>
          </div>

          <form className={styles.form} onSubmit={handleLoginSubmit}>
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
              <span>Giriş Yap ve Başla</span>
              <ArrowRight size={15} />
            </button>
          </form>

          <div className={styles.footer}>
            <p>Hesabınız yok mu? <Link href="/register" className={styles.link}>Yeni Hesap Oluştur</Link></p>
          </div>
        </Card>

      </div>
    </div>
  );
}

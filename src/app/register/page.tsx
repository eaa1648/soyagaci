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
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const calculatedFamily = familyName.trim() 
      ? (familyName.toLowerCase().includes('ailesi') ? familyName.trim() : `${familyName.trim()} Ailesi`)
      : `${name.split(' ').slice(-1)[0] || 'Yeni'} Ailesi`;

    const newUser = {
      id: `u-${Date.now()}`,
      name: name,
      email: email,
      familyName: calculatedFamily,
      role: 'family_admin' as const, // The creator is the family admin!
      roleLabel: 'Aile Yöneticisi',
      credits: 250,
    };

    setCurrentUser(newUser);

    setTimeout(() => {
      setLoading(false);
      router.push('/');
    }, 500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.authWrapper}>
        
        {/* Visual Side */}
        <div className={styles.visualSide}>
          <div className={styles.crestBox}>Ş</div>
          
          <h2 className={styles.quoteTitle}>
            Kendi Ailenizin Soyağacını Başlatın
          </h2>
          <p className={styles.quoteSub}>
            Ücretsiz hesabınızı açın, ailenizin adını belirleyin ve akrabalarınızı ekleyerek kendi dijital şecerenizi kurun.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}><Check size={14} /> Kendi ailenize özel kapalı devre şecere</div>
            <div className={styles.featureItem}><Check size={14} /> 20+ Akrabalık bağı (Dayı, Hala, Amca, Teyze, Kuzen)</div>
            <div className={styles.featureItem}><Check size={14} /> Yapay zekâ destekli belge & fotoğraf arşivi</div>
            <div className={styles.featureItem}><Check size={14} /> 250 Başlangıç Kredisi hediye</div>
          </div>
        </div>

        {/* Form Side */}
        <Card className={styles.loginCard}>
          <div className={styles.header}>
            <h1 className={styles.title}>Yeni Aile Soyağacı Oluştur</h1>
            <p className={styles.subtitle}>Ailenizin şecere yöneticisi olarak kaydolun</p>
          </div>

          <form className={styles.form} onSubmit={handleRegister}>
            <Input 
              label="Adınız ve Soyadınız" 
              type="text" 
              placeholder="Örn: Mehmet Kaya" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input 
              label="Ailenizin / Şecerenizin Adı" 
              type="text" 
              placeholder="Örn: Kaya Ailesi (veya Öztürk Hanedanı)" 
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
            />

            <Input 
              label="E-posta Adresi" 
              type="email" 
              placeholder="mehmet@kaya.com" 
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
              <span>{loading ? 'Soyağacı Kuruluyor...' : 'Soyağacımı Başlat'}</span>
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

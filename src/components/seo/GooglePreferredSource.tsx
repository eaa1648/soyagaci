'use client';

import React, { useState } from 'react';
import styles from './GooglePreferredSource.module.css';
import { Check, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface GooglePreferredSourceProps {
  variant?: 'inline' | 'card' | 'badge';
  title?: string;
  description?: string;
}

export function GooglePreferredSourceButton({ 
  variant = 'card',
  title = 'Şecere’yi Google’da Tercih Edilen Kaynak Yapın',
  description = 'Google Arama, Keşfet (Discover) ve AI Overviews yapay zekâ yanıtlarında aile tarihi ve şecere araştırmalarınızda sitemizi öncelikli kaynak olarak kaydedin.'
}: GooglePreferredSourceProps) {
  const [isPreferred, setIsPreferred] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleTogglePreferred = () => {
    const nextState = !isPreferred;
    setIsPreferred(nextState);
    if (nextState) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);
    }
  };

  if (variant === 'badge') {
    return (
      <button 
        onClick={handleTogglePreferred}
        className={`${styles.badgeBtn} ${isPreferred ? styles.badgeActive : ''}`}
        title="Google'da Tercih Edilen Kaynak Olarak Ekle"
      >
        <GoogleIcon />
        <span>{isPreferred ? 'Google Tercihinizde Kayıtlı' : 'Google’da Tercih Et'}</span>
        {isPreferred && <Check size={12} className={styles.checkIcon} />}
      </button>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={styles.inlineBox}>
        <div className={styles.inlineContent}>
          <GoogleIcon />
          <span className={styles.inlineText}>
            {isPreferred ? 'Şecere.app Google hesabınızda öncelikli kaynak olarak işaretlendi.' : 'Google Arama ve AI yanıtlarında öncelikli görünmesi için tercih edin.'}
          </span>
        </div>
        <button 
          onClick={handleTogglePreferred}
          className={`${styles.actionBtn} ${isPreferred ? styles.actionActive : ''}`}
        >
          {isPreferred ? <Check size={14} /> : <Sparkles size={14} />}
          <span>{isPreferred ? 'Tercih Edildi' : 'Google’da Tercih Et'}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.googleBrandBadge}>
          <GoogleIcon />
          <span>GOOGLE ARAMA & KEŞFET ENTEGRASYONU</span>
        </div>
        {isPreferred && (
          <span className={styles.activePill}>
            <Check size={12} /> Kaydedildi
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <h4 className={styles.cardTitle}>{title}</h4>
        <p className={styles.cardDesc}>{description}</p>

        <div className={styles.benefitsRow}>
          <span className={styles.benefitItem}>
            <ShieldCheck size={13} /> AI Overviews Önceliği
          </span>
          <span className={styles.benefitItem}>
            <Sparkles size={13} /> Doğal Dil ile Keşfet
          </span>
          <span className={styles.benefitItem}>
            <ExternalLink size={13} /> Kesintisiz Okuma
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <button 
          onClick={handleTogglePreferred}
          className={`${styles.primaryGoogleBtn} ${isPreferred ? styles.preferredSaved : ''}`}
        >
          <GoogleIcon />
          <span>{isPreferred ? '✓ Google Hesabınızda Tercih Edilen Kaynak' : 'Google’da Tercih Edilen Kaynak Olarak Ekle'}</span>
        </button>
      </div>

      {showNotification && (
        <div className={styles.toastNotice}>
          <Check size={15} />
          <span>Şecere.app başarıyla Google tercihlerinize eklendi! Yapay zekâ özetlerinde öncelikli gösterilecektir.</span>
        </div>
      )}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
    </svg>
  );
}

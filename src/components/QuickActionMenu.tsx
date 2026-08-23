'use client';

import React, { useState } from 'react';
import styles from './QuickActionMenu.module.css';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export function QuickActionMenu() {
  const [modalType, setModalType] = useState<string | null>(null);

  const relativeTypes = [
    { label: 'Anne Ekle', icon: '👩', key: 'mother' },
    { label: 'Baba Ekle', icon: '👨', key: 'father' },
    { label: 'Eş Ekle', icon: '💍', key: 'spouse' },
    { label: 'Çocuk Ekle', icon: '👶', key: 'child' },
    { label: 'Kardeş Ekle', icon: '🧑‍🤝‍🧑', key: 'sibling' },
  ];

  const mediaTypes = [
    { label: 'Fotoğraf', icon: '📸', href: '/media/upload?type=photo' },
    { label: 'Eski Belge / Tapu', icon: '📜', href: '/media/upload?type=doc' },
    { label: 'Ses Kaydı', icon: '🎙️', href: '/media/upload?type=audio' },
    { label: 'Video / Film', icon: '🎥', href: '/media/upload?type=video' },
    { label: 'Hatıra & Anı', icon: '📖', href: '/media/upload?type=story' },
  ];

  return (
    <>
      <Card className={styles.menuContainer}>
        
        {/* Relative Quick Actions */}
        <div className={styles.sectionHeader}>
          <span className={styles.titleIcon}>🌳</span>
          <h4 className={styles.title}>Soy Ağacına Hızlı Ekle</h4>
        </div>
        
        <div className={styles.relativesGrid}>
          {relativeTypes.map((item) => (
            <button
              key={item.key}
              className={styles.relativeBtn}
              onClick={() => setModalType(item.label)}
            >
              <span className={styles.btnIcon}>{item.icon}</span>
              <span className={styles.btnLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Media Quick Actions */}
        <div className={styles.sectionHeader}>
          <span className={styles.titleIcon}>✨</span>
          <h4 className={styles.title}>Miras & Medya Yükle</h4>
        </div>

        <div className={styles.mediaGrid}>
          {mediaTypes.map((item, idx) => (
            <Link key={idx} href={item.href} className={styles.mediaBtn}>
              <span className={styles.btnIcon}>{item.icon}</span>
              <span className={styles.btnLabel}>{item.label}</span>
            </Link>
          ))}
        </div>

      </Card>

      {/* Interactive Quick Add Modal */}
      {modalType && (
        <div className={styles.modalBackdrop} onClick={() => setModalType(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>➕ {modalType}</h3>
              <button className={styles.modalClose} onClick={() => setModalType(null)}>✕</button>
            </div>
            
            <p className={styles.modalDesc}>
              Ağaçtaki seçili kişi veya profil sahibine doğrudan bağlı yeni bir birey oluşturun.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert(`${modalType} başarıyla ağaca eklendi!`); setModalType(null); }} className={styles.modalForm}>
              <input type="text" placeholder="Ad ve Soyad" required className={styles.modalInput} />
              <div className={styles.modalRow}>
                <input type="text" placeholder="Doğum Yılı (Örn: 1952)" className={styles.modalInput} />
                <input type="text" placeholder="Doğum Yeri" className={styles.modalInput} />
              </div>
              <input type="text" placeholder="Meslek" className={styles.modalInput} />
              
              <div className={styles.modalActions}>
                <button type="button" className={styles.modalCancelBtn} onClick={() => setModalType(null)}>İptal</button>
                <button type="submit" className={styles.modalSubmitBtn}>Kaydet ve Ağaca Yerleştir</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import React, { useState } from 'react';
import styles from './QuickActionMenu.module.css';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { 
  UserPlus, 
  Image as ImageIcon, 
  FileText, 
  Mic, 
  Video, 
  BookOpen, 
  X,
  Plus
} from 'lucide-react';

export function QuickActionMenu() {
  const [modalType, setModalType] = useState<string | null>(null);

  const relativeTypes = [
    { label: 'Anne Ekle', key: 'mother' },
    { label: 'Baba Ekle', key: 'father' },
    { label: 'Eş Ekle', key: 'spouse' },
    { label: 'Çocuk Ekle', key: 'child' },
    { label: 'Kardeş Ekle', key: 'sibling' },
  ];

  const mediaTypes = [
    { label: 'Fotoğraf', icon: ImageIcon, href: '/media/upload?type=photo' },
    { label: 'Tapu / Belge', icon: FileText, href: '/media/upload?type=doc' },
    { label: 'Ses Kaydı', icon: Mic, href: '/media/upload?type=audio' },
    { label: 'Video Film', icon: Video, href: '/media/upload?type=video' },
    { label: 'Hatıra Yaz', icon: BookOpen, href: '/media/upload?type=story' },
  ];

  return (
    <>
      <Card className={styles.menuContainer}>
        
        {/* Relative Quick Actions */}
        <div className={styles.sectionHeader}>
          <UserPlus size={16} className={styles.titleIcon} />
          <h4 className={styles.title}>Soy Ağacına Hızlı Ekle</h4>
        </div>
        
        <div className={styles.relativesGrid}>
          {relativeTypes.map((item) => (
            <button
              key={item.key}
              className={styles.relativeBtn}
              onClick={() => setModalType(item.label)}
            >
              <Plus size={13} />
              <span className={styles.btnLabel}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className={styles.divider} />

        {/* Media Quick Actions */}
        <div className={styles.sectionHeader}>
          <ImageIcon size={16} className={styles.titleIcon} />
          <h4 className={styles.title}>Arşive Medya Yükle</h4>
        </div>

        <div className={styles.mediaGrid}>
          {mediaTypes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link key={idx} href={item.href} className={styles.mediaBtn}>
                <Icon size={14} />
                <span className={styles.btnLabel}>{item.label}</span>
              </Link>
            );
          })}
        </div>

      </Card>

      {/* Quick Add Modal */}
      {modalType && (
        <div className={styles.modalBackdrop} onClick={() => setModalType(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>{modalType}</h3>
              <button className={styles.modalClose} onClick={() => setModalType(null)}>
                <X size={16} />
              </button>
            </div>
            
            <p className={styles.modalDesc}>
              Ağaçtaki seçili kişiye doğrudan bağlı yeni bir aile bireyi oluşturun.
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

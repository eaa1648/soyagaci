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
import { savePerson, PersonRecord } from '@/lib/services/personService';

const RELATIVE_QUICK_BUTTONS = [
  { label: 'Anne / Baba', key: 'parent' },
  { label: 'Eş / Hayat Arkadaşı', key: 'spouse' },
  { label: 'Evlat (Oğul/Kız)', key: 'child' },
  { label: 'Kardeş', key: 'sibling' },
  { label: 'Kuzen', key: 'cousin' },
  { label: 'Dayı / Amca', key: 'uncle' },
  { label: 'Teyze / Hala', key: 'aunt' },
  { label: 'Torun / Yeğen', key: 'grandchild' },
];

export function QuickActionMenu() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [birthPlace, setBirthPlace] = useState('Bursa');
  const [job, setJob] = useState('');

  const mediaTypes = [
    { label: 'Fotoğraf', icon: ImageIcon, href: '/media/upload?type=photo' },
    { label: 'Tapu / Belge', icon: FileText, href: '/media/upload?type=doc' },
    { label: 'Ses Kaydı', icon: Mic, href: '/media/upload?type=audio' },
    { label: 'Video Film', icon: Video, href: '/media/upload?type=video' },
    { label: 'Hatıra Yaz', icon: BookOpen, href: '/media/upload?type=story' },
  ];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newId = `p-${Date.now()}`;
    const newPersonRecord: PersonRecord = {
      id: newId,
      name: name,
      title: `${modalType} • Aile Kütüğü Kaydı`,
      years: birthYear ? `${birthYear} — Günümüz` : `${new Date().getFullYear()} — Günümüz`,
      job: job || 'Aile Üyesi',
      birthPlace: birthPlace,
      bloodType: 'A Rh (+)',
      nickname: name.split(' ')[0],
      generation: '3. Kuşak',
      branch: 'bursa',
      isLiving: true,
      hasAudio: false,
      biography: `Aile arşivine ${modalType} olarak eklenmiştir.`,
      milestones: [{ year: birthYear || '2026', title: 'Doğum', desc: `${birthPlace} doğumlu.`, tag: 'Doğum' }],
      relatives: [],
      photos: [],
      stories: [],
      audioTitle: '',
      audioDuration: ''
    };

    await savePerson(newPersonRecord);
    alert(`${name} (${modalType}) başarıyla soyağacına ve aile kütüğüne eklendi!`);
    setModalType(null);
    setName('');
    setJob('');
    setBirthYear('');
  };

  return (
    <>
      <Card className={styles.menuContainer}>
        
        {/* Relative Quick Actions */}
        <div className={styles.sectionHeader}>
          <UserPlus size={16} className={styles.titleIcon} />
          <h4 className={styles.title}>Soy Ağacına Akraba Ekle</h4>
        </div>
        
        <div className={styles.relativesGrid}>
          {RELATIVE_QUICK_BUTTONS.map((item) => (
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
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
                {modalType} Ekle
              </h3>
              <button className={styles.modalClose} onClick={() => setModalType(null)}>
                <X size={16} />
              </button>
            </div>
            
            <p className={styles.modalDesc}>
              Ailenizin ortak kütüğüne ve soyağacına yeni bir <strong>{modalType}</strong> kaydı oluşturun.
            </p>

            <form onSubmit={handleSave} className={styles.modalForm}>
              <input 
                type="text" 
                placeholder="Ad ve Soyad" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.modalInput} 
              />
              <div className={styles.modalRow}>
                <input 
                  type="text" 
                  placeholder="Doğum Yılı (Örn: 1985)" 
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className={styles.modalInput} 
                />
                <input 
                  type="text" 
                  placeholder="Doğum Yeri (Örn: Bursa)" 
                  value={birthPlace}
                  onChange={(e) => setBirthPlace(e.target.value)}
                  className={styles.modalInput} 
                />
              </div>
              <input 
                type="text" 
                placeholder="Meslek / Unvan" 
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className={styles.modalInput} 
              />
              
              <div className={styles.modalActions}>
                <button type="button" className={styles.modalCancelBtn} onClick={() => setModalType(null)}>İptal</button>
                <button type="submit" className={styles.modalSubmitBtn}>Kaydet ve Kütüğe İşle</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

import React from 'react';
import styles from './PersonCard.module.css';
import Link from 'next/link';

export interface PersonCardProps {
  id: string;
  name: string;
  years: string;
  job?: string;
  generation?: string;
  relation?: string;
  location?: string;
  photoCount?: number;
  storyCount?: number;
  hasAudio?: boolean;
  isLiving?: boolean;
  avatarColor?: string;
}

export function PersonCard({ 
  id, 
  name, 
  years, 
  job, 
  generation = '2. Kuşak',
  relation,
  location = 'Bursa',
  photoCount = 12,
  storyCount = 3,
  hasAudio = true,
  isLiving = false,
  avatarColor
}: PersonCardProps) {
  const initial = name.charAt(0);

  return (
    <Link href={`/person/${id}`} className={styles.cardLink}>
      <div className={styles.card}>
        
        {/* Top Badges */}
        <div className={styles.topRow}>
          <span className={styles.generationBadge}>{generation}</span>
          {relation && <span className={styles.relationBadge}>{relation}</span>}
          {isLiving ? (
            <span className={styles.livingDot} title="Yaşıyor" />
          ) : (
            <span className={styles.memoryLeaf} title="Mazi & Rahmetli">🕊️</span>
          )}
        </div>

        {/* Center Portrait */}
        <div className={styles.portraitSection}>
          <div className={styles.portraitFrame} style={{ borderColor: avatarColor || 'rgba(99, 102, 241, 0.4)' }}>
            <div className={styles.avatarLetter}>{initial}</div>
          </div>
          <div className={styles.haloEffect} />
        </div>
        
        {/* Info */}
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.yearTag}>
            <span>🗓️</span>
            <span>{years}</span>
          </div>
          
          <div className={styles.metaRow}>
            {job && <span className={styles.jobTag}>💼 {job}</span>}
            {location && <span className={styles.locationTag}>📍 {location}</span>}
          </div>
        </div>
        
        {/* Footer Stats */}
        <div className={styles.cardFooter}>
          <div className={styles.statItem} title={`${photoCount} Fotoğraf`}>
            <span>📸</span> <span>{photoCount}</span>
          </div>
          <div className={styles.statItem} title={`${storyCount} Hatıra Kaydı`}>
            <span>📖</span> <span>{storyCount}</span>
          </div>
          {hasAudio && (
            <div className={styles.audioBadge} title="Sesli Hatıra Kaydı Mevcut">
              <span>🎙️ Ses Kaydı</span>
            </div>
          )}
        </div>

      </div>
    </Link>
  );
}

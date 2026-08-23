import React from 'react';
import styles from './PersonCard.module.css';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { MapPin, Calendar, Volume2, ArrowUpRight } from 'lucide-react';

interface PersonCardProps {
  id: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  birthPlace?: string;
  isLiving?: boolean;
  job?: string;
  generation?: string;
  hasAudio?: boolean;
}

export function PersonCard({
  id,
  name,
  birthYear,
  deathYear,
  birthPlace,
  isLiving,
  job,
  generation,
  hasAudio,
}: PersonCardProps) {
  const yearsText = birthYear 
    ? `${birthYear} — ${isLiving ? 'Günümüz' : (deathYear || 'Mazi')}`
    : 'Tarih Bilgisi Yok';

  return (
    <Card className={styles.card} hoverable>
      <Link href={`/person/${id}`} className={styles.linkWrapper}>
        
        {/* Top Meta Row */}
        <div className={styles.topRow}>
          <span className={styles.genBadge}>{generation || '1. Kuşak'}</span>
          
          <div className={styles.statusGroup}>
            {hasAudio && (
              <span className={styles.audioPill} title="Ses Kaydı Mevcut">
                <Volume2 size={12} strokeWidth={2.2} />
                <span>Ses</span>
              </span>
            )}
            <span className={`${styles.statusBadge} ${isLiving ? styles.living : styles.deceased}`}>
              <span className={styles.statusDot} />
              {isLiving ? 'Yaşıyor' : 'Mazi'}
            </span>
          </div>
        </div>

        {/* Person Identity */}
        <div className={styles.identity}>
          <div className={styles.avatarBox}>
            <span className={styles.avatarLetter}>{name.charAt(0)}</span>
          </div>

          <div className={styles.mainInfo}>
            <div className={styles.nameRow}>
              <h3 className={styles.name}>{name}</h3>
              <ArrowUpRight size={15} className={styles.arrowIcon} />
            </div>
            {job && <p className={styles.job}>{job}</p>}
          </div>
        </div>

        {/* Footer Details */}
        <div className={styles.footer}>
          <div className={styles.metaItem}>
            <Calendar size={13} strokeWidth={1.8} className={styles.metaIcon} />
            <span>{yearsText}</span>
          </div>

          {birthPlace && (
            <div className={styles.metaItem}>
              <MapPin size={13} strokeWidth={1.8} className={styles.metaIcon} />
              <span>{birthPlace}</span>
            </div>
          )}
        </div>

      </Link>
    </Card>
  );
}

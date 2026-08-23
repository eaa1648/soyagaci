'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { PersonCard } from '@/components/person/PersonCard';
import { AdBanner } from '@/components/ads/AdBanner';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { getPersons, PersonRecord, SEED_PERSONS } from '@/lib/services/personService';
import { 
  Users, 
  FileText, 
  Mic, 
  Coins, 
  Sparkles, 
  Search, 
  ArrowRight, 
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';

const FAMILY_BRANCHES = [
  { id: 'all', label: 'Tüm Aile' },
  { id: 'bursa', label: 'Bursa Kökü (1. & 2. Kuşak)' },
  { id: 'istanbul', label: 'İstanbul Kolu (3. Kuşak)' },
  { id: 'izmir', label: 'İzmir Kolu' },
];

export default function Home() {
  const [persons, setPersons] = useState<PersonRecord[]>(SEED_PERSONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');

  useEffect(() => {
    getPersons().then(data => {
      if (data && data.length > 0) {
        setPersons(data);
      }
    });
  }, []);

  const filteredPersons = persons.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.birthPlace.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || p.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  return (
    <div className={styles.container}>
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          
          <div className={styles.kicker}>
            <span className={styles.kickerLine} />
            <span className={styles.kickerText}>YILMAZ AİLESİ ARŞİVİ</span>
            <span className={styles.kickerLine} />
          </div>

          <h1 className={styles.heroHeadline}>
            Geçmişin hatırası, geleceğin mirası.
          </h1>

          <p className={styles.heroSubhead}>
            1880&apos;den günümüze uzanan soy kütüğü, fotoğraflar, ses kayıtları ve hatıra belgeleri tek çatı altında muhafaza edilmektedir.
          </p>

          {/* Search Box with AI Shortcut */}
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text"
                placeholder="İsim, meslek, şehir veya hatıra ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.aiPromptsRow}>
              <span className={styles.aiPromptsLabel}>
                <Sparkles size={13} className={styles.sparkleIcon} />
                Örnek Sorgular:
              </span>
              <Link href={`/ai-chat?q=${encodeURIComponent('Mustafa Dedemin öğretmenlik yıllarını ve okulunu anlat')}`} className={styles.aiChip}>
                Mustafa Dede&apos;nin öğretmenliği
              </Link>
              <Link href={`/ai-chat?q=${encodeURIComponent('Ailemizin Bursa kökleri ve eski adresleri nelerdir?')}`} className={styles.aiChip}>
                Bursa kökleri ve evler
              </Link>
              <Link href={`/ai-chat?q=${encodeURIComponent('Ailedeki en eski ses kaydı kime ait ve ne zaman kaydedilmiş?')}`} className={styles.aiChip}>
                Tarihi ses kayıtları
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. STATS & METRICS ROW */}
      <section className={styles.metricsSection}>
        <div className={styles.metricsGrid}>
          
          <Card className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Kayıtlı Fert</span>
              <Users size={16} className={styles.metricIcon} />
            </div>
            <div className={styles.metricValue}>{persons.length}</div>
            <div className={styles.metricFooter}>5 kuşak boyunca</div>
          </Card>

          <Card className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Arşiv Belgesi</span>
              <FileText size={16} className={styles.metricIcon} />
            </div>
            <div className={styles.metricValue}>342</div>
            <div className={styles.metricFooter}>Fotoğraf, tapu, berat</div>
          </Card>

          <Card className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Ses & Video</span>
              <Mic size={16} className={styles.metricIcon} />
            </div>
            <div className={styles.metricValue}>18</div>
            <div className={styles.metricFooter}>Dijitalleştirilmiş kaset</div>
          </Card>

          <Card className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <span className={styles.metricLabel}>Kasa Bakiyesi</span>
              <Coins size={16} className={styles.metricIcon} />
            </div>
            <div className={styles.metricValue}>2.550</div>
            <div className={styles.metricFooter}>Ortak restorasyon fonu</div>
          </Card>

        </div>
      </section>

      {/* 3. BRANCH FILTER & ROSTER */}
      <section className={styles.rosterSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Aile Kütüğü</h2>
            <p className={styles.sectionDesc}>Kuşaklara ve kollara göre arşivlenmiş aile bireyleri</p>
          </div>

          <Link href="/tree" className={styles.viewTreeBtn}>
            <Layers size={15} />
            <span>İnteraktif Ağacı Aç</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Branch Tabs */}
        <div className={styles.branchTabs}>
          {FAMILY_BRANCHES.map(b => (
            <button
              key={b.id}
              className={`${styles.branchTab} ${selectedBranch === b.id ? styles.branchTabActive : ''}`}
              onClick={() => setSelectedBranch(b.id)}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Person Cards Grid */}
        <div className={styles.personsGrid}>
          {filteredPersons.map(p => (
            <PersonCard key={p.id} {...p} />
          ))}
        </div>

        {filteredPersons.length === 0 && (
          <div className={styles.emptyState}>
            <p>Aradığınız kriterlere uygun aile bireyi bulunamadı.</p>
          </div>
        )}
      </section>

      {/* 4. HIGHLIGHTS & ARCHIVE TREASURES */}
      <section className={styles.highlightsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Öne Çıkan Belgeler</h2>
            <p className={styles.sectionDesc}>Bu ay arşivden çıkarılan tarihi hatıralar</p>
          </div>
          <Link href="/media/upload" className={styles.textLink}>
            Tüm Koleksiyonu Gör
          </Link>
        </div>

        <div className={styles.treasuresGrid}>
          
          {/* Card 1 */}
          <Card className={styles.treasureCard} hoverable>
            <div className={styles.treasureMedia}>
              <div className={styles.treasurePlaceholder}>
                <span className={styles.treasureYear}>1968</span>
              </div>
            </div>
            <div className={styles.treasureInfo}>
              <span className={styles.treasureTag}>Fotoğraf Albümü</span>
              <h4 className={styles.treasureTitle}>Mustafa & Ayşe Yılmaz Nikah Töreni</h4>
              <p className={styles.treasureDesc}>Bursa Çekirge semtinde çekilen orijinal siyah-beyaz analog nikah hatırası.</p>
              <div className={styles.treasureMeta}>
                <MapPin size={12} />
                <span>Bursa / Çekirge</span>
              </div>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className={styles.treasureCard} hoverable>
            <div className={styles.treasureMedia}>
              <div className={styles.treasurePlaceholder}>
                <span className={styles.treasureYear}>1984</span>
              </div>
            </div>
            <div className={styles.treasureInfo}>
              <span className={styles.treasureTag}>Ses Arşivi</span>
              <h4 className={styles.treasureTitle}>Köy Günleri ve Maarif Hatıraları</h4>
              <p className={styles.treasureDesc}>Mustafa Yılmaz&apos;ın Çapa Öğretmen Okulu ve ilk tayin yıllarını anlattığı ses kaydı.</p>
              <div className={styles.treasureMeta}>
                <Mic size={12} />
                <span>4 dk 12 sn</span>
              </div>
            </div>
          </Card>

          {/* Card 3 */}
          <Card className={styles.treasureCard} hoverable>
            <div className={styles.treasureMedia}>
              <div className={styles.treasurePlaceholder}>
                <span className={styles.treasureYear}>1955</span>
              </div>
            </div>
            <div className={styles.treasureInfo}>
              <span className={styles.treasureTag}>Yazılı Belge</span>
              <h4 className={styles.treasureTitle}>El Yazması Aile Şecere Defteri</h4>
              <p className={styles.treasureDesc}>Eski Türkçe notlarla tutulmuş 1880 öncesine ait kök kütük kayıtları.</p>
              <div className={styles.treasureMeta}>
                <FileText size={12} />
                <span>14 Sayfa</span>
              </div>
            </div>
          </Card>

        </div>
      </section>

      {/* 5. ANNIVERSARY NOTICE & SPONSOR */}
      <section className={styles.bottomSection}>
        
        {/* Anniversary Notice */}
        <Card className={styles.anniversaryCard}>
          <div className={styles.anniversaryIconBox}>
            <Calendar size={22} className={styles.anniversaryIcon} />
          </div>
          <div>
            <span className={styles.anniversarySub}>YILDÖNÜMÜ ANMASI</span>
            <h4 className={styles.anniversaryTitle}>Mustafa Yılmaz&apos;ın 86. Doğum Günü</h4>
            <p className={styles.anniversaryText}>
              Aile büyüğümüz Başöğretmen Mustafa Yılmaz&apos;ı (15 Nisan 1940) saygı ve rahmetle anıyoruz.
            </p>
          </div>
        </Card>

        {/* Heritage Sponsor Banner */}
        <AdBanner 
          sponsorName="Bursa Kültür & Tarih Araştırmaları Vakfı" 
          description="Eski Osmanlı mezar taşları, vakfiyeler ve yerel şecere kütüklerinin dijitalleştirilmesinde teknik destek sağlamaktadır."
          link="https://bursa.bel.tr"
        />

      </section>

    </div>
  );
}

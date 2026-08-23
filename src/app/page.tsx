'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Card } from '@/components/ui/card';
import { PersonCard } from '@/components/person/PersonCard';
import { QuickActionMenu } from '@/components/QuickActionMenu';
import { AdBanner } from '@/components/ads/AdBanner';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'bursa' | 'istanbul' | 'izmir'>('all');

  const QUICK_PROMPTS = [
    'Dedemin kardeşlerini göster',
    'Bursa\'da yaşamış öğretmenler kimler?',
    'En yaşlı aile büyüğümüz kimdir?',
    '1970 öncesi düğün fotoğrafları'
  ];

  const PEOPLE = [
    {
      id: '1',
      name: 'Mustafa Yılmaz',
      years: '1940 - 2012',
      job: 'Başöğretmen',
      generation: '1. Kuşak (Kök)',
      relation: 'Büyük Dede',
      location: 'Bursa / Heykel',
      photoCount: 34,
      storyCount: 7,
      hasAudio: true,
      isLiving: false,
      avatarColor: 'rgba(245, 158, 11, 0.6)'
    },
    {
      id: '2',
      name: 'Ayşe Yılmaz (Demir)',
      years: '1945 - Günümüz',
      job: 'Emekli Terzi',
      generation: '1. Kuşak (Kök)',
      relation: 'Büyük Anne',
      location: 'Bursa / Çekirge',
      photoCount: 48,
      storyCount: 12,
      hasAudio: true,
      isLiving: true,
      avatarColor: 'rgba(16, 185, 129, 0.6)'
    },
    {
      id: '3',
      name: 'Ali Yılmaz',
      years: '1970 - Günümüz',
      job: 'Yüksek Mühendis',
      generation: '2. Kuşak',
      relation: 'Baba',
      location: 'İstanbul / Kadıköy',
      photoCount: 82,
      storyCount: 5,
      hasAudio: false,
      isLiving: true,
      avatarColor: 'rgba(99, 102, 241, 0.6)'
    },
    {
      id: '4',
      name: 'Zeynep Yılmaz (Kaya)',
      years: '1975 - Günümüz',
      job: 'Mimar & Tarih Araştırmacısı',
      generation: '2. Kuşak',
      relation: 'Hala',
      location: 'İzmir / Alsancak',
      photoCount: 29,
      storyCount: 9,
      hasAudio: true,
      isLiving: true,
      avatarColor: 'rgba(236, 72, 153, 0.6)'
    },
    {
      id: '5',
      name: 'Ahmet Yılmaz',
      years: '1998 - Günümüz',
      job: 'Yazılım Mühendisi',
      generation: '3. Kuşak (Torun)',
      relation: 'Siz (Profil Sahibi)',
      location: 'İstanbul',
      photoCount: 115,
      storyCount: 4,
      hasAudio: true,
      isLiving: true,
      avatarColor: 'rgba(6, 182, 212, 0.6)'
    },
    {
      id: '6',
      name: 'Elif Yılmaz',
      years: '2004 - Günümüz',
      job: 'Tıp Öğrencisi',
      generation: '3. Kuşak (Torun)',
      relation: 'Kız Kardeş',
      location: 'Ankara',
      photoCount: 42,
      storyCount: 2,
      hasAudio: false,
      isLiving: true,
      avatarColor: 'rgba(168, 85, 247, 0.6)'
    }
  ];

  const MEMORIES = [
    {
      id: 'm1',
      title: 'Bursa İpekyolu Düğünü Hatırası',
      year: '1968',
      location: 'Bursa Kapalıçarşı',
      people: ['Mustafa Yılmaz', 'Ayşe Yılmaz'],
      type: 'photo',
      badge: 'Nadir Fotoğraf'
    },
    {
      id: 'm2',
      title: 'Cumhuriyet İlkokulu Başöğretmenlik Beratı',
      year: '1974',
      location: 'Bursa Maarif Müdürlüğü',
      people: ['Mustafa Yılmaz'],
      type: 'document',
      badge: 'Resmi Belge'
    },
    {
      id: 'm3',
      title: 'Köy Kahvesinde Eski Günlerin Anlatımı (Kendi Sesinden)',
      year: '1984',
      location: 'İznik Köyü',
      people: ['Mustafa Yılmaz'],
      type: 'audio',
      badge: '🎙️ Ses Kaydı'
    },
    {
      id: 'm4',
      title: 'Kadıköy Sahilinde İlk Aile Buluşması',
      year: '1995',
      location: 'İstanbul',
      people: ['Ali Yılmaz', 'Zeynep Yılmaz'],
      type: 'photo',
      badge: 'Aile Albümü'
    }
  ];

  const filteredPeople = PEOPLE.filter(p => {
    if (selectedBranch === 'bursa') return p.location.toLowerCase().includes('bursa');
    if (selectedBranch === 'istanbul') return p.location.toLowerCase().includes('istanbul');
    if (selectedBranch === 'izmir') return p.location.toLowerCase().includes('izmir');
    if (!searchQuery) return true;
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.job && p.job.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.relation?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <main className={styles.main}>
      
      {/* Hero Showcase Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow} />
        
        <div className={styles.heroCrestPill}>
          <span>👑</span>
          <span>YILMAZ HANEDANI DİJİTAL MİRASI • 1880 - 2026</span>
        </div>

        <h1 className={styles.heroTitle}>
          Geçmişin Hatıraları, <br />
          <span className="text-gradient-brand">Yapay Zekâ ile Geleceğin Işığı.</span>
        </h1>

        <p className={styles.heroSubtitle}>
          Klasik soy ağaçlarının ötesinde; ses kayıtları, eski belgeler, fotoğraflar ve yapay zekâ asistanıyla ailenizin yaşayan dijital hafızası.
        </p>

        {/* Global Smart Search */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="İsim, lakap, meslek, şehir veya hatıra arayın (örn: 'Bursa', 'Öğretmen', 'Mustafa')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.heroSearchInput}
            />
            {searchQuery && (
              <button className={styles.clearSearch} onClick={() => setSearchQuery('')}>✕</button>
            )}
          </div>

          <div className={styles.promptChips}>
            <span className={styles.promptLabel}>Hızlı Keşfet:</span>
            {QUICK_PROMPTS.map((prompt, idx) => (
              <Link 
                key={idx} 
                href={`/ai-chat?q=${encodeURIComponent(prompt)}`}
                className={styles.promptChip}
              >
                ✨ {prompt}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick CTA Hub */}
        <div className={styles.ctaRow}>
          <Link href="/tree" className={styles.primaryCta}>
            <span>🌳</span>
            <span>İnteraktif Soy Ağacını Aç</span>
          </Link>
          <Link href="/ai-chat" className={styles.secondaryCta}>
            <span>✨</span>
            <span>Hafıza Asistanına Sor</span>
          </Link>
          <Link href="/media/upload" className={styles.outlineCta}>
            <span>📸</span>
            <span>Yeni Hatıra Yükle</span>
          </Link>
        </div>
      </section>

      {/* Live Metrics Ticker */}
      <section className={styles.metricsGrid}>
        <Card className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
            👥
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricNumber}>48 Birey</span>
            <span className={styles.metricLabel}>5 Nesil / Kuşak Kayıtlı</span>
          </div>
        </Card>

        <Card className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            📸
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricNumber}>342 Belge & Resim</span>
            <span className={styles.metricLabel}>Yüksek Çözünürlüklü Arşiv</span>
          </div>
        </Card>

        <Card className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc' }}>
            🎙️
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricNumber}>18 Ses Kaydı</span>
            <span className={styles.metricLabel}>Büyüklerin Kendi Sesinden</span>
          </div>
        </Card>

        <Card className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            💎
          </div>
          <div className={styles.metricInfo}>
            <span className={styles.metricNumber}>2,550 Kredi</span>
            <span className={styles.metricLabel}>Aile Ortak Kasası Aktif</span>
          </div>
        </Card>
      </section>

      {/* Main Grid Content */}
      <div className={styles.gridContainer}>
        
        {/* Left Sidebar: AI Widget, Quick Actions, Anniversaries */}
        <aside className={styles.sidebar}>
          
          {/* AI Memory Assistant Spotlight */}
          <Link href="/ai-chat" className={styles.aiWidgetLink}>
            <Card className={styles.aiSpotlightCard} hoverable>
              <div className={styles.aiBadgeHeader}>
                <span className={styles.aiBadge}>✨ GEMINI 2.5 DESTEKLİ</span>
                <span className={styles.aiLivePulse} />
              </div>
              <h3 className={styles.aiWidgetTitle}>Soy Ağacı Yapay Zekâsı</h3>
              <p className={styles.aiWidgetDesc}>
                &quot;Dedem Mustafa Yılmaz hangi okullarda öğretmenlik yaptı?&quot; gibi sorular sorun, tüm aile arşivinden anında cevap alın.
              </p>
              <div className={styles.aiWidgetFooter}>
                <span>Sohbete Başla →</span>
              </div>
            </Card>
          </Link>

          {/* Quick Action Dock */}
          <QuickActionMenu />

          {/* Tarihte Bugün / Yıldönümleri */}
          <Card className={styles.anniversaryCard}>
            <div className={styles.cardHeaderSmall}>
              <span className={styles.headerIcon}>🎂</span>
              <h4 className={styles.headerTitleSmall}>Tarihte Bu Ay & Yıldönümleri</h4>
            </div>

            <div className={styles.anniversaryList}>
              <div className={styles.anniversaryItem}>
                <div className={styles.anniversaryAvatar}>M</div>
                <div className={styles.anniversaryInfo}>
                  <strong>Mustafa Yılmaz</strong>
                  <span>86. Doğum Yıldönümü (15 Nisan 1940)</span>
                </div>
                <span className={styles.anniversaryTag}>Mazi</span>
              </div>

              <div className={styles.anniversaryItem}>
                <div className={styles.anniversaryAvatar} style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>A</div>
                <div className={styles.anniversaryInfo}>
                  <strong>Ali & Ayşe Yılmaz</strong>
                  <span>Evlilik Yıldönümü (12 Mayıs 1968)</span>
                </div>
                <span className={styles.anniversaryTag} style={{ color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)' }}>58. Yıl</span>
              </div>
            </div>
          </Card>

          {/* Aile Kütük Güvencesi */}
          <Card className={styles.securityBox}>
            <span className={styles.securityShield}>🛡️</span>
            <div>
              <strong>Uçtan Uca Şifreli Miras</strong>
              <p>Aile kayıtlarınız sadece izin verdiğiniz akrabalarınız ve onaylı yöneticiler tarafından görülebilir.</p>
            </div>
          </Card>

        </aside>

        {/* Right Main Content Area */}
        <section className={styles.content}>
          
          {/* Section: Aile Bireyleri */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Kayıtlı Aile Bireyleri</h2>
                <p className={styles.sectionSubtitle}>Nesilden nesile aktarılan köklerimiz ve yaşayan fertlerimiz</p>
              </div>

              {/* Branch Filter Tabs */}
              <div className={styles.branchTabs}>
                <button 
                  className={`${styles.branchTab} ${selectedBranch === 'all' ? styles.branchActive : ''}`}
                  onClick={() => setSelectedBranch('all')}
                >
                  Tümü (6)
                </button>
                <button 
                  className={`${styles.branchTab} ${selectedBranch === 'bursa' ? styles.branchActive : ''}`}
                  onClick={() => setSelectedBranch('bursa')}
                >
                  Bursa Kökü
                </button>
                <button 
                  className={`${styles.branchTab} ${selectedBranch === 'istanbul' ? styles.branchActive : ''}`}
                  onClick={() => setSelectedBranch('istanbul')}
                >
                  İstanbul Kolu
                </button>
                <button 
                  className={`${styles.branchTab} ${selectedBranch === 'izmir' ? styles.branchActive : ''}`}
                  onClick={() => setSelectedBranch('izmir')}
                >
                  İzmir Kolu
                </button>
              </div>
            </div>

            {/* People Grid */}
            <div className={styles.personGrid}>
              {filteredPeople.map((person) => (
                <PersonCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  years={person.years}
                  job={person.job}
                  generation={person.generation}
                  relation={person.relation}
                  location={person.location}
                  photoCount={person.photoCount}
                  storyCount={person.storyCount}
                  hasAudio={person.hasAudio}
                  isLiving={person.isLiving}
                  avatarColor={person.avatarColor}
                />
              ))}
            </div>

            <div className={styles.treeBannerBanner}>
              <div className={styles.treeBannerText}>
                <h3>🌳 Sonsuz Tuvalde Soy Ağacı Haritası</h3>
                <p>Tüm aile dallarını interaktif 3D düzlemde fare ve parmak hareketleriyle yaklaştırıp uzaklaştırarak keşfedin.</p>
              </div>
              <Link href="/tree" className={styles.treeBannerBtn}>
                Haritaya Git →
              </Link>
            </div>
          </div>

          {/* Section: Son Eklenen Fotoğraflar & Belgeler */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>Son Eklenen Aile Hazineleri</h2>
                <p className={styles.sectionSubtitle}>Dijital ortama aktarılan fotoğraflar, tapular, diplomalar ve ses hatıraları</p>
              </div>
              <Link href="/media/upload" className={styles.addMediaLink}>+ Medya Yükle</Link>
            </div>

            <div className={styles.memoryGrid}>
              {MEMORIES.map((memory) => (
                <Card key={memory.id} className={styles.memoryCard} hoverable>
                  <div className={styles.memoryThumb}>
                    <div className={styles.memoryTypeIcon}>
                      {memory.type === 'photo' ? '🖼️' : memory.type === 'document' ? '📜' : '🎙️'}
                    </div>
                    <span className={styles.memoryBadge}>{memory.badge}</span>
                  </div>
                  <div className={styles.memoryBody}>
                    <div className={styles.memoryMeta}>
                      <span className={styles.memoryYear}>🗓️ {memory.year}</span>
                      <span className={styles.memoryLoc}>📍 {memory.location}</span>
                    </div>
                    <h4 className={styles.memoryTitle}>{memory.title}</h4>
                    <div className={styles.memoryTags}>
                      {memory.people.map((p, i) => (
                        <span key={i} className={styles.memoryPersonTag}>👤 {p}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sponsor & Kültür Mirası Köşesi (Reklamlar sadece genel alanlarda) */}
          <AdBanner 
            sponsorName="Tarih & Kültür Vakfı Arşiv Projesi"
            description="Eski Osmanlıca tapu, nüfus kayıtları ve aile belgelerinizi yapay zekâ destekli transkripsiyon ile Türkçe'ye çevirin."
            link="https://www.google.com"
          />

        </section>
      </div>

    </main>
  );
}

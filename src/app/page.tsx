'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { PersonCard } from '@/components/person/PersonCard';
import { AdBanner } from '@/components/ads/AdBanner';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { getPersons, PersonRecord, SEED_PERSONS } from '@/lib/services/personService';
import { getCurrentUser, UserProfile } from '@/lib/services/authService';
import { GooglePreferredSourceButton } from '@/components/seo/GooglePreferredSource';
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
  MapPin,
  GitGraph,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const FAMILY_BRANCHES = [
  { id: 'all', label: 'Tüm Aile' },
  { id: 'bursa', label: 'Bursa Kökü (1. & 2. Kuşak)' },
  { id: 'istanbul', label: 'İstanbul Kolu (3. Kuşak)' },
  { id: 'izmir', label: 'İzmir Kolu' },
];

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      return getCurrentUser();
    }
    return null;
  });
  const [persons, setPersons] = useState<PersonRecord[]>(SEED_PERSONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');

  useEffect(() => {
    getPersons().then(data => {
      if (data && data.length > 0) {
        setPersons(data);
      }
    });

    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredPersons = persons.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.birthPlace.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || p.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const familyDisplayName = currentUser?.familyName || 'Yılmaz Ailesi';

  // ==========================================
  // 1. PUBLIC LANDING PAGE (NOT LOGGED IN)
  // ==========================================
  if (!currentUser) {
    return (
      <div className={styles.landingContainer}>
        
        {/* Landing Hero */}
        <section className={styles.landingHero}>
          <div className={styles.landingHeroInner}>
            
            <div className={styles.landingBadge}>
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>YENİ NESİL DİJİTAL ŞECERE & AİLE ARŞİVİ</span>
            </div>

            <h1 className={styles.landingHeadline}>
              Ailenizin 100 Yıllık Mirasını ve Şeceresini Ölümsüzleştirin.
            </h1>

            <p className={styles.landingSubhead}>
              Eski fotoğrafları, ses kayıtlarını, berat ve hatıraları yapay zekâ destekli soyağacınızda bir araya getirin. Gelecek nesillere silinmez bir aile hafızası bırakın.
            </p>

            <div className={styles.landingCtaRow}>
              <Link href="/register" className={styles.primaryCtaBtn}>
                <span>Ücretsiz Soyağacı Oluştur</span>
                <ArrowRight size={16} />
              </Link>
              <Link href="/login" className={styles.secondaryCtaBtn}>
                <span>Canlı Demoyu İncele (Demo Hesaplar)</span>
              </Link>
            </div>

            <div className={styles.landingTrustTags}>
              <span><CheckCircle2 size={13} /> Sınırsız Akraba & Kuşak</span>
              <span><CheckCircle2 size={13} /> Dayı, Amca, Hala, Kuzen Desteği</span>
              <span><CheckCircle2 size={13} /> Kapalı Devre & Şifreli Alan</span>
            </div>

          </div>
        </section>

        {/* Feature Grid */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.kickerText}>ÖZELLİKLER</span>
            <h2 className={styles.featuresTitle}>Klasik soyağaçlarının ötesinde yaşayan bir arşiv</h2>
            <p className={styles.featuresSub}>Ailenizin tüm fertleri için ortak ve güvenli bir hafıza alanı.</p>
          </div>

          <div className={styles.featuresGrid}>
            
            <Card className={styles.featureCard}>
              <div className={styles.featureIconBox}>
                <GitGraph size={22} />
              </div>
              <h3 className={styles.featureHeading}>20+ Akrabalık Bağı</h3>
              <p className={styles.featureDesc}>
                Sadece anne/baba değil; dayı, teyze, amca, hala, kuzen, torun ve tüm büyüklerinizi birbirine bağlayan interaktif şecere şeması.
              </p>
            </Card>

            <Card className={styles.featureCard}>
              <div className={styles.featureIconBox}>
                <Sparkles size={22} />
              </div>
              <h3 className={styles.featureHeading}>Yapay Zekâ Hafıza Asistanı</h3>
              <p className={styles.featureDesc}>
                Arşiv belgelerinizi tarayan Gemini AI ile &ldquo;Dedemin ilk görev yeri neresiydi?&rdquo; gibi sorularınıza saniyeler içinde cevap alın.
              </p>
            </Card>

            <Card className={styles.featureCard}>
              <div className={styles.featureIconBox}>
                <Mic size={22} />
              </div>
              <h3 className={styles.featureHeading}>Nostaljik Ses & Medya Kasası</h3>
              <p className={styles.featureDesc}>
                Büyüklerinizin ses kayıtlarını, eski kasetleri ve düğün albümlerini yüksek çözünürlükle dijitalleştirip saklayın.
              </p>
            </Card>

            <Card className={styles.featureCard}>
              <div className={styles.featureIconBox}>
                <ShieldCheck size={22} />
              </div>
              <h3 className={styles.featureHeading}>Kapalı Devre Aile Alanı</h3>
              <p className={styles.featureDesc}>
                Tüm veriler sadece sizin ve davet ettiğiniz akrabalarınızın görebileceği şifreli aile kasasında korunur.
              </p>
            </Card>

          </div>
        </section>

        {/* Google Preferred Source Promotion Banner */}
        <section style={{ maxWidth: '840px', margin: '0 auto 40px auto' }}>
          <GooglePreferredSourceButton 
            variant="card"
            title="Google Arama & Keşfet’te Şecere’yi Tercih Edin"
            description="Google Arama, Keşfet (Discover) ve Gemini AI Overviews yapay zekâ yanıtlarında şecere araştırmaları ve arşiv rehberlerinde Şecere.app’i öncelikli kaynak olarak kaydedin."
          />
        </section>

        {/* 3 Step Onboarding */}
        <section className={styles.stepsSection}>
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.kickerText}>3 ADIMDA BAŞLAYIN</span>
            <h2 className={styles.featuresTitle}>Dakikalar içinde ailenizin soyağacını kurun</h2>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>1</div>
              <h4>Ailenizi Adlandırın</h4>
              <p>Hesabınızı açın ve ailenizin adını (Örn: Kaya Ailesi) belirleyin.</p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>2</div>
              <h4>Akrabaları Ekleyin</h4>
              <p>Büyüklerinizden torunlara kadar tüm akrabalarınızı ağaca yerleştirin.</p>
            </div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>3</div>
              <h4>Hatıraları Yükleyin</h4>
              <p>Eski fotoğrafları ve ses kayıtlarını yükleyip ailenizle paylaşın.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/register" className={styles.primaryCtaBtn}>
              <span>Hemen Başlayın — Ücretsizdir</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    );
  }

  // ==========================================
  // 2. LOGGED IN FAMILY DASHBOARD
  // ==========================================
  return (
    <div className={styles.container}>
      
      {/* Editorial Dashboard Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          
          <div className={styles.kicker}>
            <span className={styles.kickerLine} />
            <span className={styles.kickerText}>{familyDisplayName.toUpperCase()} ARŞİVİ</span>
            <span className={styles.kickerLine} />
          </div>

          <h1 className={styles.heroHeadline}>
            Geçmişin hatırası, geleceğin mirası.
          </h1>

          <p className={styles.heroSubhead}>
            {familyDisplayName} soy kütüğü, fotoğraflar, ses kayıtları ve hatıra belgeleri tek çatı altında muhafaza edilmektedir.
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
              <Link href={`/ai-chat?q=${encodeURIComponent('Ailemizin kökleri ve eski adresleri nelerdir?')}`} className={styles.aiChip}>
                Kökler ve eski adresler
              </Link>
              <Link href={`/ai-chat?q=${encodeURIComponent('Ailedeki en eski ses kaydı kime ait?')}`} className={styles.aiChip}>
                Tarihi ses kayıtları
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Stats & Metrics */}
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
            <div className={styles.metricValue}>{currentUser.credits.toLocaleString('tr-TR')}</div>
            <div className={styles.metricFooter}>Ortak restorasyon fonu</div>
          </Card>

        </div>
      </section>

      {/* Branch Filter & Roster */}
      <section className={styles.rosterSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Aile Kütüğü ({familyDisplayName})</h2>
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

      {/* Highlights & Archive Treasures */}
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
          
          <Card className={styles.treasureCard} hoverable>
            <div className={styles.treasureMedia}>
              <div className={styles.treasurePlaceholder}>
                <span className={styles.treasureYear}>1968</span>
              </div>
            </div>
            <div className={styles.treasureInfo}>
              <span className={styles.treasureTag}>Fotoğraf Albümü</span>
              <h4 className={styles.treasureTitle}>Nikah Töreni Hatırası</h4>
              <p className={styles.treasureDesc}>Orijinal siyah-beyaz analog nikah hatırası.</p>
              <div className={styles.treasureMeta}>
                <MapPin size={12} />
                <span>Bursa / Çekirge</span>
              </div>
            </div>
          </Card>

          <Card className={styles.treasureCard} hoverable>
            <div className={styles.treasureMedia}>
              <div className={styles.treasurePlaceholder}>
                <span className={styles.treasureYear}>1984</span>
              </div>
            </div>
            <div className={styles.treasureInfo}>
              <span className={styles.treasureTag}>Ses Arşivi</span>
              <h4 className={styles.treasureTitle}>Köy Günleri ve Maarif Hatıraları</h4>
              <p className={styles.treasureDesc}>İlk tayin yıllarını ve öğretmenlik anılarını anlatan ses kaydı.</p>
              <div className={styles.treasureMeta}>
                <Mic size={12} />
                <span>4 dk 12 sn</span>
              </div>
            </div>
          </Card>

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

      {/* Bottom Section */}
      <section className={styles.bottomSection}>
        <Card className={styles.anniversaryCard}>
          <div className={styles.anniversaryIconBox}>
            <Calendar size={22} className={styles.anniversaryIcon} />
          </div>
          <div>
            <span className={styles.anniversarySub}>YILDÖNÜMÜ ANMASI</span>
            <h4 className={styles.anniversaryTitle}>Mustafa Yılmaz&apos;ın 86. Doğum Günü</h4>
            <p className={styles.anniversaryText}>
              Aile büyüğümüz Başöğretmen Mustafa Yılmaz&apos;ı saygı ve rahmetle anıyoruz.
            </p>
          </div>
        </Card>

        <AdBanner 
          sponsorName="Kültür & Tarih Araştırmaları Vakfı" 
          description="Eski mezar taşları, vakfiyeler ve yerel şecere kütüklerinin dijitalleştirilmesinde teknik destek sağlamaktadır."
          link="https://bursa.bel.tr"
        />
      </section>

    </div>
  );
}

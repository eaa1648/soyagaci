'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const TABS = [
  { id: 'genel', label: '📌 Genel Bilgiler' },
  { id: 'zaman', label: '⏳ Hayat Çizgisi (Zaman Tüneli)' },
  { id: 'aile', label: '👨‍👩‍👧‍👦 Aile & Soy Bağı' },
  { id: 'fotograflar', label: '📸 Fotoğraf & Belge Arşivi' },
  { id: 'ses', label: '🎙️ Ses & Video Kayıtları' },
  { id: 'anilar', label: '📖 Aile Hatıraları & Hikâyeler' },
  { id: 'harita', label: '🗺️ Yaşam Haritası & Göç' },
];

const PEOPLE_DATABASE: Record<string, {
  id: string;
  name: string;
  title: string;
  years: string;
  job: string;
  birthPlace: string;
  deathPlace?: string;
  cemetery?: string;
  bloodType: string;
  nickname: string;
  generation: string;
  isLiving: boolean;
  biography: string;
  milestones: { year: string; title: string; desc: string; tag: string }[];
  relatives: { id: string; name: string; relation: string; years: string; badge: string }[];
  photos: { id: string; title: string; year: string; category: string }[];
  stories: { id: string; author: string; date: string; title: string; text: string }[];
  audioTitle: string;
  audioDuration: string;
}> = {
  '1': {
    id: '1',
    name: 'Mustafa Yılmaz',
    title: 'Cumhuriyet Başöğretmeni • Yılmaz Ailesi 1. Kuşak Kök Büyüğü',
    years: '15 Nisan 1940 — 22 Ağustos 2012 (72 Yaşında Vefat Etti)',
    job: 'Başöğretmen & Eğitimci',
    birthPlace: 'Bursa / Heykel',
    deathPlace: 'İstanbul / Kadıköy',
    cemetery: 'Bursa Emir Sultan Mezarlığı (Ada: 14, Parsel: 8)',
    bloodType: 'A Rh (+)',
    nickname: 'Hoca Mustafa',
    generation: '1. Kuşak (Kök)',
    isLiving: false,
    biography: `1940 yılında Bursa Heykel semtinde doğan Mustafa Yılmaz, Bursa Erkek Lisesi ve ardından Çapa Yüksek Öğretmen Okulu'ndan mezun olmuştur. 35 yılı aşkın bir süre boyunca Bursa ve çevre illerde binlerce öğrenci yetiştirmiş, Cumhuriyet İlkokulu müdürlüğü yapmıştır. Ailenin ilk fotoğraf arşivini kuran ve eski soyağacı şeceresini el yazısıyla deftere döken aile büyüğümüzdür.`,
    milestones: [
      { year: '1940', title: 'Dünyaya Geliş', desc: 'Bursa Heykel semtinde aile konağında doğdu.', tag: 'Doğum' },
      { year: '1958', title: 'Çapa Öğretmen Okulu', desc: 'İstanbul Çapa Yüksek Öğretmen Okulu Tarih-Coğrafya bölümünü birincilikle bitirdi.', tag: 'Eğitim' },
      { year: '1962', title: 'İlk Görev Yeri & Askerlik', desc: 'Erzurum Aşkale ilçesinde yedek subay öğretmen olarak vatani görevini tamamladı.', tag: 'Meslek' },
      { year: '1968', title: 'Ayşe Hanım ile Evlilik', desc: 'Bursa Kapalıçarşı eşrafından terzi Ayşe Demir ile hayatını birleştirdi.', tag: 'Evlilik' },
      { year: '1970', title: 'İlk Evlat: Ali Yılmaz', desc: 'İlk çocuğu Ali Yılmaz dünyaya geldi.', tag: 'Aile' },
      { year: '1988', title: 'Başöğretmenlik ve Emeklilik', desc: 'Cumhuriyet İlkokulu müdürlüğünden takdirname ile emekliye ayrıldı.', tag: 'Kariyer' },
      { year: '2012', title: 'Aramızdan Ayrılış', desc: 'İstanbul Kadıköy\'de huzur içinde vefat etti, Bursa Emir Sultan Mezarlığı\'na defnedildi.', tag: 'Vefat' },
    ],
    relatives: [
      { id: '2', name: 'Ayşe Yılmaz (Demir)', relation: 'Eşi (Hayat Arkadaşı)', years: '1945 - Günümüz', badge: '1. Kuşak' },
      { id: '3', name: 'Ali Yılmaz', relation: 'Oğlu', years: '1970 - Günümüz', badge: '2. Kuşak' },
      { id: '4', name: 'Zeynep Yılmaz (Kaya)', relation: 'Kızı', years: '1975 - Günümüz', badge: '2. Kuşak' },
      { id: '5', name: 'Ahmet Yılmaz', relation: 'Torunu (Profil Sahibi)', years: '1998 - Günümüz', badge: '3. Kuşak' },
      { id: '6', name: 'Elif Yılmaz', relation: 'Torunu', years: '2004 - Günümüz', badge: '3. Kuşak' },
    ],
    photos: [
      { id: 'p1', title: '1968 Düğün Günü Hatırası', year: '1968', category: 'Düğün Albümü' },
      { id: 'p2', title: 'Cumhuriyet İlkokulu Öğretmenler Kurulu', year: '1976', category: 'Meslek & Okul' },
      { id: 'p3', title: 'Uludağ Aile Pikniği', year: '1982', category: 'Aile Gezisi' },
      { id: 'p4', title: 'Osmanlıca Aile Şecere Defteri (El Yazısı)', year: '1955', category: 'Tarihi Belge' },
      { id: 'p5', title: 'Öğretmenlik Takdirname Beratı', year: '1985', category: 'Resmi Belge' },
      { id: 'p6', title: 'Torunları Ahmet ve Elif ile Bayramlaşma', year: '2006', category: 'Bayram Hatırası' },
    ],
    stories: [
      {
        id: 's1',
        author: 'Ali Yılmaz (Oğlu)',
        date: '14 Mayıs 2024',
        title: 'Babamın Eski Ahşap Çantası ve Kitap Sevgisi',
        text: `Babam her akşam okuldan eve dönerken deri çantasında mutlaka yeni bir kitap veya gazete getirirdi. Bize her akşam sofrada Osmanlı ve Cumhuriyet tarihi hikayeleri anlatır, 'Kökünü bilmeyen ağacın meyvesi tatlı olmaz' derdi.`
      },
      {
        id: 's2',
        author: 'Ahmet Yılmaz (Torunu)',
        date: '22 Ağustos 2025',
        title: 'Dedemle Kapalıçarşı Sahaf Gezilerimiz',
        text: `Küçükken beni elimden tutar, Bursa Sahaflar Çarşısı'na götürürdü. Eski kitapların kokusunu bana sevdiren insan dedem Mustafa Yılmaz'dır. Mekânı cennet olsun.`
      }
    ],
    audioTitle: "Mustafa Dede'nin Kendi Sesinden: Köy Günleri ve İlk Öğretmenlik Yılları (1984 Kaydı)",
    audioDuration: '4 dk 12 sn'
  },
  '2': {
    id: '2',
    name: 'Ayşe Yılmaz (Demir)',
    title: 'Geleneksel İpek Nakış & Terzi Ustası • Aile Büyüğü',
    years: '12 Haziran 1945 — Günümüz (81 Yaşında)',
    job: 'Emekli Terzi & El Sanatları',
    birthPlace: 'Bursa / Çekirge',
    bloodType: '0 Rh (+)',
    nickname: 'Ayşe Hanım Teyze',
    generation: '1. Kuşak (Kök)',
    isLiving: true,
    biography: `Bursa Çekirge'de köklü bir ailede dünyaya gelen Ayşe Hanım, gençliğinde İpek Han'da ipek dokuma ve geleneksel Türk nakış sanatı icra etmiştir. Ailenin en zengin yemek tarifleri ve masal anlatıcısıdır. Halen Bursa'da ikamet etmektedir.`,
    milestones: [
      { year: '1945', title: 'Dünyaya Geliş', desc: 'Bursa Çekirge semtinde doğdu.', tag: 'Doğum' },
      { year: '1968', title: 'Mustafa Bey ile İzdivaç', desc: 'Öğretmen Mustafa Yılmaz ile dünya evine girdi.', tag: 'Evlilik' },
      { year: '1975', title: 'İkinci Evlat: Zeynep', desc: 'Kızı Zeynep Yılmaz dünyaya geldi.', tag: 'Aile' },
      { year: '2024', title: 'Torunlarının Mezuniyeti', desc: 'Bursa aile konağında torunlarıyla 80. yaş gününü kutladı.', tag: 'Kutlama' },
    ],
    relatives: [
      { id: '1', name: 'Mustafa Yılmaz', relation: 'Eşi (Rahmetli)', years: '1940 - 2012', badge: '1. Kuşak' },
      { id: '3', name: 'Ali Yılmaz', relation: 'Oğlu', years: '1970 - Günümüz', badge: '2. Kuşak' },
      { id: '4', name: 'Zeynep Yılmaz (Kaya)', relation: 'Kızı', years: '1975 - Günümüz', badge: '2. Kuşak' },
    ],
    photos: [
      { id: 'p1', title: '1968 Nikah Fotoğrafı', year: '1968', category: 'Düğün' },
      { id: 'p2', title: 'İpek Dokuma Tezgahı Başında', year: '1964', category: 'Meslek' },
    ],
    stories: [
      {
        id: 's1',
        author: 'Zeynep Yılmaz (Kızı)',
        date: '2025',
        title: 'Annemin Bayram Baklavaları',
        text: 'Her bayram arifesinde tüm mahalleye ve aileye kendi elleriyle 40 kat incecik yufka açarak baklava yapardı.'
      }
    ],
    audioTitle: 'Ayşe Hanım Masalları ve Eski Bursa Anlatımı (2002 Kaydı)',
    audioDuration: '6 dk 40 sn'
  },
  '3': {
    id: '3',
    name: 'Ali Yılmaz',
    title: 'Yüksek Mühendis • Yılmaz Ailesi 2. Kuşak Temsilcisi',
    years: '10 Mart 1970 — Günümüz (56 Yaşında)',
    job: 'Yüksek İnşaat Mühendisi',
    birthPlace: 'Bursa',
    bloodType: 'A Rh (+)',
    nickname: 'Mühendis Ali',
    generation: '2. Kuşak',
    isLiving: true,
    biography: `İTÜ İnşaat Mühendisliği mezunu olan Ali Yılmaz, Türkiye genelinde birçok köprü ve altyapı projesinde yöneticilik yapmıştır. İstanbul Kadıköy'de ikamet etmekte ve aile arşivinin dijitalleşme çalışmalarını desteklemektedir.`,
    milestones: [
      { year: '1970', title: 'Doğum', desc: 'Bursa Muradiye Doğumevi\'nde dünyaya geldi.', tag: 'Doğum' },
      { year: '1992', title: 'İTÜ Mezuniyeti', desc: 'İstanbul Teknik Üniversitesi İnşaat Fakültesi\'ni tamamladı.', tag: 'Eğitim' },
      { year: '1998', title: 'Ahmet\'in Doğumu', desc: 'Oğlu Ahmet Yılmaz dünyaya geldi.', tag: 'Aile' },
    ],
    relatives: [
      { id: '1', name: 'Mustafa Yılmaz', relation: 'Babası', years: '1940 - 2012', badge: '1. Kuşak' },
      { id: '2', name: 'Ayşe Yılmaz', relation: 'Annesi', years: '1945 - Günümüz', badge: '1. Kuşak' },
      { id: '5', name: 'Ahmet Yılmaz', relation: 'Oğlu', years: '1998 - Günümüz', badge: '3. Kuşak' },
      { id: '6', name: 'Elif Yılmaz', relation: 'Kızı', years: '2004 - Günümüz', badge: '3. Kuşak' },
    ],
    photos: [
      { id: 'p1', title: 'İTÜ Mezuniyet Töreni', year: '1992', category: 'Eğitim' },
      { id: 'p2', title: 'Köprü Şantiyesi Başında', year: '2005', category: 'Kariyer' },
    ],
    stories: [
      {
        id: 's1',
        author: 'Ahmet Yılmaz',
        date: '2026',
        title: 'Babamın İlk Bilgisayarı Alması',
        text: '1998 yılında eve ilk Pentium bilgisayarı getirdiğinde tüm aile ağacını dijitalde tutma hayali o gün başlamıştı.'
      }
    ],
    audioTitle: 'Ali Yılmaz - Mühendislik Anıları ve İlk Projeler (2018 Kaydı)',
    audioDuration: '5 dk 10 sn'
  }
};

export default function PersonProfilePage() {
  const params = useParams();
  const id = (params?.id as string) || '1';
  const person = PEOPLE_DATABASE[id] || PEOPLE_DATABASE['1'];

  const [activeTab, setActiveTab] = useState('genel');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [stories, setStories] = useState(person.stories);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStoryText, setNewStoryText] = useState('');
  const [newStoryAuthor, setNewStoryAuthor] = useState('Ahmet Yılmaz');

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryTitle || !newStoryText) return;
    const newStory = {
      id: `story-${Date.now()}`,
      author: newStoryAuthor,
      date: 'Bugün',
      title: newStoryTitle,
      text: newStoryText
    };
    setStories(prev => [newStory, ...prev]);
    setShowStoryModal(false);
    setNewStoryTitle('');
    setNewStoryText('');
  };

  return (
    <div className={styles.container}>
      
      {/* Top Banner & Header Card */}
      <Card className={styles.heroProfileCard}>
        <div className={styles.coverAtmosphere} />
        
        <div className={styles.profileHeaderContent}>
          <div className={styles.portraitWrapper}>
            <div className={styles.avatarLetter}>{person.name.charAt(0)}</div>
            <span className={styles.deceasedBadge}>
              {person.isLiving ? '🟢 Yaşıyor' : '🕊️ Mazi'}
            </span>
          </div>

          <div className={styles.profileMainInfo}>
            <div className={styles.pillRow}>
              <span className={styles.genPill}>{person.generation}</span>
              <span className={styles.badgeGold}>👑 {person.job}</span>
              <span className={styles.badgeBlood}>🩸 {person.bloodType}</span>
            </div>

            <h1 className={styles.profileName}>{person.name}</h1>
            <p className={styles.profileTitle}>{person.title}</p>
            
            <div className={styles.yearsRow}>
              <span>🗓️ {person.years}</span>
              <span>📍 {person.birthPlace}</span>
            </div>
          </div>

          <div className={styles.headerActions}>
            <Link href="/tree" className={styles.treeViewBtn}>
              🌳 Ağaçta Göster
            </Link>
            <Link href={`/ai-chat?q=${encodeURIComponent(`${person.name} hakkında tüm bilgileri özetle`)}`} className={styles.aiAskBtn}>
              ✨ Yapay Zekâya Sor
            </Link>
          </div>
        </div>

        {/* Audio Memory Teaser Bar */}
        <div className={styles.audioMemoryBar}>
          <div className={styles.audioIconBox}>
            <span>🎙️</span>
          </div>
          <div className={styles.audioText}>
            <strong>{person.audioTitle}</strong>
            <span>Teyp Kasetinden Dijitalleştirilmiş Özgün Ses Kaydı • {person.audioDuration}</span>
          </div>
          <button 
            className={styles.audioPlayBtn}
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          >
            {isPlayingAudio ? '⏸️ Duraklat' : '▶️ Sesini Dinle'}
          </button>
        </div>
      </Card>

      {/* Main Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className={styles.tabContentArea}>
        
        {/* 1. GENEL BİLGİLER */}
        {activeTab === 'genel' && (
          <div className={styles.tabGrid}>
            <Card className={styles.bioCard}>
              <h3 className={styles.contentTitle}>📖 Hayat Özeti & Biyografi</h3>
              <p className={styles.bioText}>{person.biography}</p>
              
              <div className={styles.quoteBox}>
                <em>&ldquo;Kökünü bilmeyen ağacın meyvesi tatlı olmaz. Ailenizin hatıralarını saklayın.&rdquo;</em>
                <span>— {person.name}</span>
              </div>
            </Card>

            <Card className={styles.detailsCard}>
              <h3 className={styles.contentTitle}>📋 Nüfus & Kimlik Detayları</h3>
              <ul className={styles.detailsList}>
                <li><strong>Adı Soyadı:</strong> {person.name}</li>
                <li><strong>Lakap:</strong> {person.nickname}</li>
                <li><strong>Meslek:</strong> {person.job}</li>
                <li><strong>Doğum Yeri:</strong> {person.birthPlace}</li>
                {person.deathPlace && <li><strong>Vefat Yeri:</strong> {person.deathPlace}</li>}
                {person.cemetery && <li><strong>Kabir / Mezar:</strong> {person.cemetery}</li>}
                <li><strong>Kan Grubu:</strong> {person.bloodType}</li>
                <li><strong>Arşivdeki Belge Sayısı:</strong> {person.photos.length} Fotoğraf & Belge</li>
              </ul>
            </Card>
          </div>
        )}

        {/* 2. HAYAT ÇİZGİSİ (ZAMAN TÜNELİ) */}
        {activeTab === 'zaman' && (
          <Card className={styles.timelineCard}>
            <h3 className={styles.contentTitle}>⏳ Kronolojik Hayat Yolculuğu</h3>
            <div className={styles.timelineList}>
              {person.milestones.map((m, idx) => (
                <div key={idx} className={styles.timelineItem}>
                  <div className={styles.timelineYearBadge}>{m.year}</div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineHeader}>
                      <h4>{m.title}</h4>
                      <span className={styles.timelineTag}>{m.tag}</span>
                    </div>
                    <p>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* 3. AİLE & SOY BAĞI */}
        {activeTab === 'aile' && (
          <div className={styles.relativesContainer}>
            <h3 className={styles.contentTitle}>👨‍👩‍👧‍👦 Bağlı Olduğu Aile Fertleri</h3>
            <div className={styles.relativesGrid}>
              {person.relatives.map(rel => (
                <Card key={rel.id} className={styles.relativeCard} hoverable>
                  <div className={styles.relativeAvatar}>{rel.name.charAt(0)}</div>
                  <div className={styles.relativeInfo}>
                    <h4>{rel.name}</h4>
                    <span className={styles.relRelation}>{rel.relation}</span>
                    <span className={styles.relYears}>🗓️ {rel.years}</span>
                  </div>
                  <Link href={`/person/${rel.id}`} className={styles.relLink}>Profili Aç →</Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 4. FOTOĞRAF & BELGELER */}
        {activeTab === 'fotograflar' && (
          <div>
            <div className={styles.galleryHeader}>
              <h3 className={styles.contentTitle}>📸 Fotoğraf ve Tarihi Belge Koleksiyonu ({person.photos.length})</h3>
              <Link href="/media/upload" className={styles.addPhotoBtn}>+ Yeni Fotoğraf Yükle</Link>
            </div>
            <div className={styles.galleryGrid}>
              {person.photos.map(p => (
                <Card key={p.id} className={styles.photoItemCard} hoverable>
                  <div className={styles.photoThumbnail}>
                    <span className={styles.photoIcon}>🖼️</span>
                    <span className={styles.photoYearBadge}>{p.year}</span>
                  </div>
                  <div className={styles.photoInfo}>
                    <h4>{p.title}</h4>
                    <span className={styles.photoCat}>{p.category}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 5. SES & VİDEO */}
        {activeTab === 'ses' && (
          <Card className={styles.mediaCard}>
            <h3 className={styles.contentTitle}>🎙️ Ses Kayıtları ve Hatıra Videoları</h3>
            <div className={styles.audioPlayerBox}>
              <div className={styles.waveformSimulation}>
                <span style={{ height: '40%' }} /><span style={{ height: '80%' }} /><span style={{ height: '60%' }} />
                <span style={{ height: '100%' }} /><span style={{ height: '70%' }} /><span style={{ height: '90%' }} />
                <span style={{ height: '30%' }} /><span style={{ height: '50%' }} /><span style={{ height: '75%' }} />
              </div>
              <div className={styles.audioPlayerInfo}>
                <h4>{person.audioTitle}</h4>
                <p>Orijinal Manyetik Teyp Kaydı • Süre: {person.audioDuration}</p>
                <div className={styles.audioControls}>
                  <button className={styles.controlPlayBtn}>▶️ Başlat / Duraklat</button>
                  <span className={styles.timeTag}>01:24 / {person.audioDuration}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 6. AİLE HATIRALARI & HİKAYELER */}
        {activeTab === 'anilar' && (
          <div className={styles.storiesContainer}>
            <div className={styles.galleryHeader}>
              <h3 className={styles.contentTitle}>📖 Aile Üyelerinden Hatıralar ({stories.length})</h3>
              <Button variant="primary" onClick={() => setShowStoryModal(true)}>+ Kendi Anını Yaz</Button>
            </div>
            <div className={styles.storiesList}>
              {stories.map(s => (
                <Card key={s.id} className={styles.storyCard}>
                  <div className={styles.storyHeader}>
                    <div>
                      <h4 className={styles.storyTitle}>{s.title}</h4>
                      <span className={styles.storyAuthor}>✍️ {s.author} • {s.date}</span>
                    </div>
                    <span className={styles.storyHeart}>❤️ 14 Beğeni</span>
                  </div>
                  <p className={styles.storyText}>{s.text}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 7. YAŞAM HARİTASI & GÖÇ */}
        {activeTab === 'harita' && (
          <Card className={styles.mapCard}>
            <h3 className={styles.contentTitle}>🗺️ Yaşam Coğrafyası & Göç Yolu</h3>
            <p className={styles.mapDesc}>
              {person.name}&apos;ın doğduğu, okuduğu, çalıştığı ve iz bıraktığı şehirlerin yaşam haritası.
            </p>
            <div className={styles.mapVisualMock}>
              <div className={styles.mapPin} style={{ top: '40%', left: '30%' }}>
                <span>📍</span>
                <strong>{person.birthPlace}</strong>
                <small>Kök & Aile Ocağı</small>
              </div>
              <div className={styles.mapPin} style={{ top: '30%', left: '25%' }}>
                <span>📍</span>
                <strong>İstanbul</strong>
                <small>Eğitim & Hatıralar</small>
              </div>
            </div>
          </Card>
        )}

      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <Card style={{ maxWidth: '520px', width: '100%', padding: '32px', background: 'var(--bg-surface-solid)', border: '1px solid var(--border-color-hover)' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#ffffff' }}>✍️ {person.name} Hakkında Yeni Bir Hatıra Paylaş</h3>
            <form onSubmit={handleAddStory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Hatıra Başlığı</label>
                <input 
                  type="text" 
                  required
                  placeholder="Örn: Dedemle İlk Balık Tutuşumuz" 
                  value={newStoryTitle}
                  onChange={(e) => setNewStoryTitle(e.target.value)}
                  style={{ width: '100%', height: '42px', padding: '0 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Yazan Kişi</label>
                <input 
                  type="text" 
                  required
                  value={newStoryAuthor}
                  onChange={(e) => setNewStoryAuthor(e.target.value)}
                  style={{ width: '100%', height: '42px', padding: '0 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Hatıra Metni</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="Hatırladığınız detayları ve duygularınızı buraya dökün..."
                  value={newStoryText}
                  onChange={(e) => setNewStoryText(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: '#fff', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <Button type="button" variant="outline" onClick={() => setShowStoryModal(false)}>İptal</Button>
                <Button type="submit" variant="primary">Hatırayı Yayınla</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}

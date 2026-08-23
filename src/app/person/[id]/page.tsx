'use client';

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getPersonById, addStoryToPerson, PersonRecord, SEED_PERSONS } from '@/lib/services/personService';
import { 
  Calendar, 
  MapPin, 
  Volume2, 
  Play, 
  Pause, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  FileText, 
  Sparkles, 
  Plus, 
  Layers, 
  ArrowLeft,
  X,
  Heart,
  ExternalLink
} from 'lucide-react';

const TABS = [
  { id: 'genel', label: 'Genel Bakış', icon: BookOpen },
  { id: 'zaman', label: 'Zaman Tüneli', icon: Calendar },
  { id: 'aile', label: 'Aile & Soy Bağı', icon: Users },
  { id: 'fotograflar', label: 'Fotoğraf & Belge', icon: ImageIcon },
  { id: 'ses', label: 'Ses Kayıtları', icon: Volume2 },
  { id: 'anilar', label: 'Aile Hatıraları', icon: FileText },
  { id: 'harita', label: 'Yaşam Coğrafyası', icon: MapPin },
];

export default function PersonProfilePage() {
  const params = useParams();
  const id = (params?.id as string) || '1';

  const [person, setPerson] = useState<PersonRecord>(SEED_PERSONS.find(p => p.id === id) || SEED_PERSONS[0]);
  const [activeTab, setActiveTab] = useState('genel');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [stories, setStories] = useState(person.stories || []);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [newStoryText, setNewStoryText] = useState('');
  const [newStoryAuthor, setNewStoryAuthor] = useState('Ahmet Yılmaz');

  useEffect(() => {
    getPersonById(id).then(found => {
      if (found) {
        setPerson(found);
        setStories(found.stories || []);
      }
    });
  }, [id]);

  const handleAddStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryTitle.trim() || !newStoryText.trim()) return;

    await addStoryToPerson(person.id, {
      title: newStoryTitle,
      text: newStoryText,
      author: newStoryAuthor
    });

    const updated = await getPersonById(person.id);
    if (updated) {
      setPerson(updated);
      setStories(updated.stories || []);
    }

    setShowStoryModal(false);
    setNewStoryTitle('');
    setNewStoryText('');
  };

  return (
    <div className={styles.container}>
      
      {/* Back Link */}
      <div className={styles.topBackNav}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={15} />
          <span>Arşive Dön</span>
        </Link>
      </div>

      {/* Hero Profile Header */}
      <Card className={styles.heroProfileCard}>
        <div className={styles.profileHeaderContent}>
          
          <div className={styles.portraitWrapper}>
            <div className={styles.avatarLetter}>{person.name.charAt(0)}</div>
          </div>

          <div className={styles.profileMainInfo}>
            
            <div className={styles.pillRow}>
              <span className={styles.genPill}>{person.generation}</span>
              <span className={`${styles.statusPill} ${person.isLiving ? styles.livingPill : styles.deceasedPill}`}>
                <span className={styles.statusDot} />
                {person.isLiving ? 'Yaşıyor' : 'Mazi'}
              </span>
              <span className={styles.bloodPill}>Kan: {person.bloodType}</span>
            </div>

            <h1 className={styles.profileName}>{person.name}</h1>
            <p className={styles.profileTitle}>{person.title}</p>
            
            <div className={styles.yearsRow}>
              <span className={styles.metaBadge}>
                <Calendar size={13} />
                {person.years}
              </span>
              <span className={styles.metaBadge}>
                <MapPin size={13} />
                {person.birthPlace}
              </span>
            </div>

          </div>

          <div className={styles.headerActions}>
            <Link href="/tree" className={styles.treeViewBtn}>
              <Layers size={14} />
              <span>Soy Ağacında Gör</span>
            </Link>
            <Link href={`/ai-chat?q=${encodeURIComponent(`${person.name} hakkında tüm arşiv bilgilerini listele`)}`} className={styles.aiAskBtn}>
              <Sparkles size={14} />
              <span>Hafıza Asistanına Sor</span>
            </Link>
          </div>

        </div>

        {/* Audio Memory Strip */}
        {person.hasAudio && person.audioTitle && (
          <div className={styles.audioMemoryBar}>
            <div className={styles.audioIconBox}>
              <Volume2 size={16} />
            </div>
            <div className={styles.audioText}>
              <strong>{person.audioTitle}</strong>
              <span>Orijinal Manyetik Teyp Kaydı • {person.audioDuration}</span>
            </div>
            <button 
              className={styles.audioPlayBtn}
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            >
              {isPlayingAudio ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlayingAudio ? 'Duraklat' : 'Dinle'}</span>
            </button>
          </div>
        )}

      </Card>

      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={14} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className={styles.tabContentArea}>
        
        {/* 1. GENEL BAKIŞ */}
        {activeTab === 'genel' && (
          <div className={styles.tabGrid}>
            <Card className={styles.bioCard}>
              <h3 className={styles.contentTitle}>Hayat Özeti</h3>
              <p className={styles.bioText}>{person.biography}</p>
              
              <div className={styles.quoteBox}>
                <p className={styles.quoteText}>
                  &ldquo;Kökünü bilmeyen ağacın meyvesi tatlı olmaz. Ailenizin hatıralarını saklayın.&rdquo;
                </p>
                <span className={styles.quoteAuthor}>— {person.name}</span>
              </div>
            </Card>

            <Card className={styles.detailsCard}>
              <h3 className={styles.contentTitle}>Nüfus & Kütük Kayıtları</h3>
              <ul className={styles.detailsList}>
                <li><span className={styles.detailLabel}>Adı Soyadı:</span> <strong>{person.name}</strong></li>
                <li><span className={styles.detailLabel}>Lakap / Unvan:</span> <span>{person.nickname}</span></li>
                <li><span className={styles.detailLabel}>Mesleği:</span> <span>{person.job}</span></li>
                <li><span className={styles.detailLabel}>Doğum Yeri:</span> <span>{person.birthPlace}</span></li>
                {person.deathPlace && <li><span className={styles.detailLabel}>Vefat Yeri:</span> <span>{person.deathPlace}</span></li>}
                {person.cemetery && <li><span className={styles.detailLabel}>Kabir:</span> <span>{person.cemetery}</span></li>}
                <li><span className={styles.detailLabel}>Kan Grubu:</span> <span>{person.bloodType}</span></li>
                <li><span className={styles.detailLabel}>Kayıtlı Belge:</span> <span>{person.photos?.length || 0} Belge</span></li>
              </ul>
            </Card>
          </div>
        )}

        {/* 2. ZAMAN TÜNELİ */}
        {activeTab === 'zaman' && (
          <Card className={styles.timelineCard}>
            <h3 className={styles.contentTitle}>Kronolojik Hayat Çizgisi</h3>
            <div className={styles.timelineList}>
              {(person.milestones || []).map((m, idx) => (
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
            <div className={styles.sectionHeadingRow}>
              <h3 className={styles.contentTitle}>Bağlı Olduğu Fertler</h3>
            </div>
            <div className={styles.relativesGrid}>
              {(person.relatives || []).map(rel => (
                <Card key={rel.id} className={styles.relativeCard} hoverable>
                  <div className={styles.relativeAvatar}>{rel.name.charAt(0)}</div>
                  <div className={styles.relativeInfo}>
                    <h4>{rel.name}</h4>
                    <span className={styles.relRelation}>{rel.relation}</span>
                    <span className={styles.relYears}>{rel.years}</span>
                  </div>
                  <Link href={`/person/${rel.id}`} className={styles.relLink}>
                    <ExternalLink size={14} />
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 4. FOTOĞRAF & BELGELER */}
        {activeTab === 'fotograflar' && (
          <div>
            <div className={styles.galleryHeader}>
              <h3 className={styles.contentTitle}>Belge Koleksiyonu ({person.photos?.length || 0})</h3>
              <Link href="/media/upload" className={styles.addPhotoBtn}>
                <Plus size={14} />
                <span>Belge Ekle</span>
              </Link>
            </div>
            <div className={styles.galleryGrid}>
              {(person.photos || []).map(p => (
                <Card key={p.id} className={styles.photoItemCard} hoverable>
                  <div className={styles.photoThumbnail}>
                    <span className={styles.photoYearBadge}>{p.year}</span>
                    <ImageIcon size={28} className={styles.photoIcon} />
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
            <h3 className={styles.contentTitle}>Ses Kayıtları</h3>
            {person.hasAudio ? (
              <div className={styles.audioPlayerBox}>
                <div className={styles.waveformSimulation}>
                  <span style={{ height: '40%' }} /><span style={{ height: '80%' }} /><span style={{ height: '60%' }} />
                  <span style={{ height: '100%' }} /><span style={{ height: '70%' }} /><span style={{ height: '90%' }} />
                  <span style={{ height: '30%' }} /><span style={{ height: '50%' }} /><span style={{ height: '75%' }} />
                  <span style={{ height: '40%' }} /><span style={{ height: '65%' }} /><span style={{ height: '85%' }} />
                </div>
                <div className={styles.audioPlayerInfo}>
                  <h4>{person.audioTitle}</h4>
                  <p>Dijitalleştirilmiş Arşiv Kaydı • Süre: {person.audioDuration}</p>
                  <div className={styles.audioControls}>
                    <button className={styles.controlPlayBtn} onClick={() => setIsPlayingAudio(!isPlayingAudio)}>
                      {isPlayingAudio ? <Pause size={14} /> : <Play size={14} />}
                      <span>{isPlayingAudio ? 'Durdur' : 'Oynat'}</span>
                    </button>
                    <span className={styles.timeTag}>01:24 / {person.audioDuration}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                Bu şahsa ait kayıtlı ses kaydı bulunmamaktadır.
              </div>
            )}
          </Card>
        )}

        {/* 6. AİLE HATIRALARI */}
        {activeTab === 'anilar' && (
          <div className={styles.storiesContainer}>
            <div className={styles.galleryHeader}>
              <h3 className={styles.contentTitle}>Aile Hatıraları ({stories.length})</h3>
              <button className={styles.addPhotoBtn} onClick={() => setShowStoryModal(true)}>
                <Plus size={14} />
                <span>Hatıra Yaz</span>
              </button>
            </div>
            <div className={styles.storiesList}>
              {stories.map(s => (
                <Card key={s.id} className={styles.storyCard}>
                  <div className={styles.storyHeader}>
                    <div>
                      <h4 className={styles.storyTitle}>{s.title}</h4>
                      <span className={styles.storyAuthor}>Yazan: {s.author} • {s.date}</span>
                    </div>
                    <span className={styles.storyHeart}>
                      <Heart size={12} fill="currentColor" />
                      <span>14</span>
                    </span>
                  </div>
                  <p className={styles.storyText}>{s.text}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 7. YAŞAM HARİTASI */}
        {activeTab === 'harita' && (
          <Card className={styles.mapCard}>
            <h3 className={styles.contentTitle}>Yaşam Coğrafyası</h3>
            <p className={styles.mapDesc}>
              {person.name}&apos;ın doğduğu, tahsil gördüğü ve iz bıraktığı coğrafi duraklar.
            </p>
            <div className={styles.mapVisualMock}>
              <div className={styles.mapPin} style={{ top: '45%', left: '32%' }}>
                <MapPin size={16} className={styles.mapPinIcon} />
                <strong>{person.birthPlace}</strong>
                <small>Doğum & Kök</small>
              </div>
              <div className={styles.mapPin} style={{ top: '30%', left: '26%' }}>
                <MapPin size={16} className={styles.mapPinIcon} />
                <strong>İstanbul</strong>
                <small>Eğitim & Meslek</small>
              </div>
            </div>
          </Card>
        )}

      </div>

      {/* Story Modal */}
      {showStoryModal && (
        <div className={styles.modalBackdrop}>
          <Card className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Yeni Bir Hatıra Paylaş</h3>
              <button className={styles.modalCloseBtn} onClick={() => setShowStoryModal(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddStory} className={styles.modalForm}>
              <div>
                <label className={styles.formLabel}>Hatıra Başlığı</label>
                <input 
                  type="text" 
                  required
                  placeholder="Örn: Kapalıçarşı Sahaf Gezilerimiz" 
                  value={newStoryTitle}
                  onChange={(e) => setNewStoryTitle(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div>
                <label className={styles.formLabel}>Yazan Fert</label>
                <input 
                  type="text" 
                  required
                  value={newStoryAuthor}
                  onChange={(e) => setNewStoryAuthor(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div>
                <label className={styles.formLabel}>Hatıra Metni</label>
                <textarea 
                  rows={4} 
                  required
                  placeholder="Hatırladığınız anıları ve detayları buraya yazın..."
                  value={newStoryText}
                  onChange={(e) => setNewStoryText(e.target.value)}
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancelBtn} onClick={() => setShowStoryModal(false)}>
                  İptal
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  Hatırayı Kaydet
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}

import { db } from '@/lib/firebase/config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

export interface PersonRecord {
  id: string;
  name: string;
  birthYear?: number;
  deathYear?: number;
  birthPlace: string;
  deathPlace?: string;
  cemetery?: string;
  bloodType: string;
  nickname: string;
  job: string;
  generation: string;
  branch: string;
  isLiving: boolean;
  hasAudio: boolean;
  biography: string;
  title: string;
  years: string;
  milestones: { year: string; title: string; desc: string; tag: string }[];
  relatives: { id: string; name: string; relation: string; years: string; badge: string }[];
  photos: { id: string; title: string; year: string; category: string }[];
  stories: { id: string; author: string; date: string; title: string; text: string }[];
  audioTitle: string;
  audioDuration: string;
}

export const SEED_PERSONS: PersonRecord[] = [
  {
    id: '1',
    name: 'Mustafa Yılmaz',
    title: 'Cumhuriyet Başöğretmeni • 1. Kuşak Aile Büyüğü',
    years: '15 Nisan 1940 — 22 Ağustos 2012',
    birthYear: 1940,
    deathYear: 2012,
    job: 'Başöğretmen & Eğitimci',
    birthPlace: 'Bursa / Heykel',
    deathPlace: 'İstanbul / Kadıköy',
    cemetery: 'Bursa Emir Sultan Mezarlığı',
    bloodType: 'A Rh (+)',
    nickname: 'Hoca Mustafa',
    generation: '1. Kuşak',
    branch: 'bursa',
    isLiving: false,
    hasAudio: true,
    biography: `1940 yılında Bursa Heykel semtinde doğan Mustafa Yılmaz, Bursa Erkek Lisesi ve ardından Çapa Yüksek Öğretmen Okulu'ndan mezun olmuştur. 35 yılı aşkın süre boyunca Bursa ve çevre illerde binlerce öğrenci yetiştirmiş, Cumhuriyet İlkokulu müdürlüğü yapmıştır. Ailenin ilk fotoğraf arşivini kuran ve eski soyağacı şeceresini el yazısıyla deftere döken aile büyüğümüzdür.`,
    milestones: [
      { year: '1940', title: 'Dünyaya Geliş', desc: 'Bursa Heykel semtinde aile konağında doğdu.', tag: 'Doğum' },
      { year: '1958', title: 'Çapa Öğretmen Okulu', desc: 'İstanbul Çapa Yüksek Öğretmen Okulu Tarih-Coğrafya bölümünü tamamladı.', tag: 'Eğitim' },
      { year: '1962', title: 'İlk Görev Yeri & Askerlik', desc: 'Erzurum Aşkale ilçesinde yedek subay öğretmen olarak vatani görevini tamamladı.', tag: 'Meslek' },
      { year: '1968', title: 'Ayşe Hanım ile Evlilik', desc: 'Bursa Kapalıçarşı eşrafından terzi Ayşe Demir ile evlendi.', tag: 'Evlilik' },
      { year: '1970', title: 'İlk Evlat: Ali Yılmaz', desc: 'İlk çocuğu Ali Yılmaz dünyaya geldi.', tag: 'Aile' },
      { year: '1988', title: 'Başöğretmenlik ve Emeklilik', desc: 'Cumhuriyet İlkokulu müdürlüğünden takdirname ile emekliye ayrıldı.', tag: 'Kariyer' },
      { year: '2012', title: 'Vefat', desc: 'İstanbul Kadıköy\'de vefat etti, Bursa Emir Sultan Mezarlığı\'na defnedildi.', tag: 'Vefat' },
    ],
    relatives: [
      { id: '2', name: 'Ayşe Yılmaz (Demir)', relation: 'Eşi', years: '1945 — Günümüz', badge: '1. Kuşak' },
      { id: '3', name: 'Ali Yılmaz', relation: 'Oğlu', years: '1970 — Günümüz', badge: '2. Kuşak' },
      { id: '4', name: 'Zeynep Yılmaz (Kaya)', relation: 'Kızı', years: '1975 — Günümüz', badge: '2. Kuşak' },
      { id: '5', name: 'Ahmet Yılmaz', relation: 'Torunu', years: '1998 — Günümüz', badge: '3. Kuşak' },
      { id: '6', name: 'Elif Yılmaz', relation: 'Torunu', years: '2004 — Günümüz', badge: '3. Kuşak' },
    ],
    photos: [
      { id: 'p1', title: '1968 Nikah Töreni Hatırası', year: '1968', category: 'Düğün Albümü' },
      { id: 'p2', title: 'Cumhuriyet İlkokulu Öğretmenler Kurulu', year: '1976', category: 'Meslek & Okul' },
      { id: 'p3', title: 'Uludağ Aile Gezisi', year: '1982', category: 'Aile Gezisi' },
      { id: 'p4', title: 'Osmanlıca Aile Şecere Defteri (El Yazısı)', year: '1955', category: 'Tarihi Belge' },
      { id: 'p5', title: 'Öğretmenlik Takdirname Beratı', year: '1985', category: 'Resmi Belge' },
    ],
    stories: [
      {
        id: 's1',
        author: 'Ali Yılmaz (Oğlu)',
        date: '14 Mayıs 2024',
        title: 'Babamın Eski Ahşap Çantası ve Kitap Sevgisi',
        text: `Babam her akşam okuldan eve dönerken deri çantasında mutlaka yeni bir kitap veya gazete getirirdi. Sofrada Osmanlı ve Cumhuriyet tarihi hikayeleri anlatır, 'Kökünü bilmeyen ağacın meyvesi tatlı olmaz' derdi.`
      },
      {
        id: 's2',
        author: 'Ahmet Yılmaz (Torunu)',
        date: '22 Ağustos 2025',
        title: 'Dedemle Kapalıçarşı Sahaf Gezilerimiz',
        text: `Küçükken beni elimden tutar, Bursa Sahaflar Çarşısı'na götürürdü. Eski kitapların ve sahafların kıymetini bana aşılayan insan dedem Mustafa Yılmaz'dır.`
      }
    ],
    audioTitle: 'Mustafa Yılmaz — Köy Günleri ve İlk Öğretmenlik Yılları (1984 Manyetik Teyp Kaydı)',
    audioDuration: '4:12'
  },
  {
    id: '2',
    name: 'Ayşe Yılmaz (Demir)',
    title: 'Geleneksel İpek Nakış Ustası • Aile Büyüğü',
    years: '12 Haziran 1945 — Günümüz',
    birthYear: 1945,
    job: 'Emekli Terzi & İpek Nakış',
    birthPlace: 'Bursa / Çekirge',
    bloodType: '0 Rh (+)',
    nickname: 'Ayşe Teyze',
    generation: '1. Kuşak',
    branch: 'bursa',
    isLiving: true,
    hasAudio: true,
    biography: `Bursa Çekirge'de köklü bir ailede dünyaya gelen Ayşe Hanım, gençliğinde İpek Han'da geleneksel Türk nakış sanatı icra etmiştir. Ailenin zengin mutfak kültürü ve sözlü tarih anlatıcısıdır.`,
    milestones: [
      { year: '1945', title: 'Doğum', desc: 'Bursa Çekirge semtinde doğdu.', tag: 'Doğum' },
      { year: '1968', title: 'Mustafa Bey ile Evlilik', desc: 'Öğretmen Mustafa Yılmaz ile hayatını birleştirdi.', tag: 'Evlilik' },
      { year: '1975', title: 'Zeynep\'in Doğumu', desc: 'Kızı Zeynep Yılmaz dünyaya geldi.', tag: 'Aile' },
    ],
    relatives: [
      { id: '1', name: 'Mustafa Yılmaz', relation: 'Eşi', years: '1940 — 2012', badge: '1. Kuşak' },
      { id: '3', name: 'Ali Yılmaz', relation: 'Oğlu', years: '1970 — Günümüz', badge: '2. Kuşak' },
      { id: '4', name: 'Zeynep Yılmaz (Kaya)', relation: 'Kızı', years: '1975 — Günümüz', badge: '2. Kuşak' },
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
        text: 'Her bayram arifesinde tüm aileye kendi elleriyle 40 kat incecik yufka açarak baklava yapardı.'
      }
    ],
    audioTitle: 'Ayşe Hanım — Eski Bursa Anıları ve Masallar (2002 Kaydı)',
    audioDuration: '6:40'
  },
  {
    id: '3',
    name: 'Ali Yılmaz',
    title: 'Yüksek İnşaat Mühendisi • 2. Kuşak Temsilcisi',
    years: '10 Mart 1970 — Günümüz',
    birthYear: 1970,
    job: 'Yüksek İnşaat Mühendisi',
    birthPlace: 'Bursa',
    bloodType: 'A Rh (+)',
    nickname: 'Mühendis Ali',
    generation: '2. Kuşak',
    branch: 'istanbul',
    isLiving: true,
    hasAudio: true,
    biography: `İTÜ İnşaat Mühendisliği mezunu olan Ali Yılmaz, Türkiye genelinde birçok altyapı projesinde yöneticilik yapmıştır. İstanbul Kadıköy'de ikamet etmektedir.`,
    milestones: [
      { year: '1970', title: 'Doğum', desc: 'Bursa Muradiye Doğumevi\'nde doğdu.', tag: 'Doğum' },
      { year: '1992', title: 'İTÜ Mezuniyeti', desc: 'İstanbul Teknik Üniversitesi İnşaat Fakültesi\'ni bitirdi.', tag: 'Eğitim' },
      { year: '1998', title: 'Ahmet\'in Doğumu', desc: 'Oğlu Ahmet Yılmaz dünyaya geldi.', tag: 'Aile' },
    ],
    relatives: [
      { id: '1', name: 'Mustafa Yılmaz', relation: 'Babası', years: '1940 — 2012', badge: '1. Kuşak' },
      { id: '2', name: 'Ayşe Yılmaz', relation: 'Annesi', years: '1945 — Günümüz', badge: '1. Kuşak' },
      { id: '5', name: 'Ahmet Yılmaz', relation: 'Oğlu', years: '1998 — Günümüz', badge: '3. Kuşak' },
      { id: '6', name: 'Elif Yılmaz', relation: 'Kızı', years: '2004 — Günümüz', badge: '3. Kuşak' },
    ],
    photos: [
      { id: 'p1', title: 'İTÜ Mezuniyet Töreni', year: '1992', category: 'Eğitim' },
      { id: 'p2', title: 'Köprü Projesi Saha İncelemesi', year: '2005', category: 'Kariyer' },
    ],
    stories: [
      {
        id: 's1',
        author: 'Ahmet Yılmaz',
        date: '2026',
        title: 'İlk Bilgisayar ve Dijitalleşme',
        text: '1998 yılında eve ilk bilgisayarı getirdiğinde tüm aile ağacını dijitalde tutma hayali o gün başlamıştı.'
      }
    ],
    audioTitle: 'Ali Yılmaz — Mühendislik Yılları ve İlk Projeler (2018 Kaydı)',
    audioDuration: '5:10'
  },
  {
    id: '4',
    name: 'Zeynep Yılmaz (Kaya)',
    title: 'Mimar & Öğretim Görevlisi • 2. Kuşak',
    years: '1975 — Günümüz',
    birthYear: 1975,
    job: 'Mimar & Sanat Tarihçisi',
    birthPlace: 'Bursa',
    bloodType: 'B Rh (+)',
    nickname: 'Hoca Zeynep',
    generation: '2. Kuşak',
    branch: 'izmir',
    isLiving: true,
    hasAudio: false,
    biography: `Ege Üniversitesi Mimarlık Fakültesi öğretim görevlisi olup İzmir Alsancak'ta yaşamaktadır.`,
    milestones: [
      { year: '1975', title: 'Doğum', desc: 'Bursa\'da dünyaya geldi.', tag: 'Doğum' },
      { year: '1997', title: 'Mezuniyet', desc: 'Mimarlık Fakültesi mezuniyeti.', tag: 'Eğitim' },
    ],
    relatives: [
      { id: '1', name: 'Mustafa Yılmaz', relation: 'Babası', years: '1940 — 2012', badge: '1. Kuşak' },
      { id: '2', name: 'Ayşe Yılmaz', relation: 'Annesi', years: '1945 — Günümüz', badge: '1. Kuşak' },
      { id: '7', name: 'Can Kaya', relation: 'Oğlu', years: '2008 — Günümüz', badge: '3. Kuşak' },
    ],
    photos: [],
    stories: [],
    audioTitle: '',
    audioDuration: ''
  },
  {
    id: '5',
    name: 'Ahmet Yılmaz',
    title: 'Yazılım Mühendisi • 3. Kuşak Profil Sahibi',
    years: '1998 — Günümüz',
    birthYear: 1998,
    job: 'Yazılım Mühendisi',
    birthPlace: 'İstanbul / Kadıköy',
    bloodType: 'A Rh (+)',
    nickname: 'Ahmet',
    generation: '3. Kuşak',
    branch: 'istanbul',
    isLiving: true,
    hasAudio: false,
    biography: `Ailenin dijital arşivleme ve soy ağacı yazılım altyapısını kuran 3. kuşak üyesidir.`,
    milestones: [
      { year: '1998', title: 'Doğum', desc: 'İstanbul Kadıköy\'de doğdu.', tag: 'Doğum' },
    ],
    relatives: [
      { id: '3', name: 'Ali Yılmaz', relation: 'Babası', years: '1970 — Günümüz', badge: '2. Kuşak' },
      { id: '6', name: 'Elif Yılmaz', relation: 'Kardeşi', years: '2004 — Günümüz', badge: '3. Kuşak' },
    ],
    photos: [],
    stories: [],
    audioTitle: '',
    audioDuration: ''
  },
  {
    id: '6',
    name: 'Elif Yılmaz',
    title: 'Grafik Tasarım Öğrencisi • 3. Kuşak',
    years: '2004 — Günümüz',
    birthYear: 2004,
    job: 'Grafik Tasarım Öğrencisi',
    birthPlace: 'İstanbul',
    bloodType: '0 Rh (+)',
    nickname: 'Elif',
    generation: '3. Kuşak',
    branch: 'istanbul',
    isLiving: true,
    hasAudio: false,
    biography: `Mimar Sinan Güzel Sanatlar Üniversitesi öğrencisi.`,
    milestones: [{ year: '2004', title: 'Doğum', desc: 'İstanbul\'da doğdu.', tag: 'Doğum' }],
    relatives: [{ id: '3', name: 'Ali Yılmaz', relation: 'Babası', years: '1970 — Günümüz', badge: '2. Kuşak' }],
    photos: [],
    stories: [],
    audioTitle: '',
    audioDuration: ''
  },
  {
    id: '7',
    name: 'Can Kaya',
    title: 'Lise Öğrencisi • 3. Kuşak',
    years: '2008 — Günümüz',
    birthYear: 2008,
    job: 'Lise Öğrencisi',
    birthPlace: 'İzmir / Alsancak',
    bloodType: 'A Rh (+)',
    nickname: 'Can',
    generation: '3. Kuşak',
    branch: 'izmir',
    isLiving: true,
    hasAudio: false,
    biography: `İzmir Atatürk Lisesi öğrencisi.`,
    milestones: [{ year: '2008', title: 'Doğum', desc: 'İzmir\'de doğdu.', tag: 'Doğum' }],
    relatives: [{ id: '4', name: 'Zeynep Yılmaz (Kaya)', relation: 'Annesi', years: '1975 — Günümüz', badge: '2. Kuşak' }],
    photos: [],
    stories: [],
    audioTitle: '',
    audioDuration: ''
  }
];

// Persistent Local / Cloud Data Layer
export async function getPersons(): Promise<PersonRecord[]> {
  if (typeof window === 'undefined') return SEED_PERSONS;

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      const snap = await getDocs(collection(db, 'persons'));
      if (!snap.empty) {
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as PersonRecord));
      }
    }
  } catch {}

  const local = localStorage.getItem('family_persons_v1');
  if (local) {
    try {
      return JSON.parse(local);
    } catch {}
  }

  localStorage.setItem('family_persons_v1', JSON.stringify(SEED_PERSONS));
  return SEED_PERSONS;
}

export async function getPersonById(id: string): Promise<PersonRecord | undefined> {
  const all = await getPersons();
  return all.find(p => p.id === id) || all[0];
}

export async function savePerson(person: PersonRecord): Promise<void> {
  const all = await getPersons();
  const index = all.findIndex(p => p.id === person.id);
  
  let updated: PersonRecord[];
  if (index >= 0) {
    updated = [...all];
    updated[index] = person;
  } else {
    updated = [...all, person];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('family_persons_v1', JSON.stringify(updated));
  }

  try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      await setDoc(doc(db, 'persons', person.id), person);
    }
  } catch {}
}

export async function addStoryToPerson(personId: string, story: { title: string; text: string; author: string }): Promise<void> {
  const person = await getPersonById(personId);
  if (!person) return;

  const newStory = {
    id: `story-${Date.now()}`,
    author: story.author,
    date: 'Bugün',
    title: story.title,
    text: story.text
  };

  person.stories = [newStory, ...(person.stories || [])];
  await savePerson(person);
}

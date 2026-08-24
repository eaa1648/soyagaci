/**
 * Tarihi Şecereler Servisi (Historical Dynasties & Trees)
 * Osmanlı Hanedanı (36 Padişah) ve İngiliz Kraliyeti Şecere Veritabanı
 */

export interface HistoricalFigure {
  id: string;
  name: string;
  order?: number; // Padişahlık Sırası (1 - 36)
  reignYears: string; // Saltanat Yılları (Örn: 1451 — 1481)
  lifeYears: string; // Doğum / Vefat (Örn: 1432 — 1481)
  title: string;
  fatherName: string;
  motherName: string;
  burialPlace: string;
  generation: number;
  gender: 'male' | 'female';
  majorEvents: string[];
  biography: string;
  imageUrl?: string;
  x: number;
  y: number;
  parents?: string[];
  children?: string[];
}

export const OTTOMAN_DYNASTY_DATA: HistoricalFigure[] = [
  {
    id: 'ott-1',
    name: 'I. Osman Gazi',
    order: 1,
    reignYears: '1299 — 1326',
    lifeYears: '1258 — 1326',
    title: 'Osmanlı Devleti Kurucusu & İlk Padişah',
    fatherName: 'Ertuğrul Gazi',
    motherName: 'Halime Hatun',
    burialPlace: 'Bursa Gümüşlü Kümbet',
    generation: 1,
    gender: 'male',
    majorEvents: ['1299 Osmanlı Beyliği Bağımsızlığı', '1302 Koyunhisar Zaferi', 'Bursa Kuşatması'],
    biography: 'Kayı boyunun lideri Ertuğrul Gazi’nin oğlu olan Osman Bey, Söğüt ve Domaniç merkezli Osmanlı Beyliği’ni kurmuş, 600 yılı aşkın sürecek hanedanın temellerini atmıştır.',
    x: 400,
    y: 100,
    children: ['ott-2']
  },
  {
    id: 'ott-2',
    name: 'Orhan Gazi',
    order: 2,
    reignYears: '1326 — 1362',
    lifeYears: '1281 — 1362',
    title: 'Bursa Fatihi & Teşkilatlanma Dönemi',
    fatherName: 'Osman Gazi',
    motherName: 'Malhun Hatun',
    burialPlace: 'Bursa Tophane Türbesi',
    generation: 2,
    gender: 'male',
    majorEvents: ['1326 Bursa’nın Fethi ve Başkent Oluşu', '1331 İznik’in Fethi', '1354 Rumeli’ye Geçiş (Çimpe Kalesi)'],
    biography: 'İlk Osmanlı sikkesini bastıran, divan teşkilatını ve ilk düzenli ordu olan Yaya-Müsellem birliklerini kuran hükümdardır.',
    x: 400,
    y: 340,
    parents: ['ott-1'],
    children: ['ott-3']
  },
  {
    id: 'ott-3',
    name: 'I. Murad (Hüdavendigâr)',
    order: 3,
    reignYears: '1362 — 1389',
    lifeYears: '1326 — 1389',
    title: 'Balkanlar Fatihi & Şehit Hükümdar',
    fatherName: 'Orhan Gazi',
    motherName: 'Nilüfer Hatun',
    burialPlace: 'Bursa Çekirge / Kosova Meşhed-i Hüdavendigâr',
    generation: 3,
    gender: 'male',
    majorEvents: ['1363 Edirne’nin Fethi', '1371 Çirmen Zaferi', '1389 I. Kosova Meydan Muharebesi'],
    biography: 'Yeniçeri Ocağı ve Tımar sistemini kurmuş, Rumeli’de sınırları genişletmiş ve I. Kosova Savaşı sonrasında şehit düşmüştür.',
    x: 400,
    y: 580,
    parents: ['ott-2'],
    children: ['ott-4']
  },
  {
    id: 'ott-4',
    name: 'I. Bayezid (Yıldırım Bayezid)',
    order: 4,
    reignYears: '1389 — 1402',
    lifeYears: '1360 — 1403',
    title: 'Niğbolu Fatihi & Yıldırım',
    fatherName: 'I. Murad',
    motherName: 'Gülçiçek Hatun',
    burialPlace: 'Bursa Yıldırım Türbesi',
    generation: 4,
    gender: 'male',
    majorEvents: ['1396 Niğbolu Haçlı Zaferi', 'İstanbul’un İlk Büyük Kuşatması', 'Anadolu Hisarı İnşası', '1402 Ankara Savaşı'],
    biography: 'Hızlı askeri intikalleri sebebiyle Yıldırım unvanını almış, Anadolu beyliklerini tek bayrak altında toplamıştır.',
    x: 400,
    y: 820,
    parents: ['ott-3'],
    children: ['ott-5']
  },
  {
    id: 'ott-5',
    name: 'I. Mehmed (Çelebi Mehmed)',
    order: 5,
    reignYears: '1413 — 1421',
    lifeYears: '1386 — 1421',
    title: 'Devletin İkinci Kurucusu',
    fatherName: 'I. Bayezid',
    motherName: 'Devlet Hatun',
    burialPlace: 'Bursa Yeşil Türbe',
    generation: 5,
    gender: 'male',
    majorEvents: ['Fetret Devri’nin Sonlandırılması (1413)', 'Devlet Bütünlüğünün Yeniden Tesisi'],
    biography: '11 yıl süren kardeşler arası Fetret Devri’ni sonlandırıp devleti yıkılmaktan kurtardığı için Osmanlı’nın ikinci kurucusu kabul edilir.',
    x: 400,
    y: 1060,
    parents: ['ott-4'],
    children: ['ott-6']
  },
  {
    id: 'ott-6',
    name: 'II. Murad',
    order: 6,
    reignYears: '1421 — 1444 / 1446 — 1451',
    lifeYears: '1404 — 1451',
    title: 'Varna & II. Kosova Fatihi',
    fatherName: 'I. Mehmed',
    motherName: 'Emine Hatun',
    burialPlace: 'Bursa Muradiye Külliyesi',
    generation: 6,
    gender: 'male',
    majorEvents: ['1444 Varna Zaferi', '1448 II. Kosova Zaferi', 'Edirne-Segedin Antlaşması'],
    biography: 'Tahtı kendi rızasıyla 12 yaşındaki oğlu II. Mehmed’e bırakmış, Haçlı tehlikesi üzerine tekrar tahta geçip Varna’da büyük zafer kazanmıştır.',
    x: 400,
    y: 1300,
    parents: ['ott-5'],
    children: ['ott-7']
  },
  {
    id: 'ott-7',
    name: 'II. Mehmed (Fatih Sultan Mehmed)',
    order: 7,
    reignYears: '1451 — 1481',
    lifeYears: '1432 — 1481',
    title: 'İstanbul Fatihi & Çağ Açan Hükümdar',
    fatherName: 'II. Murad',
    motherName: 'Hüma Hatun',
    burialPlace: 'İstanbul Fatih Camii Türbesi',
    generation: 7,
    gender: 'male',
    majorEvents: ['29 Mayıs 1453 İstanbul’un Fethi', '1461 Trabzon İmparatorluğu’nun Fethi', 'Kanunname-i Âli Osman'],
    biography: '21 yaşında İstanbul’u fethederek Orta Çağ’ı kapatıp Yeni Çağ’ı başlatan, 6 dil bilen büyük deha, imparatorluk nizamının kurucusudur.',
    x: 400,
    y: 1540,
    parents: ['ott-6'],
    children: ['ott-8']
  },
  {
    id: 'ott-8',
    name: 'II. Bayezid (Sultan Bayezid-i Velî)',
    order: 8,
    reignYears: '1481 — 1512',
    lifeYears: '1447 — 1512',
    title: 'Bayezid-i Velî & Adalet Hükümdarı',
    fatherName: 'Fatih Sultan Mehmed',
    motherName: 'Gülbahar Hatun',
    burialPlace: 'İstanbul Bayezid Camii Türbesi',
    generation: 8,
    gender: 'male',
    majorEvents: ['Cem Sultan Olayı', '1492 İspanya’dan Yahudilerin Kurtarılması', 'Edirne Darüşşifası İnşası'],
    biography: 'İlim ve hayırseverliği ile tanınan, İspanya’daki zulümden kaçan yüz binlerce Endülüslü Müslüman ve Sefarad Yahudisini Osmanlı gemileriyle kurtaran padişahtır.',
    x: 400,
    y: 1780,
    parents: ['ott-7'],
    children: ['ott-9']
  },
  {
    id: 'ott-9',
    name: 'I. Selim (Yavuz Sultan Selim)',
    order: 9,
    reignYears: '1512 — 1520',
    lifeYears: '1470 — 1520',
    title: 'İlk Osmanlı Halifesi & Hadimü’l-Haremeyn',
    fatherName: 'II. Bayezid',
    motherName: 'Ayşe Gülbahar Hatun',
    burialPlace: 'İstanbul Yavuz Selim Camii Türbesi',
    generation: 9,
    gender: 'male',
    majorEvents: ['1514 Çaldıran Zaferi', '1516 Mercidabık Zaferi', '1517 Ridaniye Zaferi & Mısır Fethi', 'Hilafetin Osmanlı’ya Geçişi'],
    biography: '8 yıllık saltanatında devlet hazinesini ağzına kadar doldurmuş, Ortadoğu ve Mısır’ı fethederek Kutsal Emanetleri İstanbul’a getirmiştir.',
    x: 400,
    y: 2020,
    parents: ['ott-8'],
    children: ['ott-10']
  },
  {
    id: 'ott-10',
    name: 'I. Süleyman (Kanunî Sultan Süleyman)',
    order: 10,
    reignYears: '1520 — 1566',
    lifeYears: '1494 — 1566',
    title: 'Muhteşem Süleyman & Kanunî',
    fatherName: 'Yavuz Sultan Selim',
    motherName: 'Hafsa Valide Sultan',
    burialPlace: 'İstanbul Süleymaniye Camii Türbesi',
    generation: 10,
    gender: 'male',
    majorEvents: ['1521 Belgrad’ın Fethi', '1522 Rodos’un Fethi', '1526 Mohaç Meydan Muharebesi (2 Saatte Zafer)', '1538 Preveze Deniz Zaferi'],
    biography: '46 yıl tahtta kalarak Osmanlı’nın en uzun süre hüküm süren padişahı olmuş, devleti dünyanın zirvesine taşımış büyük kanun ve adalet mimarıdır.',
    x: 400,
    y: 2260,
    parents: ['ott-9']
  },
  {
    id: 'ott-34',
    name: 'II. Abdülhamid Han',
    order: 34,
    reignYears: '1876 — 1909',
    lifeYears: '1842 — 1918',
    title: 'Ulu Hakan & Maarif ve Demiryolu Mimarı',
    fatherName: 'Sultan Abdülmecid',
    motherName: 'Tirimüjgan Kadınefendi',
    burialPlace: 'İstanbul Sultan II. Mahmud Türbesi (Çemberlitaş)',
    generation: 20,
    gender: 'male',
    majorEvents: ['1876 I. Meşrutiyet & Kanun-i Esasi', 'Hicaz & Bağdat Demiryolları', 'Darülaceze ve Şişli Etfal Hastanesi', 'Binlerce Okul ve Mülkiye Açılışı'],
    biography: '33 yıllık iktidarında denge siyasetiyle devleti ayakta tutmuş; modern eğitim kurumları, telgraf hatları ve Hicaz Demiryolu ile imparatorluğu dönüştürmüştür.',
    x: 400,
    y: 2500,
  },
  {
    id: 'ott-36',
    name: 'VI. Mehmed (Vahdeddin Han)',
    order: 36,
    reignYears: '1918 — 1922',
    lifeYears: '1861 — 1926',
    title: 'Son Osmanlı Padişahı (36. Hükümdar)',
    fatherName: 'Sultan Abdülmecid',
    motherName: 'Gülüstü Hanım',
    burialPlace: 'Şam Sultan Selim Camii Haziresi',
    generation: 21,
    gender: 'male',
    majorEvents: ['I. Dünya Savaşı Sonu & Mütareke Dönemi', '1922 Saltanatın Kaldırılması'],
    biography: 'Osmanlı Devleti’nin 36. ve son padişahıdır.',
    x: 400,
    y: 2740,
  }
];

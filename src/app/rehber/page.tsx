'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { BookOpen, ArrowRight, ArrowLeft, FileText, Landmark, Compass, Award } from 'lucide-react';
import { GooglePreferredSourceButton } from '@/components/seo/GooglePreferredSource';

export const GUIDES_DATA = [
  {
    slug: 'e-devlet-alt-ust-soy-belgesi-nasil-alinir',
    title: 'e-Devlet Alt-Üst Soy Belgesi Nasıl Alınır ve Nasıl Yorumlanır?',
    category: 'e-Devlet & Nüfus',
    readTime: '4 dk okuma',
    icon: FileText,
    summary: 'Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü üzerinden soyağacı çıkarma adımları ve belgedeki eksik kayıtların Osmanlı dönemi nedenleri.',
    content: `
### e-Devlet Alt-Üst Soy Belgesi Alma Adımları
1. **Giriş:** turkiye.gov.tr adresine T.C. Kimlik Numaranız ve şifrenizle giriş yapın.
2. **Hizmet Arama:** Arama kutusuna "Alt-Üst Soy Bilgisi Sorgulama" yazın.
3. **Belge Oluşturma:** Karşınıza çıkan 1800'lü yıllara kadar uzanan sülale kütüğünü görüntüleyin ve "Yazdır / PDF Olarak Kaydet" seçeneğini kullanın.
4. **Şecere Platformuna Aktarım:** İndirdiğiniz PDF'i platformumuzun e-Devlet Aktarım sihirbazına yükleyerek 3 kuşağı otomatik olarak interaktif ağaca dönüştürebilirsiniz.

### Kayıtlar Neden 1800'lü Yılların Başına Kadar Uzanıyor?
Türkiye'de ilk modern genel nüfus sayımı Sultan II. Mahmud döneminde **1831** yılında yapılmıştır. Bu sayım yalnızca erkek nüfusu ve askerlik çağındakileri kapsadığı için, kadınların ve daha eski ataların resmi nüfus kütüklerine geçişi 1904 Genel Nüfus Yazımı (Mernis öncesi temel kütük) ile tamamlanmıştır.
    `
  },
  {
    slug: 'osmanli-arsivlerinde-aile-ve-temettuat-arastirmasi',
    title: 'Osmanlı Arşivlerinde Aile Kökeni ve Temettuat Defteri Araştırması',
    category: 'Tarihi Arşivler',
    readTime: '6 dk okuma',
    icon: Landmark,
    summary: 'Devlet Arşivleri Başkanlığı (BOA) üzerinden 1831 Nüfus Defterleri, Temettuat ve Vakfiye kayıtları ile 1700\'lere uzanma rehberi.',
    content: `
### Temettuat Defterleri Nedir?
1840-1845 yılları arasında Tanzimat Fermanı sonrası hane halkının mesleği, sahip olduğu gayrimenkuller, hayvanlar ve ödediği vergileri kaydeden defterlerdir. 

### Ailenizin Köyünü ve Lakabını Bulma:
1. **Devlet Arşivleri Portalı (e-Devlet Entegre):** Devlet Arşivleri Başkanlığı dijital arama sistemine girin.
2. **Köy / Kaza Adı ile Tarama:** Ailenizin 1900 öncesi bağlı olduğu sancağı veya köy adını taratın.
3. **Sülale Lakabı Eşleştirmesi:** Eski Türkçe kayıtlarda dedelerinizin "Hacıömeroğulları", "Müderrisoğlu" gibi aile lakaplarını tespit edin.
    `
  },
  {
    slug: 'mezarlik-bilgi-sistemi-ve-mezar-tasi-sembolleri',
    title: 'Mezarlık Bilgi Sistemi ile Mezar Yeri Bulma ve Sembol Okuma',
    category: 'Saha Araştırması',
    readTime: '5 dk okuma',
    icon: Compass,
    summary: 'Belediyelerin MEBİS sistemleri ile vefat eden akrabaların kabir koordinatlarını bulma ve Osmanlı mezar taşı başlıkları rehberi.',
    content: `
### Belediye MEBİS Sistemleri
İstanbul (İBB MEBİS), Bursa, Ankara ve İzmir Büyükşehir Belediyeleri'nin online mezarlık sorgulama sistemleri üzerinden ada, parsel ve kabir fotoğrafı koordinatlarına ulaşabilirsiniz.

### Mezar Taşı Serpuş (Başlık) Anlamları:
* **Kavuk (Sarıklı):** İlmiye sınıfı, kadılar, müderrisler ve din adamları.
* **Fes:** Sultan II. Mahmud ve sonrası Tanzimat dönemi bürokrat ve memurları.
* **Hotoz / Çiçekli Başlık:** Hanım mezar taşları; taş üzerindeki gül goncaları genç yaşta vefatı simgeler.
    `
  },
  {
    slug: 'turk-hukukunda-akrabalik-dereceleri-rehberi',
    title: 'Türk Medeni Kanunu’na Göre Akrabalık Dereceleri ve Şeması',
    category: 'Hukuk & Şecere',
    readTime: '4 dk okuma',
    icon: Award,
    summary: '1., 2., 3. ve 4. derece kan ve kayın hısımlığı tanımları, miras hukuku bağları ve kuzenlik dereceleri.',
    content: `
### Akrabalık Derecesi Nasıl Hesaplanır?
Türk Medeni Kanunu Madde 17'ye göre iki kişi arasındaki akrabalık derecesi, **aralarındaki doğum sayısı (nesil farkı)** toplanarak bulunur.

* **1. Derece Kan Hısımları:** Anne, Baba, Çocuklar (1 doğum).
* **2. Derece Kan Hısımları:** Kardeşler, Dedeler, Nineler, Torunlar (2 doğum).
* **3. Derece Kan Hısımları:** Amca, Dayı, Hala, Teyze, Yeğenler (3 doğum).
* **4. Derece Kan Hısımları:** Kuzenler (Amca, Dayı, Hala, Teyze Çocukları - 4 doğum).
    `
  }
];

export default function GuidesIndexPage() {
  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Top Breadcrumb & Preferred Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <ArrowLeft size={14} />
            <span>Ana Sayfa</span>
          </Link>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: 600 }}>Aile Tarihi Araştırma Merkezi</span>
        </div>

        <GooglePreferredSourceButton variant="badge" />
      </div>

      {/* Hero Header */}
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 36px auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', fontSize: '0.76rem', fontWeight: 600, marginBottom: '16px' }}>
          <BookOpen size={14} />
          <span>ŞECERE & AİLE TARİHİ KÜTÜPHANESİ</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>
          Köklerinizi Keşfetme Rehberleri
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          e-Devlet belgelerinden Osmanlı Nüfus Defterlerine, mezarlık araştırmalarından akrabalık derecelerine kadar eksiksiz aile tarihi rehberleri.
        </p>
      </div>

      {/* Google Preferred Source Banner */}
      <div style={{ maxWidth: '800px', margin: '0 auto 36px auto' }}>
        <GooglePreferredSourceButton 
          variant="card"
          title="Google Arama ve Keşfet’te Şecere Rehberlerini Öncelikli Yapın"
          description="Google hesabınızda 'Tercih Edilen Kaynak' olarak ekleyin; yeni soy araştırması rehberleri ve arşiv incelemeleri Keşfet akışınızda ve AI arama özetlerinizde doğrudan öne çıksın."
        />
      </div>

      {/* Guides Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {GUIDES_DATA.map((guide) => {
          const Icon = guide.icon;
          return (
            <Card key={guide.slug} style={{ padding: '28px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={20} />
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{guide.readTime}</span>
                </div>

                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {guide.category}
                </span>

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', margin: '6px 0 10px 0', lineHeight: 1.35 }}>
                  {guide.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: '0 0 20px 0' }}>
                  {guide.summary}
                </p>
              </div>

              <Link 
                href={`/rehber/${guide.slug}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--brand-primary)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                <span>Rehberi Oku</span>
                <ArrowRight size={14} />
              </Link>
            </Card>
          );
        })}
      </div>

    </div>
  );
}

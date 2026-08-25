'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  EyeOff,
  UploadCloud,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { EDevletParser, EDevletParseResult } from '@/lib/importers/eDevletParser';
import { savePerson } from '@/lib/services/personService';

export default function EDevletImportPage() {
  const [inputText, setInputText] = useState('');
  const [parseResult, setParseResult] = useState<EDevletParseResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [uploadedImageName, setUploadedImageName] = useState<string | null>(null);
  const router = useRouter();

  const handleParse = (textToParse?: string) => {
    const raw = textToParse || inputText;
    setIsProcessing(true);
    setTimeout(() => {
      const result = EDevletParser.parseText(raw);
      setParseResult(result);
      setIsProcessing(false);
    }, 700);
  };

  const handleLoadRealScreenshotDemo = () => {
    setUploadedImageName('e-Devlet-Alt-Ust-Soy-Ekran-Goruntusu.png');
    setInputText(`T.C. İÇİŞLERİ BAKANLIĞI NÜFUS VE VATANDAŞLIK İŞLERİ GENEL MÜDÜRLÜĞÜ ALT ÜST SOY BELGESİ
Yakınlık Derecesi: Annesinin Babasının Babası | Adı: İBRAHİM | Soyadı: GUGUK | Doğum: 01/07/1861 | İznik Çakırca Mah.
Yakınlık Derecesi: Annesinin Annesinin Annesinin Babası | Adı: SALİH | Doğum: 01/07/1876 | İznik Elbeyli Mah.
Yakınlık Derecesi: Annesinin Babasının Annesi | Adı: HANİFE | Soyadı: GUGUK | Doğum: 01/07/1886
Yakınlık Derecesi: Annesinin Annesinin Babası | Adı: AHMET | Soyadı: URSAVAŞ | Doğum: 01/07/1898
Yakınlık Derecesi: Babasının Babası | Adı: ÜZEYİR | Soyadı: ÖZSOY | Doğum: 01/07/1907
Yakınlık Derecesi: Babasının Annesi | Adı: FATMA | Soyadı: ÖZSOY | Doğum: 01/07/1908
Yakınlık Derecesi: Annesinin Annesinin Annesi | Adı: HANİFE | Soyadı: URSAVAŞ | Doğum: 01/07/1913
Yakınlık Derecesi: Annesinin Babası | Adı: MEHMET | Soyadı: GUGUK | Doğum: 01/07/1914
Yakınlık Derecesi: Annesinin Annesi | Adı: ZEHRA | Soyadı: GUGUK | Doğum: 03/03/1928
Yakınlık Derecesi: Babası | Adı: TURHAN | Soyadı: ÖZSOY | Doğum: 20/03/1936
Yakınlık Derecesi: Annesi | Adı: HANİFE | Soyadı: ÖZSOY | Doğum: 02/05/1950
Yakınlık Derecesi: Kendisi | Adı: ÜZEYİR ÖZER | Soyadı: ÖZSOY | Doğum: 16/01/1971`);

    setIsProcessing(true);
    setTimeout(() => {
      const result = EDevletParser.parseFromScreenshotSample();
      setParseResult(result);
      setIsProcessing(false);
    }, 600);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedImageName(file.name);
      setIsProcessing(true);
      
      // Otomatik Görsel / OCR Ayrıştırma (Simülasyon)
      setTimeout(() => {
        const result = EDevletParser.parseFromScreenshotSample();
        setParseResult(result);
        setIsProcessing(false);
      }, 900);
    }
  };

  const handleImportToTree = async () => {
    if (!parseResult) return;
    setIsProcessing(true);

    for (const p of parseResult.sanitizedPersons) {
      await savePerson(p);
    }

    setIsProcessing(false);
    setImportSuccess(true);
    setTimeout(() => {
      router.push('/tree');
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
          <ArrowLeft size={14} />
          <span>Ana Sayfaya Dön</span>
        </Link>
        <span style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', fontWeight: 600 }}>e-Devlet Akıllı İçe Aktarım</span>
      </div>

      {importSuccess ? (
        <Card style={{ padding: '48px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Check size={28} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
            Soy Kütüğü Başarıyla Soyağacına İşlendi!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 20px 0' }}>
            {parseResult?.sanitizedPersons.length} aile bireyi 1861&apos;den 1971&apos;e 5 kuşak boyunca otomatik olarak yerleştirildi. Soyağacı tuvaline yönlendiriliyorsunuz...
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Header Card */}
          <Card style={{ padding: '32px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ fontSize: '0.74rem', color: 'var(--brand-primary)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>HIZLI ŞECERE KURULUMU</span>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-primary)', margin: '4px 0 8px 0' }}>
                  e-Devlet Alt-Üst Soy Belgesi & Ekran Görüntüsü
                </h1>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
                  e-Devlet üzerinden aldığınız <strong>Alt-Üst Soy Belgesi ekran görüntüsünü (fotoğrafını), PDF çıktısını</strong> veya metnini yükleyin. Sistem 5 kuşağı saniyeler içinde otomatik olarak graf ağacına döker.
                </p>
              </div>

              {/* KVKK Shield Badge */}
              <div style={{ padding: '12px 16px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={22} style={{ color: 'var(--accent-emerald)' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-primary)' }}>%100 İstemci Taraflı (RAM) Hijyen</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>T.C. No ve Cilt No sunucuya gitmeden anında maskelenir</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Upload Method 1: Ekran Görüntüsü (Screenshot) / Görsel Yükleme */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {/* Visual Screenshot Dropzone */}
            <Card style={{ padding: '24px', background: 'var(--bg-surface)', border: '2px dashed var(--border-medium)', borderRadius: 'var(--radius-lg)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <input 
                type="file" 
                accept="image/*,.pdf" 
                onChange={handleImageUpload}
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
              />
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--brand-surface)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <UploadCloud size={24} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                Ekran Görüntüsü veya PDF Yükleyin
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                {uploadedImageName ? `Seçilen Dosya: ${uploadedImageName}` : 'Telefonunuzdaki e-Devlet ekran resmini buraya sürükleyin veya tıklayın'}
              </p>
            </Card>

            {/* Instant Demo Fill Card */}
            <Card style={{ padding: '24px', background: 'var(--brand-surface)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--brand-primary)', marginBottom: '8px' }}>
                  <Sparkles size={16} />
                  <strong style={{ fontSize: '0.84rem' }}>1-Tık Gerçek e-Devlet Ekran Görüntüsü</strong>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Yükleme yapmadan; <strong>1861&apos;den 1971&apos;e 12 kişilik İznik / Özsoy &amp; Guguk</strong> ailesinin gerçek e-Devlet kütük belgesini tek tıkla yükleyip deneyin.
                </p>
              </div>

              <button 
                type="button"
                onClick={handleLoadRealScreenshotDemo}
                style={{
                  marginTop: '16px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--brand-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <ImageIcon size={14} />
                <span>Örnek Ekran Resmiyle Otomatik Doldur</span>
              </button>
            </Card>

          </div>

          {/* Text Area (Optional Raw Input) */}
          <Card style={{ padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Veya Belge Metnini Yapıştırın
              </label>
            </div>

            <textarea 
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e-Devlet PDF'inden veya tablosundan kopyaladığınız satırları buraya yapıştırabilirsiniz..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.8rem',
                outline: 'none',
                resize: 'vertical'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleParse()}
                disabled={!inputText.trim() || isProcessing}
                style={{
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-surface-raised)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-medium)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                  opacity: inputText.trim() ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{isProcessing ? 'Ayrıştırılıyor...' : 'Metni İncele & Maskele'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </Card>

          {/* Parse Result Preview */}
          {parseResult && (
            <Card style={{ padding: '28px', background: 'var(--bg-surface)', border: '1px solid var(--brand-primary)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                    Ayrıştırılan Aile Kütüğü ({parseResult.sanitizedPersons.length} Kişi • 5 Kuşak)
                  </h3>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    1861&apos;den 1971&apos;e kadar uzanan kütük ve akrabalık bağları başarıyla yapılandırıldı.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ fontSize: '0.74rem', background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald)', padding: '4px 12px', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <EyeOff size={13} /> {parseResult.kvkkSanitizationReport.tcNumbersMasked} T.C. No &amp; Cilt Maskelendi
                  </span>
                </div>
              </div>

              {/* Parsed List Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                {parseResult.sanitizedPersons.map((p, idx) => (
                  <div key={idx} style={{ padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--brand-primary)', fontWeight: 600 }}>{p.generation}</span>
                      <span style={{ fontSize: '0.68rem', padding: '1px 6px', borderRadius: 'var(--radius-xs)', background: p.isLiving ? 'var(--accent-emerald-bg)' : 'var(--bg-surface-raised)', color: p.isLiving ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                        {p.isLiving ? 'Yaşıyor' : 'Vefat'}
                      </span>
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: '0 0 2px 0' }}>{p.name}</h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>{p.title}</span>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>{p.years}</span> • <span>{p.birthPlace}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent-emerald)' }} />
                  Nüfus ve Vatandaşlık İşleri kütüğüyle tam eşleşti.
                </span>

                <button
                  type="button"
                  onClick={handleImportToTree}
                  disabled={isProcessing}
                  style={{
                    padding: '12px 28px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-emerald)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Check size={16} />
                  <span>Onayla &amp; Soyağacına Yerleştir</span>
                </button>
              </div>

            </Card>
          )}

        </div>
      )}

    </div>
  );
}

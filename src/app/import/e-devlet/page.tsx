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
  EyeOff
} from 'lucide-react';
import { EDevletParser, EDevletParseResult } from '@/lib/importers/eDevletParser';
import { savePerson } from '@/lib/services/personService';

export default function EDevletImportPage() {
  const [inputText, setInputText] = useState('');
  const [parseResult, setParseResult] = useState<EDevletParseResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const router = useRouter();

  const handleParse = (textToParse?: string) => {
    const raw = textToParse || inputText;
    if (!raw.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const result = EDevletParser.parseText(raw);
      setParseResult(result);
      setIsProcessing(false);
    }, 600);
  };

  const handleLoadSample = () => {
    const sample = `1\tE\tKendisi\tAhmet Yılmaz\tAli\tAyşe\tİstanbul\t15.05.1998\tSağ
2\tE\tBabası\tAli Yılmaz\tMustafa\tAyşe\tBursa\t10.03.1970\tSağ
3\tK\tAnnesi\tFatma Yılmaz\tHasan\tEmine\tBursa\t12.06.1972\tSağ
4\tE\tBabasının Babası\tMustafa Yılmaz\tMehmet\tHatice\tBursa\t15.04.1940\tÖlü (22.08.2012)
5\tK\tBabasının Annesi\tAyşe Yılmaz (Demir)\tİbrahim\tZehra\tBursa\t12.06.1945\tSağ
6\tE\tBabasının Babasının Babası\tMehmet Yılmaz\tHalil\tEmine\tBursa\t1910\tÖlü (1978)`;
    setInputText(sample);
    handleParse(sample);
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
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
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
            Soy Kütüğü Başarıyla Ağaca Aktarıldı!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 20px 0' }}>
            {parseResult?.sanitizedPersons.length} aile bireyi otomatik olarak 4 kuşak boyunca yerleştirildi. Soyağacına yönlendiriliyorsunuz...
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
                  e-Devlet Alt-Üst Soy Belgesi İçe Aktarımı
                </h1>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
                  e-Devlet üzerinden aldığınız <strong>Alt-Üst Soy Belgesi</strong> metnini veya PDF çıktısını yükleyin. Sistem 3-4 kuşağı saniyeler içinde otomatik olarak graf ağacına döker.
                </p>
              </div>

              {/* KVKK Shield Badge */}
              <div style={{ padding: '12px 16px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={22} style={{ color: 'var(--accent-emerald)' }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-primary)' }}>%100 İstemci Taraflı (RAM) Hijyen</strong>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>T.C. No ve Cilt No sunucuya gitmeden maskelenir</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Input Section */}
          <Card style={{ padding: '28px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Belge Metnini Yapıştırın veya Dosya Seçin
              </label>
              <button 
                type="button" 
                onClick={handleLoadSample}
                style={{ background: 'transparent', border: 'none', color: 'var(--brand-primary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Sparkles size={13} />
                <span>Örnek e-Devlet Belgesi Yükle</span>
              </button>
            </div>

            <textarea 
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e-Devlet PDF'inden kopyaladığınız satırları buraya yapıştırın veya 'Örnek Belge Yükle'ye tıklayın..."
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.82rem',
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
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--brand-primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                  opacity: inputText.trim() ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{isProcessing ? 'Ayrıştırılıyor...' : 'Belgeyi İncele ve Maskele'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </Card>

          {/* Parse Result Preview */}
          {parseResult && (
            <Card style={{ padding: '28px', background: 'var(--bg-surface)', border: '1px solid var(--brand-primary)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                    Ayrıştırılan Aile Şeceresi ({parseResult.sanitizedPersons.length} Kişi)
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    4 Kuşak boyunca akrabalık bağları ve doğum yılları tespit edildi.
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <span style={{ fontSize: '0.74rem', background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald)', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <EyeOff size={12} /> {parseResult.kvkkSanitizationReport.tcNumbersMasked} T.C. No Maskelendi
                  </span>
                </div>
              </div>

              {/* Parsed List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {parseResult.sanitizedPersons.map((p, idx) => (
                  <div key={idx} style={{ padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--brand-primary)', fontWeight: 600 }}>{p.title}</span>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--text-primary)', margin: '2px 0 4px 0' }}>{p.name}</h4>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      <span>{p.years}</span> • <span>{p.birthPlace}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
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
                  <span>Onayla & Soyağacına İşle</span>
                </button>
              </div>

            </Card>
          )}

        </div>
      )}

    </div>
  );
}

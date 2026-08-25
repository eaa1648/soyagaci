'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  UploadCloud, 
  Sparkles, 
  Check, 
  ArrowLeft,
  Image as ImageIcon
} from 'lucide-react';

export default function MediaUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiDetected, setAiDetected] = useState<string | null>(null);
  const [approxDate, setApproxDate] = useState('');
  const [location, setLocation] = useState('');
  const [taggedPeople, setTaggedPeople] = useState('Mustafa Yılmaz, Ayşe Yılmaz');
  const [description, setDescription] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Simulate AI Analysis
      setIsAiAnalyzing(true);
      setTimeout(() => {
        setIsAiAnalyzing(false);
        setAiDetected('Fotoğrafta 2 kişi tespit edildi. Tahmini Dönem: 1968-1972 (Analog Çekim). Eşleşen Şahıslar: Mustafa Yılmaz & Ayşe Yılmaz.');
        setApproxDate('1968 (Tahmini)');
        setLocation('Bursa');
      }, 1000);
    }
  };

  const handleSave = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Back Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
          <ArrowLeft size={14} />
          <span>Ana Sayfaya Dön</span>
        </Link>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Yeni Arşiv Kaydı</span>
      </div>

      {uploadSuccess ? (
        <Card style={{ padding: '48px', textAlign: 'center', background: 'var(--bg-surface)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--accent-emerald-bg)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <Check size={24} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Belge Arşive Kaydedildi</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>Arşiv ana sayfasına yönlendiriliyorsunuz...</p>
        </Card>
      ) : (
        <Card style={{ padding: '32px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px 0' }}>Yeni Belge veya Hatıra Ekle</h1>
            <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>Fotoğraf, ses kaydı, el yazması veya tapu belgelerini aile arşivine yükleyin</p>
          </div>

          {/* Clean Dropzone */}
          <label style={{ 
            border: '1px dashed var(--border-medium)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '36px 20px', 
            textAlign: 'center',
            backgroundColor: file ? 'var(--bg-surface-raised)' : 'var(--bg-main)',
            cursor: 'pointer',
            display: 'block',
            transition: 'all 0.15s ease'
          }}>
            <input type="file" accept="image/*,audio/*,video/*,.pdf" onChange={handleFileChange} style={{ display: 'none' }} />
            
            {file ? (
              <div>
                <ImageIcon size={32} style={{ color: 'var(--brand-primary)', margin: '0 auto 8px auto' }} />
                <strong style={{ fontSize: '0.94rem', color: 'var(--text-primary)', display: 'block' }}>{file.name}</strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--brand-primary)' }}>Dosyayı değiştirmek için tıklayın</span>
              </div>
            ) : (
              <div>
                <UploadCloud size={36} style={{ color: 'var(--text-muted)', margin: '0 auto 10px auto' }} />
                <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>Dosyayı sürükleyin veya cihazınızdan seçin</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '14px' }}>JPG, PNG, MP3 veya PDF formatları desteklenir</span>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '6px 14px', 
                  background: 'var(--bg-surface)', 
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)', 
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 500,
                  fontSize: '0.8rem'
                }}>
                  Dosya Seç
                </span>
              </div>
            )}
          </label>

          {/* AI Banner */}
          {isAiAnalyzing && (
            <div style={{ padding: '12px 16px', background: 'var(--brand-surface)', border: '1px solid rgba(217, 119, 6, 0.2)', borderRadius: 'var(--radius-sm)', color: 'var(--brand-primary)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={15} />
              <span>Yapay zekâ belgeyi tarıyor (yüz tanıma, tahmini tarih ve yer tespiti)...</span>
            </div>
          )}

          {aiDetected && (
            <div style={{ padding: '12px 16px', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Sparkles size={15} style={{ color: 'var(--brand-primary)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ display: 'block', color: 'var(--text-primary)', marginBottom: '2px' }}>Otomatik Belge Analizi</strong>
                {aiDetected}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 500 }}>Tarih / Dönem</label>
                <input 
                  type="text" 
                  value={approxDate}
                  onChange={(e) => setApproxDate(e.target.value)}
                  placeholder="Örn: 1968"
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.84rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 500 }}>Şehir / Mekân</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Örn: Bursa / Çekirge"
                  style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.84rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 500 }}>Fotoğraftaki / Belgedeki Fertler</label>
              <input 
                type="text" 
                value={taggedPeople}
                onChange={(e) => setTaggedPeople(e.target.value)}
                placeholder="Örn: Mustafa Yılmaz, Ayşe Yılmaz"
                style={{ width: '100%', height: '40px', padding: '0 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.84rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '5px', fontWeight: 500 }}>Açıklama & Hatıra Notu</label>
              <textarea 
                rows={3} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Bu belge veya fotoğrafla ilgili aile büyüklerinizden dinlediğiniz hatıraları yazın..."
                style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.84rem' }}
              />
            </div>

          </div>

          {/* Action Footer */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '18px' }}>
            <Link href="/" style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.82rem' }}>
              İptal
            </Link>
            <button
              onClick={handleSave}
              disabled={!file}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--brand-primary)',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.82rem',
                cursor: file ? 'pointer' : 'not-allowed',
                opacity: file ? 1 : 0.5
              }}
            >
              Belgeyi Kaydet
            </button>
          </div>

        </Card>
      )}

    </div>
  );
}

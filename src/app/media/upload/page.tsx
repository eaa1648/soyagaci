'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
      
      // Simulate AI Auto Analysis
      setIsAiAnalyzing(true);
      setTimeout(() => {
        setIsAiAnalyzing(false);
        setAiDetected('✨ Gemini AI Analizi: Fotoğrafta 2 kişi tespit edildi. Tahmini Dönem: 1968-1972 (Siyah-Beyaz Analog Çekim). Olası Eşleşme: Mustafa Yılmaz & Ayşe Yılmaz.');
        setApproxDate('1968 (Tahmini)');
        setLocation('Bursa');
      }, 1200);
    }
  };

  const handleSave = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      router.push('/');
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>← Ana Sayfa</Link>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0 0 0', color: '#ffffff' }}>📸 Yeni Aile Hatırası veya Belgesi Yükle</h1>
        </div>
        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Vazgeç</Link>
      </div>

      {uploadSuccess ? (
        <Card style={{ padding: '48px', textAlign: 'center', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '12px' }}>🎉</span>
          <h2 style={{ color: '#34d399', margin: '0 0 8px 0' }}>Hatıra Başarıyla Aile Arşivine Kaydedildi!</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Yapay zekâ etiketleri işlendi, ana sayfaya yönlendiriliyorsunuz...</p>
        </Card>
      ) : (
        <Card style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '28px', background: 'rgba(15, 23, 42, 0.85)' }}>
          
          {/* Dropzone */}
          <label style={{ 
            border: '2px dashed rgba(99, 102, 241, 0.4)', 
            borderRadius: '16px', 
            padding: '40px 20px', 
            textAlign: 'center',
            backgroundColor: file ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
            cursor: 'pointer',
            display: 'block',
            transition: 'all 0.25s ease'
          }}>
            <input type="file" accept="image/*,audio/*,video/*,.pdf" onChange={handleFileChange} style={{ display: 'none' }} />
            
            {file ? (
              <div>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>🖼️</span>
                <strong style={{ fontSize: '1.1rem', color: '#ffffff', display: 'block' }}>{file.name}</strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--brand-primary-hover)' }}>Dosyayı değiştirmek için tıklayın</span>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '8px' }}>📂</span>
                <strong style={{ fontSize: '1.1rem', color: '#ffffff', display: 'block', marginBottom: '4px' }}>Fotoğrafı, Sesi veya Belgeyi Buraya Sürükleyin</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'block', marginBottom: '16px' }}>JPG, PNG, MP3, MP4, PDF formatları desteklenir</span>
                <span style={{ 
                  display: 'inline-block', 
                  padding: '8px 20px', 
                  background: 'var(--brand-primary)', 
                  color: '#ffffff', 
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}>
                  Cihazdan Dosya Seç
                </span>
              </div>
            )}
          </label>

          {/* AI Auto Tagging Banner */}
          {isAiAnalyzing && (
            <div style={{ padding: '14px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '12px', color: '#c084fc', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>✨</span> Gemini AI fotoğrafı analiz ediyor (Yüz tanıma, tahmini tarih ve mekan tespiti)...
            </div>
          )}

          {aiDetected && (
            <div style={{ padding: '14px', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', color: '#c7d2fe', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {aiDetected}
            </div>
          )}

          {/* Form Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#ffffff' }}>📋 Hatıra Bilgileri</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Tarih / Dönem</label>
                <input 
                  type="text" 
                  value={approxDate}
                  onChange={(e) => setApproxDate(e.target.value)}
                  placeholder="Örn: 1968 veya 1980'ler"
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#ffffff', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Şehir / Mekân</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Örn: Bursa Kapalıçarşı"
                  style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#ffffff', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Fotoğraftaki / Belgedeki Kişiler (Etiket)</label>
              <input 
                type="text" 
                value={taggedPeople}
                onChange={(e) => setTaggedPeople(e.target.value)}
                placeholder="Örn: Mustafa Yılmaz, Ayşe Yılmaz"
                style={{ width: '100%', height: '46px', padding: '0 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#ffffff', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 600 }}>Açıklama & Aile Hatırası Hikâyesi</label>
              <textarea 
                rows={4} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Bu fotoğrafla veya ses kaydıyla ilgili aile büyüklerinizden dinlediğiniz hatıraları yazın..."
                style={{ width: '100%', padding: '14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: '#ffffff', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <Link href="/" style={{ padding: '12px 24px', borderRadius: '9999px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
              İptal
            </Link>
            <Button variant="primary" disabled={!file} onClick={handleSave}>
              ✨ Yükle ve Aile Arşivine Kaydet
            </Button>
          </div>

        </Card>
      )}

    </div>
  );
}

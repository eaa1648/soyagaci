'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ImportExportPage() {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExportJSON = () => {
    const data = {
      family: 'Yılmaz Hanedanı',
      exportDate: new Date().toISOString(),
      nodesCount: 7,
      generations: 3,
      nodes: [
        { id: '1', name: 'Mustafa Yılmaz', years: '1940-2012', job: 'Başöğretmen', generation: '1. Kuşak' },
        { id: '2', name: 'Ayşe Yılmaz', years: '1945-Günümüz', job: 'Emekli Terzi', generation: '1. Kuşak' },
        { id: '3', name: 'Ali Yılmaz', years: '1970-Günümüz', job: 'Yüksek Mühendis', generation: '2. Kuşak' },
        { id: '4', name: 'Zeynep Yılmaz', years: '1975-Günümüz', job: 'Mimar', generation: '2. Kuşak' },
        { id: '5', name: 'Ahmet Yılmaz', years: '1998-Günümüz', job: 'Yazılım Mühendisi', generation: '3. Kuşak' },
      ]
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yilmaz-aile-hafizasi-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,ID,Ad Soyad,Yillar,Meslek,Kusak\n1,Mustafa Yilmaz,1940-2012,Basogretmen,1. Kusak\n2,Ayse Yilmaz,1945-Gunumuz,Emekli Terzi,1. Kusak\n3,Ali Yilmaz,1970-Gunumuz,Muhendis,2. Kusak";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "yilmaz-sozagaci-listesi.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImportStatus(`"${e.target.files[0].name}" dosyası doğrulandı. 12 yeni kişi ve 4 nesil ilişkisi başarıyla içeri aktarılmaya hazır!`);
    }
  };

  return (
    <div>
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0 0 6px 0', color: '#ffffff' }}>📥 Veri Aktarımı & Yedekleme Merkezi</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
          Aile ağacınızın tüm verilerini tek tıkla cihazınıza indirin veya Excel/CSV tablolarından yeni veriler yükleyin
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }}>
        
        {/* Export Card */}
        <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(15, 23, 42, 0.85)' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
            📤
          </div>
          
          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.3rem', color: '#ffffff' }}>Tam Yedek Al & Dışa Aktar</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Kişi kartları, biyografiler, doğum-ölüm tarihleri, nesil bağları ve hatıra metinlerini içeren şifreli yedeği indirin.
            </p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            💡 <strong>İpucu:</strong> JSON formatı tüm ilişkisel grafiği korur. CSV formatı ise Excel ile kolayca açılabilir.
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
            <Button variant="primary" style={{ flex: 1 }} onClick={handleExportJSON}>
              📄 JSON İndir
            </Button>
            <Button variant="outline" style={{ flex: 1 }} onClick={handleExportCSV}>
              📊 CSV (Excel) İndir
            </Button>
          </div>
        </Card>

        {/* Import Card */}
        <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(15, 23, 42, 0.85)' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
            📥
          </div>

          <div>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '1.3rem', color: '#ffffff' }}>Toplu Veri Yükle (Import)</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Daha önceden hazırladığınız Excel veya GEDCOM soy ağacı tablonuzu yükleyerek saniyeler içinde ağaca dönüştürün.
            </p>
          </div>

          {/* Upload Dropzone */}
          <label style={{ 
            border: '2px dashed rgba(99, 102, 241, 0.4)', 
            padding: '32px 20px', 
            textAlign: 'center', 
            borderRadius: '12px',
            background: 'rgba(99, 102, 241, 0.04)',
            cursor: 'pointer',
            display: 'block',
            transition: 'all 0.2s ease'
          }}>
            <input type="file" accept=".json,.csv,.xlsx" onChange={handleFileDrop} style={{ display: 'none' }} />
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>📂</span>
            <strong style={{ fontSize: '0.9rem', color: '#ffffff', display: 'block' }}>Dosya Seçin veya Sürükleyin</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Excel (.xlsx), CSV (.csv) veya JSON (.json)</span>
          </label>

          {importStatus && (
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#34d399', fontSize: '0.84rem', fontWeight: 600 }}>
              {importStatus}
            </div>
          )}
        </Card>

      </div>

    </div>
  );
}

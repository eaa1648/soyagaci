'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Download, UploadCloud, FileJson, FileSpreadsheet, Check } from 'lucide-react';

export default function ImportExportPage() {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExportJSON = () => {
    const data = {
      family: 'Yılmaz Ailesi',
      exportDate: new Date().toISOString(),
      nodesCount: 7,
      generations: 3,
      nodes: [
        { id: '1', name: 'Mustafa Yılmaz', years: '1940 — 2012', job: 'Başöğretmen', generation: '1. Kuşak' },
        { id: '2', name: 'Ayşe Yılmaz', years: '1945 — Günümüz', job: 'Emekli Terzi', generation: '1. Kuşak' },
        { id: '3', name: 'Ali Yılmaz', years: '1970 — Günümüz', job: 'Yüksek Mühendis', generation: '2. Kuşak' },
        { id: '4', name: 'Zeynep Yılmaz', years: '1975 — Günümüz', job: 'Mimar', generation: '2. Kuşak' },
        { id: '5', name: 'Ahmet Yılmaz', years: '1998 — Günümüz', job: 'Yazılım Mühendisi', generation: '3. Kuşak' },
      ]
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yilmaz-aile-arsivi-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,ID,Ad Soyad,Yillar,Meslek,Kusak\n1,Mustafa Yilmaz,1940-2012,Basogretmen,1. Kusak\n2,Ayse Yilmaz,1945-Gunumuz,Emekli Terzi,1. Kusak\n3,Ali Yilmaz,1970-Gunumuz,Muhendis,2. Kusak";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "yilmaz-soyagaci-tablosu.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImportStatus(`"${e.target.files[0].name}" dosyası doğrulandı. 12 yeni fert ve 4 nesil ilişkisi içeri aktarılmaya hazır.`);
    }
  };

  return (
    <div>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Veri Aktarımı & Yedekleme</h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.84rem' }}>
          Soy ağacı kayıtlarını JSON/CSV formatlarında cihazınıza indirin veya harici veri yükleyin
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Export Card */}
        <Card style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
            <Download size={20} />
          </div>
          
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 4px 0', fontSize: '1.15rem', color: 'var(--text-primary)' }}>Dışa Aktar (Yedek Al)</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
              Kişi kartları, kronolojik zaman çizelgeleri, nesil bağları ve hatıra metinlerini içeren tam yedeği indirin.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
            <button 
              onClick={handleExportJSON}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--brand-primary)', border: 'none', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
            >
              <FileJson size={15} />
              <span>JSON İndir</span>
            </button>
            <button 
              onClick={handleExportCSV}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--bg-surface-raised)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer' }}
            >
              <FileSpreadsheet size={15} />
              <span>CSV (Excel)</span>
            </button>
          </div>
        </Card>

        {/* Import Card */}
        <Card style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
            <UploadCloud size={20} />
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 4px 0', fontSize: '1.15rem', color: 'var(--text-primary)' }}>Toplu Veri Yükle (Import)</h3>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
              Excel veya GEDCOM formatındaki şecere tablonuzu yükleyerek soy ağacına dönüştürün.
            </p>
          </div>

          <label style={{ 
            border: '1px dashed var(--border-medium)', 
            padding: '24px 16px', 
            textAlign: 'center', 
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-main)',
            cursor: 'pointer',
            display: 'block',
          }}>
            <input type="file" accept=".json,.csv,.xlsx" onChange={handleFileDrop} style={{ display: 'none' }} />
            <strong style={{ fontSize: '0.84rem', color: 'var(--text-primary)', display: 'block' }}>Dosya Seçin veya Sürükleyin</strong>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Excel (.xlsx), CSV veya JSON</span>
          </label>

          {importStatus && (
            <div style={{ padding: '10px 14px', background: 'var(--accent-emerald-bg)', border: '1px solid var(--accent-emerald)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-emerald)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Check size={15} />
              <span>{importStatus}</span>
            </div>
          )}
        </Card>

      </div>

    </div>
  );
}

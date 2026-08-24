'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { 
  Sparkles, 
  Crown, 
  ArrowLeft,
  Search
} from 'lucide-react';
import { OTTOMAN_DYNASTY_DATA, HistoricalFigure } from '@/lib/services/historicalTrees';

export default function HistoricalTreesPage() {
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure>(OTTOMAN_DYNASTY_DATA[0]);
  const [search, setSearch] = useState('');

  const filteredFigures = OTTOMAN_DYNASTY_DATA.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.title.toLowerCase().includes(search.toLowerCase()) ||
    f.biography.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <ArrowLeft size={14} />
            <span>Ana Sayfa</span>
          </Link>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--brand-primary)', fontWeight: 600 }}>Tarihi Şecereler & Hanedanlar</span>
        </div>

        <Link href="/ai-chat?q=Osmanlı Hanedanı hakkında soru sormak istiyorum" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: 'var(--radius-full)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', border: '1px solid rgba(217, 119, 6, 0.3)', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600 }}>
          <Sparkles size={13} />
          <span>Tarih Asistanına Sor</span>
        </Link>
      </div>

      {/* Header Banner */}
      <Card style={{ padding: '36px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Crown size={26} />
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>VİTRİN & KEŞİF ŞECERESİ</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
              Osmanlı Hanedanı Soyağacı (1299 — 1922)
            </h1>
          </div>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, maxWidth: '780px', lineHeight: 1.6 }}>
          Ertuğrul Gazi ve Osman Gazi&apos;den Sultan Vahdeddin&apos;e 36 Padişahın 600 yılı aşkın soy kütüğü, saltanat kronolojisi, fetihler ve tarihi şecere bağlantıları.
        </p>
      </Card>

      {/* Main Grid: Figures Roster & Detail Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Dynasty Figures List */}
        <div>
          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 14px', height: '42px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Padişah veya olay ara (Fatih, Kanuni, Yavuz...)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontSize: '0.86rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '680px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredFigures.map(fig => {
              const isSelected = selectedFigure.id === fig.id;
              return (
                <div
                  key={fig.id}
                  onClick={() => setSelectedFigure(fig)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--bg-surface-raised)' : 'var(--bg-surface)',
                    border: `1px solid ${isSelected ? 'var(--brand-primary)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: 'var(--radius-xs)', 
                      background: 'var(--brand-surface)', 
                      color: 'var(--brand-primary)', 
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {fig.order || '•'}
                    </div>

                    <div>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                        {fig.name}
                      </h4>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        Saltanat: {fig.reignYears}
                      </span>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {fig.lifeYears}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Figure Profile Card */}
        <Card style={{ padding: '32px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', position: 'sticky', top: '100px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.74rem', padding: '2px 8px', borderRadius: 'var(--radius-xs)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', fontWeight: 600 }}>
              {selectedFigure.order ? `${selectedFigure.order}. Osmanlı Padişahı` : 'Hanedan Kurucusu'}
            </span>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{selectedFigure.reignYears}</span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
            {selectedFigure.name}
          </h2>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '0 0 20px 0' }}>
            {selectedFigure.title}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', background: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '20px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Babası:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{selectedFigure.fatherName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Annesi:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{selectedFigure.motherName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Türbe / Kabir:</span>
              <span style={{ color: 'var(--text-secondary)' }}>{selectedFigure.burialPlace}</span>
            </div>
          </div>

          <h4 style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>Önemli Tarihi Hadiseler</h4>
          <ul style={{ margin: '0 0 20px 0', paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {selectedFigure.majorEvents.map((ev, i) => (
              <li key={i}>{ev}</li>
            ))}
          </ul>

          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 24px 0' }}>
            {selectedFigure.biography}
          </p>

          <Link 
            href={`/ai-chat?q=${encodeURIComponent(`${selectedFigure.name} ve dönemi hakkında bilgi ver`)}`}
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--brand-primary)',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.84rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} />
            <span>{selectedFigure.name} Hakkında AI Asistana Sor</span>
          </Link>

        </Card>

      </div>

    </div>
  );
}

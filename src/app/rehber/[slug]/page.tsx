import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { GUIDES_DATA } from '../page';
import { notFound } from 'next/navigation';
import { GooglePreferredSourceButton } from '@/components/seo/GooglePreferredSource';

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = GUIDES_DATA.find(g => g.slug === resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  // GEO (Generative Engine Optimization) Schema for Google AI Overviews
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': guide.title,
    'description': guide.summary,
    'author': {
      '@type': 'Organization',
      'name': 'Şecere — Dijital Aile Mirası ve Araştırma Merkezi',
      'url': 'https://soyagaci-atxeths-projects.vercel.app'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Şecere.app',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://soyagaci-atxeths-projects.vercel.app/icon.png'
      }
    },
    'inLanguage': 'tr-TR',
    'about': [
      { '@type': 'Thing', 'name': 'Soyağacı' },
      { '@type': 'Thing', 'name': 'e-Devlet Alt-Üst Soy Belgesi' },
      { '@type': 'Thing', 'name': 'Osmanlı Arşivleri' },
      { '@type': 'Thing', 'name': 'Akrabalık Dereceleri' }
    ]
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '36px 24px 100px 24px' }}>
      
      {/* JSON-LD for AI Search & Google Overviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link & Preferred Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/rehber" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
          <ArrowLeft size={14} />
          <span>Tüm Rehberlere Dön</span>
        </Link>

        {/* Top Mini Preferred Badge */}
        <GooglePreferredSourceButton variant="badge" />
      </div>

      {/* Article Header */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.74rem', padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', fontWeight: 600 }}>
            {guide.category}
          </span>
          <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> {guide.readTime}
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.25, margin: '0 0 16px 0' }}>
          {guide.title}
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {guide.summary}
        </p>
      </div>

      {/* Top Inline Google Preferred Box */}
      <GooglePreferredSourceButton variant="inline" />

      {/* Article Body */}
      <Card style={{ padding: '40px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', lineHeight: 1.7, fontSize: '0.94rem', color: 'var(--text-primary)', marginTop: '24px' }}>
        <div style={{ whiteSpace: 'pre-line' }}>
          {guide.content}
        </div>

        {/* Official Google Preferred Source CTA Card */}
        <GooglePreferredSourceButton 
          variant="card"
          title="Google Arama & AI Overviews’ta Şecere’yi Tercih Edin"
          description="Soyağacı, e-Devlet sorguları ve Osmanlı nüfus defterleri araştırmalarınızda Şecere.app rehberlerinin Google’da öncelikli kaynak olarak çıkması için tek tıkla tercih edin."
        />

        {/* CTA Conversion Box */}
        <div style={{ marginTop: '32px', padding: '28px', background: 'var(--brand-surface)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <Sparkles size={24} style={{ color: 'var(--brand-primary)', margin: '0 auto 10px auto' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
            Kendi Ailenizin Soyağacını Başlatın
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 18px auto' }}>
            Rehberdeki adımlarla edindiğiniz e-Devlet belgenizi veya aile notlarınızı hemen interaktif soyağacına dönüştürün.
          </p>
          <Link
            href="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 22px',
              background: 'var(--brand-primary)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontSize: '0.86rem',
              fontWeight: 600
            }}
          >
            <span>Ücretsiz Soyağacı Oluştur</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </Card>

    </div>
  );
}

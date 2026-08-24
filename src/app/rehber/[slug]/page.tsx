import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { GUIDES_DATA } from '../page';
import { notFound } from 'next/navigation';

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const guide = GUIDES_DATA.find(g => g.slug === resolvedParams.slug);

  if (!guide) {
    notFound();
  }

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '36px 24px 100px 24px' }}>
      
      {/* Back Link */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/rehber" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
          <ArrowLeft size={14} />
          <span>Tüm Rehberlere Dön</span>
        </Link>
      </div>

      {/* Article Header */}
      <div style={{ marginBottom: '32px' }}>
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

      {/* Article Body */}
      <Card style={{ padding: '40px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', lineHeight: 1.7, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
        <div style={{ whiteSpace: 'pre-line' }}>
          {guide.content}
        </div>

        {/* CTA Conversion Box */}
        <div style={{ marginTop: '48px', padding: '28px', background: 'var(--brand-surface)', border: '1px solid rgba(217, 119, 6, 0.3)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
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

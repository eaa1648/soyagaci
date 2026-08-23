import React from 'react';
import { Landmark, ArrowUpRight } from 'lucide-react';

interface AdBannerProps {
  sponsorName: string;
  imageUrl?: string;
  description: string;
  link?: string;
}

export function AdBanner({ sponsorName, description, link }: AdBannerProps) {
  return (
    <div style={{
      padding: '20px 24px',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '24px 0',
      gap: '20px',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: 'var(--radius-sm)', 
          background: 'var(--brand-surface)', 
          color: 'var(--brand-primary)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexShrink: 0
        }}>
          <Landmark size={20} />
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>KÜLTÜREL DESTEKÇİ</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-serif)', margin: '0 0 2px 0', color: 'var(--text-primary)', fontSize: '0.98rem', fontWeight: 600 }}>{sponsorName}</h4>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: 1.4 }}>{description}</p>
        </div>
      </div>
      
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            backgroundColor: 'var(--bg-surface-raised)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease'
          }}
        >
          <span>Projeyi İncele</span>
          <ArrowUpRight size={13} />
        </a>
      )}
    </div>
  );
}

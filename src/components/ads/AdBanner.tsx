import React from 'react';

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
      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(15, 23, 42, 0.7) 100%)',
      border: '1px solid rgba(245, 158, 11, 0.25)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '24px 0',
      boxShadow: 'var(--shadow-md)',
      gap: '20px',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          width: '46px', 
          height: '46px', 
          borderRadius: '12px', 
          background: 'rgba(245, 158, 11, 0.15)', 
          color: 'var(--accent-gold)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '1.4rem', 
          flexShrink: 0,
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }}>
          🏛️
        </div>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 800 }}>KÜLTÜREL MİRAS & DESTEKÇİ</span>
          </div>
          <h4 style={{ margin: '0 0 4px 0', color: '#ffffff', fontSize: '1.05rem', fontWeight: 700 }}>{sponsorName}</h4>
          <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: 1.4 }}>{description}</p>
        </div>
      </div>
      
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(245, 158, 11, 0.15)',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            color: 'var(--accent-gold)',
            borderRadius: 'var(--radius-full)',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
        >
          Projeyi İncele →
        </a>
      )}
    </div>
  );
}

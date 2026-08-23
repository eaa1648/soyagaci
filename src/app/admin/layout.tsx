'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { href: '/admin', label: 'Dashboard & Analitik', icon: '📊' },
    { href: '/admin/users', label: 'Kullanıcılar & Roller', icon: '👥' },
    { href: '/admin/approvals', label: 'Onay Bekleyenler', icon: '✅', badge: '2 Yeni' },
    { href: '/admin/merge-tool', label: 'AI Çift Kayıt Birleştirme', icon: '🔀', badge: 'AI' },
    { href: '/admin/logs', label: 'Sistem & Denetim Logları', icon: '📜' },
    { href: '/admin/import-export', label: 'Veri Aktarımı (Excel/JSON)', icon: '📥' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)', backgroundColor: 'var(--bg-main)' }}>
      
      {/* Executive Sidebar */}
      <aside style={{ 
        width: '280px', 
        backgroundColor: 'rgba(10, 15, 30, 0.95)', 
        borderRight: '1px solid var(--border-color)',
        padding: '24px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        flexShrink: 0
      }}>
        {/* User Role Card */}
        <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              A
            </div>
            <div>
              <strong style={{ fontSize: '0.92rem', color: '#ffffff', display: 'block' }}>Ahmet Yılmaz</strong>
              <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 700 }}>● Platform & Aile Admin</span>
            </div>
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Yılmaz Hanedanı Yöneticisi
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0 12px 6px 12px' }}>
            YÖNETİM MODÜLLERİ
          </span>

          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--brand-primary)' : 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 15px rgba(99, 102, 241, 0.4)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                    color: isActive ? '#ffffff' : 'var(--accent-gold)',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          <Link href="/" style={{ display: 'block', padding: '10px 14px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.85rem' }}>
            ← Site Arayüzüne Dön
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}

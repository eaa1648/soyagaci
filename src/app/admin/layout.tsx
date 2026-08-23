'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  CheckCircle2, 
  GitMerge, 
  ScrollText, 
  ArrowDownToLine, 
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Genel Durum', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Kullanıcılar', icon: Users },
    { href: '/admin/approvals', label: 'Onay Merkezi', icon: CheckCircle2 },
    { href: '/admin/merge-tool', label: 'Kayıt Birleştirme', icon: GitMerge },
    { href: '/admin/logs', label: 'Denetim Logları', icon: ScrollText },
    { href: '/admin/import-export', label: 'İçe / Dışa Aktar', icon: ArrowDownToLine },
  ];

  return (
    <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)' }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Yönetim Merkezi</h2>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Platform & Aile İdare Paneli</span>
          </div>
        </div>

        <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={14} />
          <span>Arşive Dön</span>
        </Link>
      </div>

      {/* Nav Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '4px' }}>
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                background: isActive ? 'var(--text-primary)' : 'var(--bg-surface)',
                color: isActive ? 'var(--bg-main)' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'var(--text-primary)' : 'var(--border-subtle)'}`,
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={14} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <div>
        {children}
      </div>

    </div>
  );
}

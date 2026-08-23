'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { GitGraph, MessageSquareText, Landmark, ShieldAlert, Plus, Sun, Moon, Search, LogOut, User, Shield } from 'lucide-react';
import { getCurrentUser, logoutUser, UserProfile, DEMO_ACCOUNTS } from '@/lib/services/authService';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUserState] = useState<UserProfile>(getCurrentUser());
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-theme');
      if (saved === 'light' || saved === 'dark') {
        document.documentElement.setAttribute('data-theme', saved);
        return saved;
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUserState(getCurrentUser());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app-theme', next);
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUserState(DEMO_ACCOUNTS.member.profile);
    setShowUserMenu(false);
    router.push('/login');
  };

  const navLinks = [
    { href: '/', label: 'Arşiv', icon: Search },
    { href: '/tree', label: 'Soy Ağacı', icon: GitGraph },
    { href: '/ai-chat', label: 'Hafıza Asistanı', icon: MessageSquareText },
    { href: '/family-vault', label: 'Aile Kasası', icon: Landmark },
    { href: '/admin', label: 'Yönetim', icon: ShieldAlert },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          
          {/* Logo / Brand */}
          <Link href="/" className={styles.brand}>
            <div className={styles.crest}>
              <span className={styles.crestLetter}>Y</span>
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>Yılmaz Ailesi</span>
              <span className={styles.brandSubtitle}>Dijital Arşiv & Şecere</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} className={styles.navIcon} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Vault Balance Pill */}
            <Link href="/family-vault" className={styles.vaultPill}>
              <span className={styles.vaultDot} />
              <span className={styles.vaultAmount}>{currentUser.credits.toLocaleString('tr-TR')}</span>
              <span className={styles.vaultUnit}>Kredi</span>
            </Link>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className={styles.iconBtn} 
              aria-label="Temayı Değiştir"
              title="Aydınlık / Karanlık Tema"
            >
              {theme === 'dark' ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
            </button>

            {/* Quick Upload Button */}
            <Link href="/media/upload" className={styles.uploadBtn}>
              <Plus size={15} strokeWidth={2.4} />
              <span>Hatıra Ekle</span>
            </Link>

            {/* User Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={styles.avatarBtn} 
                title={`${currentUser.name} (${currentUser.roleLabel})`}
              >
                <div className={styles.avatar}>{currentUser.name.charAt(0)}</div>
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '220px',
                  background: 'var(--bg-surface-solid)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '12px',
                  zIndex: 200,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <strong style={{ display: 'block', fontSize: '0.86rem', color: 'var(--text-primary)' }}>{currentUser.name}</strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--brand-primary)', fontWeight: 600 }}>{currentUser.roleLabel}</span>
                  </div>

                  <Link 
                    href="/admin" 
                    onClick={() => setShowUserMenu(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: 'var(--radius-xs)', color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}
                  >
                    <Shield size={14} />
                    <span>Yönetim Paneli</span>
                  </Link>

                  <Link 
                    href="/login" 
                    onClick={() => setShowUserMenu(false)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: 'var(--radius-xs)', color: 'var(--text-secondary)', fontSize: '0.8rem', textDecoration: 'none' }}
                  >
                    <User size={14} />
                    <span>Hesap Değiştir</span>
                  </Link>

                  <button 
                    onClick={handleLogout}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: 'var(--radius-xs)', color: 'var(--accent-rose)', background: 'transparent', border: 'none', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', width: '100%' }}
                  >
                    <LogOut size={14} />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className={styles.mobileNav}>
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileNavItem} ${isActive ? styles.mobileNavActive : ''}`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.2 : 1.7} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

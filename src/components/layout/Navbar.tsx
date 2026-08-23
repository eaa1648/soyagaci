'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const navItems = [
    { href: '/', label: 'Ana Sayfa', icon: '🏛️' },
    { href: '/tree', label: 'Soy Ağacı', icon: '🌳' },
    { href: '/ai-chat', label: 'Hafıza AI', icon: '✨', badge: 'Gemini' },
    { href: '/family-vault', label: 'Aile Kasası', icon: '💎' },
    { href: '/admin', label: 'Yönetim', icon: '🛡️' },
  ];

  // If we are in the full-screen tree view, render minimal overlay navbar
  const isTreeView = pathname === '/tree';

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${isTreeView ? styles.treeHeader : ''}`}>
        <div className={styles.navContainer}>
          
          {/* Logo & Family Crest */}
          <Link href="/" className={styles.logoGroup}>
            <div className={styles.crestIcon}>
              <span>🌳</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.brandTitle}>AİLE HAFIZASI</span>
              <span className={styles.brandSubtitle}>Yılmaz Hanedanı • 1880 - 2026</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav}>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
                >
                  <span className={styles.linkIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Widgets */}
          <div className={styles.rightActions}>
            
            {/* Live Credit Pill */}
            <Link href="/family-vault" className={styles.creditPill} title="Mevcut Aile ve Bireysel Kredi Bakiyesi">
              <span className={styles.creditSparkle}>✨</span>
              <span className={styles.creditAmount}>2,550</span>
              <span className={styles.creditUnit}>Kredi</span>
            </Link>

            {/* Quick Upload Action */}
            <Link href="/media/upload" className={styles.uploadBtn}>
              <span>+</span>
              <span className={styles.uploadBtnText}>Hatıra Ekle</span>
            </Link>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className={styles.themeToggle} 
              aria-label="Temayı Değiştir"
              title={theme === 'dark' ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* User Profile Avatar */}
            <Link href="/admin" className={styles.userAvatarBtn} title="Hesabım & Roller">
              <div className={styles.avatarCircle}>A</div>
              <span className={styles.onlineDot} />
            </Link>

            {/* Mobile Hamburger */}
            <button 
              className={styles.mobileHamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menüyü Aç"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={styles.mobileMenuDropdown}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.mobileMenuItem}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className={styles.linkIcon}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
              </Link>
            ))}
            <div className={styles.mobileMenuFooter}>
              <Link 
                href="/media/upload" 
                className={styles.mobileUploadAction}
                onClick={() => setMobileMenuOpen(false)}
              >
                + Yeni Hatıra veya Kişi Ekle
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar (App Experience) */}
      <div className={styles.bottomNav}>
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.bottomNavItem} ${isActive ? styles.bottomNavActive : ''}`}
            >
              <span className={styles.bottomNavIcon}>{item.icon}</span>
              <span className={styles.bottomNavLabel}>{item.label}</span>
            </Link>
          );
        })}
        <Link 
          href="/media/upload" 
          className={`${styles.bottomNavItem} ${pathname === '/media/upload' ? styles.bottomNavActive : ''}`}
        >
          <span className={styles.bottomNavIcon}>📸</span>
          <span className={styles.bottomNavLabel}>Ekle</span>
        </Link>
      </div>
    </>
  );
}

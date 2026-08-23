'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { GitGraph, MessageSquareText, Landmark, ShieldAlert, Plus, Sun, Moon, Search } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
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

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('app-theme', next);
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
              <span className={styles.vaultAmount}>2.550</span>
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

            {/* User Avatar */}
            <Link href="/person/5" className={styles.avatarLink} title="Profilim (Ahmet Yılmaz)">
              <div className={styles.avatar}>A</div>
            </Link>
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

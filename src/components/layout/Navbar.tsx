'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Navbar.module.css';
import { 
  GitGraph, 
  MessageSquareText, 
  Landmark, 
  ShieldAlert, 
  Plus, 
  Sun, 
  Moon, 
  Search, 
  LogOut, 
  User, 
  Shield, 
  LogIn,
  Edit3
} from 'lucide-react';
import { getCurrentUser, logoutUser, updateFamilyName, UserProfile } from '@/lib/services/authService';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUserState] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      return getCurrentUser();
    }
    return null;
  });
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [editingFamily, setEditingFamily] = useState(false);
  const [newFamilyInput, setNewFamilyInput] = useState('');

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
    setCurrentUserState(null);
    setShowUserMenu(false);
    router.push('/login');
  };

  const handleSaveFamilyName = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFamilyInput.trim()) {
      updateFamilyName(newFamilyInput.trim());
      setEditingFamily(false);
    }
  };

  const familyTitle = currentUser?.familyName || 'Şecere';
  const crestLetter = familyTitle.charAt(0).toUpperCase();

  const loggedInNavLinks = [
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
              <span className={styles.crestLetter}>{crestLetter}</span>
            </div>
            <div className={styles.brandText}>
              <span className={styles.brandTitle}>
                {currentUser ? currentUser.familyName : 'Şecere'}
              </span>
              <span className={styles.brandSubtitle}>
                {currentUser ? 'Dijital Aile Arşivi' : 'Dijital Aile Mirası & Soyağacı'}
              </span>
            </div>
          </Link>

          {/* Navigation */}
          {currentUser ? (
            <nav className={styles.desktopNav}>
              {loggedInNavLinks.map(({ href, label, icon: Icon }) => {
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
          ) : (
            <nav className={styles.desktopNav}>
              <Link href="/tree" className={styles.navItem}>
                <GitGraph size={16} className={styles.navIcon} />
                <span>Örnek Soyağacı</span>
              </Link>
              <Link href="/ai-chat" className={styles.navItem}>
                <MessageSquareText size={16} className={styles.navIcon} />
                <span>Yapay Zekâ Hafıza</span>
              </Link>
            </nav>
          )}

          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className={styles.iconBtn} 
              aria-label="Temayı Değiştir"
              title="Aydınlık / Karanlık Tema"
            >
              {theme === 'dark' ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
            </button>

            {currentUser ? (
              <>
                {/* Vault Balance Pill */}
                <Link href="/family-vault" className={styles.vaultPill}>
                  <span className={styles.vaultDot} />
                  <span className={styles.vaultAmount}>{currentUser.credits.toLocaleString('tr-TR')}</span>
                  <span className={styles.vaultUnit}>Kredi</span>
                </Link>

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
                      width: '240px',
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
                        
                        <div style={{ marginTop: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span>{currentUser.familyName}</span>
                          <button 
                            onClick={() => { setEditingFamily(true); setNewFamilyInput(currentUser.familyName); }}
                            style={{ background: 'transparent', border: 'none', color: 'var(--brand-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.72rem' }}
                          >
                            <Edit3 size={11} /> Düzenle
                          </button>
                        </div>
                      </div>

                      {editingFamily && (
                        <form onSubmit={handleSaveFamilyName} style={{ display: 'flex', gap: '4px', margin: '4px 0' }}>
                          <input 
                            type="text" 
                            value={newFamilyInput}
                            onChange={(e) => setNewFamilyInput(e.target.value)}
                            placeholder="Örn: Kaya Ailesi"
                            style={{ flex: 1, padding: '4px 8px', fontSize: '0.76rem', borderRadius: 'var(--radius-xs)', border: '1px solid var(--border-medium)', background: 'var(--bg-main)', color: 'var(--text-primary)', outline: 'none' }}
                          />
                          <button type="submit" style={{ padding: '4px 8px', fontSize: '0.72rem', background: 'var(--brand-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer' }}>
                            Kaydet
                          </button>
                        </form>
                      )}

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
                        <span>Hesap Değiştir / Demo</span>
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
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link href="/login" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500 }}>
                  <LogIn size={14} />
                  <span>Giriş Yap</span>
                </Link>

                <Link href="/register" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 16px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-primary)', color: '#FFFFFF', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600 }}>
                  <span>Soyağacı Oluştur</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      {currentUser && (
        <nav className={styles.mobileNav}>
          {loggedInNavLinks.map(({ href, label, icon: Icon }) => {
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
      )}
    </>
  );
}

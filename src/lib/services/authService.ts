export interface UserProfile {
  id: string;
  name: string;
  email: string;
  familyName: string; // e.g. "Yılmaz Ailesi", "Kaya Ailesi"
  role: 'platform_admin' | 'family_admin' | 'user';
  roleLabel: string;
  credits: number;
}

export const DEMO_ACCOUNTS: { [key: string]: { email: string; pass: string; profile: UserProfile } } = {
  admin: {
    email: 'admin@secere.app',
    pass: 'admin123',
    profile: {
      id: 'admin-1',
      name: 'Yönetici (Platform Admin)',
      email: 'admin@secere.app',
      familyName: 'Yılmaz Ailesi',
      role: 'platform_admin',
      roleLabel: 'Platform Yöneticisi',
      credits: 9999
    }
  },
  family_admin: {
    email: 'ali@yilmaz.com',
    pass: 'ali123',
    profile: {
      id: '3',
      name: 'Ali Yılmaz',
      email: 'ali@yilmaz.com',
      familyName: 'Yılmaz Ailesi',
      role: 'family_admin',
      roleLabel: 'Aile Yöneticisi',
      credits: 550
    }
  },
  member: {
    email: 'ahmet@yilmaz.com',
    pass: 'ahmet123',
    profile: {
      id: '5',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@yilmaz.com',
      familyName: 'Yılmaz Ailesi',
      role: 'user',
      roleLabel: 'Aile Üyesi',
      credits: 100
    }
  }
};

export function getCurrentUser(): UserProfile | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const stored = localStorage.getItem('active_user_session');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return null;
}

export function setCurrentUser(user: UserProfile) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('active_user_session', JSON.stringify(user));
    window.dispatchEvent(new Event('storage'));
  }
}

export function updateFamilyName(newFamilyName: string) {
  const current = getCurrentUser();
  if (current) {
    current.familyName = newFamilyName;
    setCurrentUser(current);
  }
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('active_user_session');
    window.dispatchEvent(new Event('storage'));
  }
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'platform_admin' | 'family_admin' | 'user';
  roleLabel: string;
  credits: number;
}

export const DEMO_ACCOUNTS: { [key: string]: { email: string; pass: string; profile: UserProfile } } = {
  admin: {
    email: 'admin@yilmaz.com',
    pass: 'admin123',
    profile: {
      id: 'admin-1',
      name: 'Yönetici (Platform Admin)',
      email: 'admin@yilmaz.com',
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
      role: 'user',
      roleLabel: 'Aile Üyesi',
      credits: 100
    }
  }
};

export function getCurrentUser(): UserProfile {
  if (typeof window === 'undefined') {
    return DEMO_ACCOUNTS.member.profile;
  }
  const stored = localStorage.getItem('active_user_session');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {}
  }
  return DEMO_ACCOUNTS.member.profile;
}

export function setCurrentUser(user: UserProfile) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('active_user_session', JSON.stringify(user));
  }
}

export function logoutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('active_user_session');
  }
}

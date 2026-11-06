import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  isGuest: boolean;
  score: number;
}

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<boolean>;
  loginWithEmail: (email: string, pass: string, name?: string) => Promise<boolean>;
  loginAsGuest: (name: string, avatar: string) => void;
  updateProfile: (name: string, avatar: string) => void;
  logout: () => void;
}

const DEFAULT_GUEST: UserProfile = {
  id: 'guest_anchor_1',
  name: 'أحمد المذيع',
  avatar: '🎙️',
  isGuest: true,
  score: 120
};

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_GUEST,
  isAuthenticated: false,
  loginWithGoogle: async () => false,
  loginWithEmail: async () => false,
  loginAsGuest: () => {},
  updateProfile: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('late_show_auth_status') === 'true';
    }
    return false;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('late_show_user_profile');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_GUEST;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('late_show_user_profile', JSON.stringify(user));
      localStorage.setItem('late_show_auth_status', isAuthenticated ? 'true' : 'false');
    }
  }, [user, isAuthenticated]);

  // تسجيل الدخول بحساب Google
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      // محاكاة تدفق جوجل الرسمي مع حفظ بيانات الحساب الحقيقي
      const googleUser: UserProfile = {
        id: `google_${Date.now()}`,
        name: user.name !== DEFAULT_GUEST.name ? user.name : 'حمزة حسين',
        avatar: '🌟',
        email: 'hamzahussien2357@gmail.com',
        isGuest: false,
        score: 180
      };
      setUser(googleUser);
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Google Sign-In failed', err);
      return false;
    }
  };

  // تسجيل الدخول بالبريد الإلكتروني وكلمة المرور
  const loginWithEmail = async (email: string, pass: string, name?: string): Promise<boolean> => {
    const derivedName = name?.trim() || email.split('@')[0] || 'نجم الاستوديو';
    const emailUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: derivedName,
      avatar: '🎬',
      email: email,
      isGuest: false,
      score: 140
    };
    setUser(emailUser);
    setIsAuthenticated(true);
    return true;
  };

  // الدخول السريع كزائر
  const loginAsGuest = (name: string, avatar: string) => {
    const finalName = name.trim() || 'نجم الاستوديو';
    const guestUser: UserProfile = {
      id: `guest_${Date.now()}`,
      name: finalName,
      avatar: avatar || '🎙️',
      isGuest: true,
      score: 100
    };
    setUser(guestUser);
    setIsAuthenticated(true);
  };

  const updateProfile = (name: string, avatar: string) => {
    setUser((prev) => ({
      ...prev,
      name: name.trim() || prev.name,
      avatar: avatar || prev.avatar
    }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(DEFAULT_GUEST);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('late_show_auth_status');
      localStorage.removeItem('late_show_user_profile');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loginWithGoogle, loginWithEmail, loginAsGuest, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

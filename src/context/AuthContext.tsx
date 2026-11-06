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
  loginWithGoogle: () => void;
  loginAsGuest: (name: string, avatar: string) => void;
  updateProfile: (name: string, avatar: string) => void;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'guest_anchor_1',
  name: 'أحمد المذيع',
  avatar: '🎙️',
  isGuest: true,
  score: 120
};

const AuthContext = createContext<AuthContextType>({
  user: DEFAULT_USER,
  loginWithGoogle: () => {},
  loginAsGuest: () => {},
  updateProfile: () => {},
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('comedy_studio_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('comedy_studio_user', JSON.stringify(user));
    }
  }, [user]);

  const loginWithGoogle = () => {
    // محاكاة تسجيل الدخول بحساب جوجل مع بيانات واضحة
    const googleUser: UserProfile = {
      id: `google_${Date.now()}`,
      name: 'كريم الجوكر',
      avatar: '🌟',
      email: 'karim.star@gmail.com',
      isGuest: false,
      score: 150
    };
    setUser(googleUser);
  };

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
  };

  const updateProfile = (name: string, avatar: string) => {
    setUser((prev) => ({
      ...prev,
      name: name.trim() || prev.name,
      avatar: avatar || prev.avatar
    }));
  };

  const logout = () => {
    setUser(DEFAULT_USER);
    localStorage.removeItem('comedy_studio_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, loginAsGuest, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

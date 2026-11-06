import React, { useState } from 'react';
import { X, User, Sparkles, Check, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { translations, Language } from '../i18n/translations';
import { soundEffects } from '../utils/soundEffects';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const AVAILABLE_AVATARS = [
  { emoji: '🎙️', label: 'مذيع' },
  { emoji: '🎥', label: 'مراسل' },
  { emoji: '🤡', label: 'مهرج' },
  { emoji: '🎬', label: 'مخرج' },
  { emoji: '🌟', label: 'نجم' },
  { emoji: '🕵️‍♂️', label: 'متحري' },
  { emoji: '😎', label: 'كول' },
  { emoji: '👑', label: 'مشرف' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const { user, loginWithGoogle, loginAsGuest } = useAuth();
  const t = translations[lang];

  const [guestName, setGuestName] = useState(user.name);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [activeTab, setActiveTab] = useState<'guest' | 'google'>('guest');

  if (!isOpen) return null;

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playVoteClick();
    loginAsGuest(guestName, selectedAvatar);
    onClose();
  };

  const handleGoogleSubmit = () => {
    soundEffects.playVoteClick();
    loginWithGoogle();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden text-right">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* رأس المودال */}
        <div className="text-center space-y-1.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-500 mx-auto flex items-center justify-center text-2xl shadow-lg shadow-red-950/50">
            🎭
          </div>
          <h3 className="text-xl font-black text-white">{t.authTitle}</h3>
          <p className="text-xs text-slate-400">
            اختر طريقة تسجيل دخولك لظهور اسمك وصورتك في شاشة الاستوديو
          </p>
        </div>

        {/* أزرار التبديل بين الزائر وجوجل */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('guest')}
            className={`py-2 rounded-lg transition ${
              activeTab === 'guest'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.playAsGuest}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`py-2 rounded-lg transition ${
              activeTab === 'google'
                ? 'bg-red-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Google
          </button>
        </div>

        {/* تبويب الزائر السريع */}
        {activeTab === 'guest' ? (
          <form onSubmit={handleGuestSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-300">
                اسم اللاعب في الاستوديو:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder={t.guestNamePlaceholder}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-red-500 font-medium"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                {t.selectAvatar}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {AVAILABLE_AVATARS.map((av) => (
                  <button
                    key={av.emoji}
                    type="button"
                    onClick={() => setSelectedAvatar(av.emoji)}
                    className={`p-2.5 rounded-xl text-2xl transition border flex flex-col items-center gap-1 ${
                      selectedAvatar === av.emoji
                        ? 'bg-red-950/80 border-red-500 shadow-md ring-1 ring-red-400'
                        : 'bg-slate-950 border-slate-800 hover:bg-slate-850'
                    }`}
                  >
                    <span>{av.emoji}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{av.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-lg shadow-red-950 transition active:scale-95 cursor-pointer"
            >
              {t.continueBtn}
            </button>
          </form>
        ) : (
          /* تبويب جوجل */
          <div className="space-y-4 text-center py-2">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-full bg-white mx-auto flex items-center justify-center shadow">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">تسجيل الدخول بـ Google</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  حفظ نقاطك وترتيبك في لوحة صدارة الاستوديو تلقائياً
                </p>
              </div>
            </div>

            <button
              onClick={handleGoogleSubmit}
              className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-sm shadow transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.googleSignIn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

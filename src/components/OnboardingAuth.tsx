import React, { useState } from 'react';
import { 
  Tv, Sparkles, User, Mail, Lock, ArrowRight, ShieldCheck, 
  HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Radio
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { soundEffects } from '../utils/soundEffects';
import { Language, translations } from '../i18n/translations';

interface OnboardingAuthProps {
  lang: Language;
}

const AVAILABLE_AVATARS = [
  { emoji: '🎙️', label: 'المذيع' },
  { emoji: '🎥', label: 'مراسل' },
  { emoji: '🤡', label: 'مهرج' },
  { emoji: '🎬', label: 'المخرج' },
  { emoji: '🌟', label: 'نجم' },
  { emoji: '🕵️‍♂️', label: 'المتحري' },
  { emoji: '😎', label: 'كول' },
  { emoji: '👑', label: 'المشرف' },
];

export const OnboardingAuth: React.FC<OnboardingAuthProps> = ({ lang }) => {
  const { loginWithGoogle, loginWithEmail, loginAsGuest } = useAuth();
  const t = translations[lang];

  const [authMode, setAuthMode] = useState<'guest' | 'email' | 'register'>('guest');
  const [guestName, setGuestName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🎙️');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerName, setRegisterName] = useState('');

  const [showGoogleInfo, setShowGoogleInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playVoteClick();
    loginAsGuest(guestName || 'نجم الاستوديو', selectedAvatar);
  };

  const handleGoogleSubmit = async () => {
    soundEffects.playVoteClick();
    setLoading(true);
    await loginWithGoogle();
    setLoading(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playVoteClick();
    setLoading(true);
    await loginWithEmail(email, password, registerName);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* خلفيات إضاءة مسرحية نيون */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-6 relative z-10">
        {/* اللوجو والبراندينج Late Show */}
        <div className="text-center space-y-2">
          <div className="inline-flex relative mb-1">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-xl shadow-red-950/60 ring-2 ring-red-400/40">
              <Tv className="w-8 h-8 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <span>Late Show</span>
              <span className="text-xs bg-red-900/80 text-red-300 border border-red-700/60 px-2 py-0.5 rounded-full font-bold">
                LIVE
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              استوديو النشرة الكوميدية • لعبة الحفلات الجماعية مع الأصدقاء
            </p>
          </div>
        </div>

        {/* بطاقة التعريف السريعة بالأطوار */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-1">
            <div className="text-red-400 font-bold flex items-center gap-1">
              <span>🎙️</span>
              <span>المذيع المتورط</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              اقرأ النشرة بجدية والجمهور يحقن كلمات محرجة لإضحاكك!
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-2xl space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1">
              <span>🤫</span>
              <span>السر الكوميدي</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              سؤال محرج والكل يكتب إجابة سرية وتصويت أعمى لأضحك رد!
            </p>
          </div>
        </div>

        {/* صندوق تسجيل الدخول الموحد */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 backdrop-blur-md">
          {/* زر تسجيل الدخول بجوجل الرسمي */}
          <button
            onClick={handleGoogleSubmit}
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs sm:text-sm shadow-md transition active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
            <span>المتابعة بحساب Google</span>
          </button>

          {/* خط فاصل */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full"></div>
            <span className="bg-slate-900 px-3 text-[11px] text-slate-500 font-bold uppercase shrink-0">
              أو اختر طريقتك
            </span>
          </div>

          {/* تبويبات الخيارات: زائر سريع vs إيميل */}
          <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode('guest')}
              className={`py-2 rounded-lg transition ${
                authMode === 'guest'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              دخول سريع كـ زائر
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('email')}
              className={`py-2 rounded-lg transition ${
                authMode === 'email' || authMode === 'register'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              بالبريد الإلكتروني
            </button>
          </div>

          {/* 1. خيار الزائر السريع */}
          {authMode === 'guest' && (
            <form onSubmit={handleGuestSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-300">
                  اسمك في الاستوديو:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="اكتب اسمك أو لقبك هنا..."
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-red-500 font-medium"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  اختر شخصيتك وأفاتارك:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_AVATARS.map((av) => (
                    <button
                      key={av.emoji}
                      type="button"
                      onClick={() => setSelectedAvatar(av.emoji)}
                      className={`p-2 rounded-xl text-xl transition border flex flex-col items-center gap-1 ${
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
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-sm shadow-lg shadow-red-950 transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>دخول الاستوديو كـ {selectedAvatar} {guestName || 'ضيف'}</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </form>
          )}

          {/* 2. خيار البريد الإلكتروني */}
          {(authMode === 'email' || authMode === 'register') && (
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              {authMode === 'register' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-300">الاسم:</label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="اسمك الكامل أو لقب الشهرة"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3.5 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-red-500"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">البريد الإلكتروني:</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3.5 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-red-500"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-300">كلمة المرور:</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-700 text-slate-100 px-3.5 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-red-500"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-md transition active:scale-95 cursor-pointer"
              >
                {authMode === 'register' ? 'إنشاء حساب ودخول' : 'تسجيل الدخول'}
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'register' ? 'email' : 'register')}
                  className="text-xs text-red-400 hover:underline"
                >
                  {authMode === 'register'
                    ? 'لديك حساب بالفعل؟ سجل دخولك'
                    : 'ليس لديك حساب؟ أنشئ حساباً جديداً'}
                </button>
              </div>
            </form>
          )}

          {/* صندوق شرح متطلبات تفعيل Google Sign-In الإنتاجي في Vercel */}
          <div className="border-t border-slate-800 pt-3">
            <button
              type="button"
              onClick={() => setShowGoogleInfo(!showGoogleInfo)}
              className="flex items-center justify-between w-full text-[11px] text-slate-400 hover:text-slate-200 transition"
            >
              <span className="flex items-center gap-1.5 font-bold">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>ما المطلوب لربط تسجيل دخول Google على الدومين الحقيقي؟</span>
              </span>
              {showGoogleInfo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showGoogleInfo && (
              <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5 leading-relaxed">
                <p>
                  لربط تسجيل دخول Google الفعلي على Vercel أو دومينك الخاص، تحتاج فقط إلى:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                  <li>إنشاء <strong>OAuth 2.0 Client ID</strong> مجاني من <a href="https://console.cloud.google.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">Google Cloud Console</a>.</li>
                  <li>إضافة رابط موقعك (مثل <code className="text-amber-300 font-mono">https://late-show.vercel.app</code>) في Authorized JavaScript origins.</li>
                  <li>وضع الـ <code className="text-amber-300 font-mono">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code> في متغيرات بيئة Vercel!</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

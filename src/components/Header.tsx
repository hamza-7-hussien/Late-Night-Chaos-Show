import React, { useState } from 'react';
import { Tv, Volume2, VolumeX, Languages, Radio } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { Language, translations } from '../i18n/translations';
import { useAuth } from '../context/AuthContext';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  onOpenAuth
}) => {
  const [muted, setMuted] = useState(soundEffects.isMuted);
  const { user } = useAuth();
  const t = translations[lang];

  const toggleSound = () => {
    soundEffects.isMuted = !muted;
    setMuted(!muted);
    if (muted) {
      soundEffects.playVoteClick();
    }
  };

  const toggleLanguage = () => {
    soundEffects.playVoteClick();
    const newLang: Language = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* اللوجو وعنوان اللعبة فقط */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-md shadow-red-950/40 shrink-0">
            <Tv className="w-5 h-5 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                {lang === 'ar' ? 'استوديو النشرة الكوميدية' : 'Late Night Chaos Show'}
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-red-950/90 text-red-400 border border-red-800/70 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {lang === 'ar' ? 'Late Night Chaos Show • لعبة الحفلات الجماعية' : 'Live Multiplayer Party Game'}
            </p>
          </div>
        </div>

        {/* عناصر التحكم النظيفة: لغة + تثبيت PWA + بروفايل + صوت */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* زر تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition active:scale-95"
            title="Switch Language / تبديل اللغة"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[11px]">{lang === 'ar' ? 'English' : 'عربي'}</span>
          </button>

          {/* زر تنزيل التطبيق PWA */}
          <PWAInstallButton lang={lang} />

          {/* الملف الشخصي للمستخدم */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 text-xs font-bold transition active:scale-95"
            title="تعديل الحساب والبروفايل"
          >
            <span className="text-base leading-none">{user.avatar}</span>
            <span className="max-w-[75px] sm:max-w-[100px] truncate text-slate-200 text-xs">
              {user.name}
            </span>
          </button>

          {/* زر كتم / تشغيل الصوت */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl text-xs border transition ${
              muted
                ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/40'
            }`}
            title={muted ? 'تفعيل الصوت' : 'كتم الصوت'}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

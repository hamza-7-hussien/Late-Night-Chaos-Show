import React, { useState } from 'react';
import { 
  Tv, Volume2, VolumeX, Languages, Radio, Settings, 
  Smartphone, User, Mic, MicOff, Headphones
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';
import { Language, translations } from '../i18n/translations';
import { useAuth } from '../context/AuthContext';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenPlayerSettings: () => void;
  onOpenRoomSettings: () => void;
  micMuted: boolean;
  onToggleMic: () => void;
  speakerMuted: boolean;
  onToggleSpeaker: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  onOpenPlayerSettings,
  onOpenRoomSettings,
  micMuted,
  onToggleMic,
  speakerMuted,
  onToggleSpeaker
}) => {
  const { user } = useAuth();
  const t = translations[lang];

  const toggleLanguage = () => {
    soundEffects.playVoteClick();
    const newLang: Language = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md sticky top-0 z-40 w-full">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* اللوجو وعنوان Late Show */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-md shadow-red-950/40 shrink-0">
            <Tv className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm sm:text-base font-black tracking-tight text-white truncate">
                Late Show
              </h1>
              <span className="inline-flex items-center gap-1 text-[9px] font-bold bg-red-950/90 text-red-400 border border-red-800/70 px-1.5 py-0.2 rounded-full shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                LIVE
              </span>
            </div>
            <p className="text-[10px] text-slate-400 truncate hidden xs:block">
              {lang === 'ar' ? 'استوديو النشرة الكوميدية' : 'Comedy News Studio'}
            </p>
          </div>
        </div>

        {/* عناصر التحكم العلوية المتجاوبة تماماً مع شاشات الموبايل */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* زر المايكروفون السريع */}
          <button
            onClick={onToggleMic}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold border transition active:scale-95 flex items-center gap-1 ${
              micMuted
                ? 'bg-rose-950/40 border-rose-800/80 text-rose-400'
                : 'bg-emerald-950/40 border-emerald-800/80 text-emerald-300'
            }`}
            title={micMuted ? 'تشغيل المايك' : 'كتم المايك'}
          >
            {micMuted ? <MicOff className="w-3.5 h-3.5 text-rose-400" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
            <span className="hidden md:inline text-[11px]">{micMuted ? 'مكتوم' : 'مايك'}</span>
          </button>

          {/* زر السماعة السريع */}
          <button
            onClick={onToggleSpeaker}
            className={`p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-bold border transition active:scale-95 flex items-center gap-1 ${
              speakerMuted
                ? 'bg-slate-900 border-slate-800 text-slate-500'
                : 'bg-cyan-950/40 border-cyan-800/80 text-cyan-300'
            }`}
            title={speakerMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px]">{speakerMuted ? 'صامت' : 'صوت'}</span>
          </button>

          {/* زر تبديل اللغة */}
          <button
            onClick={toggleLanguage}
            className="px-2 py-1.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition active:scale-95 flex items-center gap-1"
            title="تبديل اللغة / Switch Language"
          >
            <Languages className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono text-[10px] sm:text-xs">{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>

          {/* زر تنزيل PWA */}
          <div className="hidden sm:block">
            <PWAInstallButton lang={lang} />
          </div>

          {/* الملف الشخصي للمستخدم وفتح إعدادات اللاعب */}
          <button
            onClick={onOpenPlayerSettings}
            className="flex items-center gap-1.5 px-2 py-1 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 text-xs font-bold transition active:scale-95"
            title="إعدادات اللاعب"
          >
            <span className="text-sm sm:text-base leading-none">{user.avatar}</span>
            <span className="max-w-[55px] sm:max-w-[90px] truncate text-slate-200 text-[11px] sm:text-xs">
              {user.name}
            </span>
          </button>

          {/* زر إعدادات الروم للمشرف */}
          <button
            onClick={onOpenRoomSettings}
            className="p-1.5 rounded-xl text-xs bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 transition"
            title="إعدادات الاستوديو"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

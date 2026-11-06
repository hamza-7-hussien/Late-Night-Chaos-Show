import React, { useState } from 'react';
import { Smartphone, Download, X, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { translations, Language } from '../i18n/translations';
import { soundEffects } from '../utils/soundEffects';

interface PWAInstallButtonProps {
  lang: Language;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ lang }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const t = translations[lang];

  // إخفاء الزر إذا كان التطبيق مثبتاً بالفعل على الجهاز
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    soundEffects.playVoteClick();
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Fallback dialog
      setShowIOSModal(true);
    }
  };

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600/30 to-amber-600/30 hover:from-red-600/40 hover:to-amber-600/40 text-amber-200 border border-amber-500/40 shadow-sm transition active:scale-95 cursor-pointer"
        title={t.installAppTitle}
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden sm:inline">{t.installAppBtn}</span>
        <span className="sm:hidden">تنزيل التطبيق 📲</span>
      </button>

      {/* مودال شرح التثبيت لـ iOS Safari والأنظمة الأخرى */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-right space-y-4">
            <button
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 left-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/60 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center text-2xl">
                📲
              </div>
              <h4 className="text-base font-black text-white">{t.iosInstallGuideTitle}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.installAppDesc}
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-600/30 text-red-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  1
                </span>
                <p>
                  اضغط على زر <strong className="text-white">المشاركة (Share)</strong>{' '}
                  <Share2 className="w-3.5 h-3.5 inline text-cyan-400" /> في متصفح Safari أسفل الشاشة.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-amber-600/30 text-amber-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  2
                </span>
                <p>
                  مرر للأسفل واضغط على{' '}
                  <strong className="text-white">إضافة إلى الشاشة الرئيسية (Add to Home Screen)</strong>{' '}
                  <PlusSquare className="w-3.5 h-3.5 inline text-emerald-400" />.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

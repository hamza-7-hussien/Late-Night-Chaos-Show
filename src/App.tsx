/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { GameSimulator } from './components/GameSimulator';
import { AuthModal } from './components/AuthModal';
import { AuthProvider } from './context/AuthContext';
import { Language, translations } from './i18n/translations';

function MainApp() {
  const [lang, setLang] = useState<Language>('ar');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const t = translations[lang];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-red-500 selection:text-white ${lang === 'en' ? 'font-sans' : ''}`}>
      {/* رأس اللعبة النظيف والمبسط */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* شاشة اللعبة الحية الخالصة */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <GameSimulator lang={lang} />
      </main>

      {/* التذييل البسيط للعبة */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-right">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="font-bold text-slate-400">Late Night Chaos Show</span>
            <span>• {lang === 'ar' ? 'استوديو النشرة الكوميدية' : 'Party Game Studio'}</span>
          </div>

          <p className="text-slate-600 text-[11px]">
            {lang === 'ar' ? 'لعبة جماعية للأصحاب • طور المذيع المتورط + طور السر الكوميدي' : 'Playable Party Web Game • Realtime Multiplayer'}
          </p>
        </div>
      </footer>

      {/* نافذة تسجيل الدخول وحساب اللاعب */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

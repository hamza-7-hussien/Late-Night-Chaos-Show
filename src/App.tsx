/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { GameSimulator } from './components/GameSimulator';
import { OnboardingAuth } from './components/OnboardingAuth';
import { JoinRoomModal, RoomSettingsModal, PlayerSettingsModal } from './components/RoomModals';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Language, translations } from './i18n/translations';
import { RoomSettings } from './types/game';
import { soundEffects } from './utils/soundEffects';

const INITIAL_ROOM_SETTINGS: RoomSettings = {
  roomCode: 'LATE-99',
  roomName: 'استوديو السهرة الكوميدية',
  totalRounds: 5,
  roundTimerSeconds: 35,
  teleprompterSpeed: 'normal',
  laughDetectorSensitivity: 'medium',
  allowCustomSabotages: true,
  isPrivate: false,
};

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [lang, setLang] = useState<Language>('ar');

  // إعدادات وحالة الاستوديو
  const [roomSettings, setRoomSettings] = useState<RoomSettings>(INITIAL_ROOM_SETTINGS);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState(false);
  const [isRoomSettingsOpen, setIsRoomSettingsOpen] = useState(false);
  const [isPlayerSettingsOpen, setIsPlayerSettingsOpen] = useState(false);

  // حالة الصوت والمايكروفون
  const [micMuted, setMicMuted] = useState(false);
  const [speakerMuted, setSpeakerMuted] = useState(soundEffects.isMuted);

  const toggleMic = () => {
    soundEffects.playVoteClick();
    setMicMuted(!micMuted);
  };

  const toggleSpeaker = () => {
    soundEffects.isMuted = !speakerMuted;
    setSpeakerMuted(!speakerMuted);
    if (speakerMuted) {
      soundEffects.playVoteClick();
    }
  };

  const handleJoinRoom = (code: string) => {
    setRoomSettings((prev) => ({
      ...prev,
      roomCode: code.toUpperCase()
    }));
  };

  // إذا لم يكن مسجلاً الدخول أو جلسة جديدة -> اعرض صفحة الترحيب والتعريف وتسجيل الدخول أولاً!
  if (!isAuthenticated) {
    return <OnboardingAuth lang={lang} />;
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-red-500 selection:text-white ${lang === 'en' ? 'font-sans' : ''}`}>
      {/* رأس اللعبة المتجاوب بالكامل مع الموبايل */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenPlayerSettings={() => setIsPlayerSettingsOpen(true)}
        onOpenRoomSettings={() => setIsRoomSettingsOpen(true)}
        micMuted={micMuted}
        onToggleMic={toggleMic}
        speakerMuted={speakerMuted}
        onToggleSpeaker={toggleSpeaker}
      />

      {/* المحتوى الرئيسي للعبة */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <GameSimulator
          lang={lang}
          onOpenJoinRoom={() => setIsJoinRoomOpen(true)}
          onOpenRoomSettings={() => setIsRoomSettingsOpen(true)}
          micMuted={micMuted}
          speakerMuted={speakerMuted}
          roomSettings={roomSettings}
        />
      </main>

      {/* تذييل الاستوديو الخفيف */}
      <footer className="border-t border-slate-900 bg-slate-950 py-3 text-xs text-slate-500">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
            <span className="font-bold text-slate-400">Late Show</span>
            <span className="truncate">• {roomSettings.roomName}</span>
          </div>

          <span className="text-emerald-500 font-mono shrink-0">
            {roomSettings.roomCode}
          </span>
        </div>
      </footer>

      {/* نوافذ التحكم والمودالز */}
      <JoinRoomModal
        isOpen={isJoinRoomOpen}
        onClose={() => setIsJoinRoomOpen(false)}
        onJoin={handleJoinRoom}
        lang={lang}
      />

      <RoomSettingsModal
        isOpen={isRoomSettingsOpen}
        onClose={() => setIsRoomSettingsOpen(false)}
        settings={roomSettings}
        onSave={setRoomSettings}
        lang={lang}
      />

      <PlayerSettingsModal
        isOpen={isPlayerSettingsOpen}
        onClose={() => setIsPlayerSettingsOpen(false)}
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

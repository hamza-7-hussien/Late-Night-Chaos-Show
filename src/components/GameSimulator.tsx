import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Users, Sparkles, RefreshCw, Trophy, 
  Send, Radio, ChevronRight, Mic, MicOff,
  Copy, Check, Share2, Plus, Volume2, ShieldCheck,
  EyeOff, Headphones, AlertTriangle, Key, PlusCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GamePhase, GameMode, Player, SabotageWord, RoomSettings } from '../types/game';
import comedyData from '../data/comedyContent.json';
import { soundEffects } from '../utils/soundEffects';
import { laughDetector } from '../utils/laughDetector';
import { Language, translations } from '../i18n/translations';
import { useAuth } from '../context/AuthContext';

interface GameSimulatorProps {
  lang: Language;
  onOpenJoinRoom: () => void;
  onOpenRoomSettings: () => void;
  micMuted: boolean;
  speakerMuted: boolean;
  roomSettings: RoomSettings;
}

export const GameSimulator: React.FC<GameSimulatorProps> = ({
  lang,
  onOpenJoinRoom,
  onOpenRoomSettings,
  micMuted,
  speakerMuted,
  roomSettings
}) => {
  const { user } = useAuth();
  const t = translations[lang];

  const [phase, setPhase] = useState<GamePhase>('LOBBY');
  const [mode, setMode] = useState<GameMode>('ANCHOR_MAYHEM');
  const [copiedCode, setCopiedCode] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);

  // قائمة اللاعبين مع إمكانية إضافة بوت أو أصدقاء
  const [players, setPlayers] = useState<Record<string, Player>>({
    p1: { id: 'p1', name: user.name, avatar: user.avatar, score: user.score, isHost: true, isAnchor: true, isReady: true, connected: true, isMuted: micMuted },
    p2: { id: 'p2', name: 'سارة المشاغبة', avatar: '😎', score: 95, isHost: false, isAnchor: false, isReady: true, connected: true },
    p3: { id: 'p3', name: 'كريم التافه', avatar: '🤡', score: 140, isHost: false, isAnchor: false, isReady: true, connected: true },
    p4: { id: 'p4', name: 'منى المحققة', avatar: '🕵️‍♀️', score: 80, isHost: false, isAnchor: false, isReady: true, connected: true }
  });

  // مزامنة حالة المستخدم الحالي والمايك
  useEffect(() => {
    setPlayers((prev) => ({
      ...prev,
      p1: { ...prev.p1, name: user.name, avatar: user.avatar, isMuted: micMuted }
    }));
  }, [user.name, user.avatar, micMuted]);

  // حالة حساس الضحك التفاعلي
  const [laughCount, setLaughCount] = useState(1);
  const [laughDetectorActive, setLaughDetectorActive] = useState(false);
  const [currentAudioLevel, setCurrentAudioLevel] = useState(0);
  const [laughAlertTriggered, setLaughAlertTriggered] = useState(false);

  // تشغيل حساس الضحك الحقيقي عبر المايكروفون عند البث
  useEffect(() => {
    if ((phase === 'ANCHOR_BROADCAST') && laughDetectorActive && !micMuted) {
      laughDetector.startListening(
        () => {
          // رصد ضحكة عبر تردد المايك
          soundEffects.playLaughGiggle();
          setLaughCount((prev) => prev + 1);
          setLaughAlertTriggered(true);
          setTimeout(() => setLaughAlertTriggered(false), 2500);
        },
        (vol) => {
          setCurrentAudioLevel(vol);
        }
      );
    } else {
      laughDetector.stopListening();
      setCurrentAudioLevel(0);
    }
    return () => {
      laughDetector.stopListening();
    };
  }, [phase, laughDetectorActive, micMuted]);

  // بيانات طور المذيع المتورط
  const [selectedNewsIndex] = useState(0);
  const currentNews = comedyData.newsScripts[selectedNewsIndex] || comedyData.newsScripts[0];
  
  const [sabotageWords, setSabotageWords] = useState<SabotageWord[]>([
    { id: 'w1', senderId: 'p2', senderName: 'سارة', word: 'شبشب زنوبة فسفوري', insertedAtIndex: 0, revealed: true },
    { id: 'w2', senderId: 'p3', senderName: 'كريم', word: 'حلة محشي مسكونة', insertedAtIndex: 1, revealed: true },
    { id: 'w3', senderId: 'p4', senderName: 'منى', word: 'كيلو بطاطس عاطفية', insertedAtIndex: 2, revealed: false },
  ]);
  const [customSabotageInput, setCustomSabotageInput] = useState('');

  // بيانات طور السر الكوميدي
  const [selectedPromptIndex] = useState(0);
  const currentPrompt = comedyData.comedyPrompts[selectedPromptIndex] || comedyData.comedyPrompts[0];
  const [userSecretAnswer, setUserSecretAnswer] = useState('');
  const [secretAnswers, setSecretAnswers] = useState<Record<string, { id: string; text: string; authorId: string; votes: number }>>({
    a1: { id: 'a1', text: 'هقولهم: "شايف نفسي مكانك يا فندم وبوقع قرار خصم أسبوع من مرتبك!"', authorId: 'p3', votes: 2 },
    a2: { id: 'a2', text: 'هسكت ثانيتين وأقول: "في جزر المالديف، بس جيت هنا عشان بحب التكييف المركزي بتاعكم."', authorId: 'p1', votes: 3 },
    a3: { id: 'a3', text: 'بصراحة؟ شايف نفسي نايم في البيت ومش فاتح اللابتوب أصلاً.', authorId: 'p2', votes: 1 },
    a4: { id: 'a4', text: 'هنصحك تشتري بيتكوين عشان الشركة دي شكلها مش مكملة سنتين.', authorId: 'p4', votes: 0 },
  });
  const [userVotedAnswerId, setUserVotedAnswerId] = useState<string | null>(null);

  // مؤقت الجولة التنازلي
  const [timer, setTimer] = useState(roomSettings.roundTimerSeconds || 35);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (phase === 'ANCHOR_BROADCAST' || phase === 'PROMPT_ANSWERING') {
      setTimer(roomSettings.roundTimerSeconds || 35);
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          if (prev <= 5) soundEffects.playTick();
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, roomSettings.roundTimerSeconds]);

  useEffect(() => {
    if (phase === 'FINAL_PODIUM') {
      soundEffects.playPodiumFanfare();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [phase]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomSettings.roomCode);
    setCopiedCode(true);
    soundEffects.playVoteClick();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const shareInviteLink = () => {
    const inviteUrl = `${window.location.origin}?room=${roomSettings.roomCode}`;
    navigator.clipboard.writeText(inviteUrl);
    setInviteCopied(true);
    soundEffects.playVoteClick();
    setTimeout(() => setInviteCopied(false), 2000);
  };

  // إضافة بوت متسابق للتجربة
  const handleAddBot = () => {
    soundEffects.playVoteClick();
    const botId = `bot_${Date.now()}`;
    const botNames = ['حمادة الطاير', 'مشمش الكوميديان', 'لولو اللعوبة', 'المفتش كرومبو'];
    const botAvatars = ['🤖', '🐱', '🦊', '🎭'];
    const randIdx = Math.floor(Math.random() * botNames.length);

    setPlayers((prev) => ({
      ...prev,
      [botId]: {
        id: botId,
        name: botNames[randIdx],
        avatar: botAvatars[randIdx],
        score: Math.floor(Math.random() * 80) + 40,
        isHost: false,
        isReady: true,
        connected: true,
        isBot: true
      }
    }));
  };

  const handleAddSabotage = (wordText?: string) => {
    const textToAdd = (wordText || customSabotageInput).trim();
    if (!textToAdd) return;

    soundEffects.playSabotageDrop();
    const newWord: SabotageWord = {
      id: `w_${Date.now()}`,
      senderId: 'p2',
      senderName: 'سارة',
      word: textToAdd,
      insertedAtIndex: sabotageWords.length % 3,
      revealed: true
    };

    setSabotageWords([...sabotageWords, newWord]);
    setCustomSabotageInput('');
  };

  const handleManualLaugh = () => {
    soundEffects.playLaughGiggle();
    setLaughCount((prev) => prev + 1);
    setLaughAlertTriggered(true);
    setTimeout(() => setLaughAlertTriggered(false), 2000);
  };

  const handleCastSecretVote = (answerId: string) => {
    if (userVotedAnswerId) return;
    soundEffects.playVoteClick();
    setUserVotedAnswerId(answerId);
    setSecretAnswers((prev) => ({
      ...prev,
      [answerId]: {
        ...prev[answerId],
        votes: prev[answerId].votes + 1
      }
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2.5 sm:px-4 space-y-4 sm:space-y-5 pb-6">
      
      {/* 1. الشاشة الرئيسية للوبي اللعبة (Clean & Minimal UX متجاوبة تماماً) */}
      {phase === 'LOBBY' && (
        <div className="space-y-4 sm:space-y-5">
          
          {/* شريط كود الاستوديو وأزرار الانضمام وإنشاء غرفة */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-3.5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <div className="min-w-0">
                <span className="text-[11px] text-slate-400 font-medium block">
                  {t.roomCode}:
                </span>
                <span className="font-mono text-sm sm:text-base font-black text-white tracking-widest truncate">
                  {roomSettings.roomCode}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={copyRoomCode}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'تم النسخ' : 'نسخ الكود'}</span>
              </button>

              <button
                onClick={onOpenJoinRoom}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-red-600/30 hover:bg-red-600/40 text-red-200 border border-red-500/40 transition active:scale-95"
              >
                <Key className="w-3.5 h-3.5" />
                <span>دخول بكود</span>
              </button>
            </div>
          </div>

          {/* محدد الأطوار المريح: كارت الطور المختار بدون أي اقتطاع للنص */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
              <span>{t.selectGameMode}</span>
              <button
                onClick={() => {
                  soundEffects.playVoteClick();
                  setMode(mode === 'ANCHOR_MAYHEM' ? 'COMEDY_SECRET' : 'ANCHOR_MAYHEM');
                }}
                className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>تبديل للطور الآخر</span>
              </button>
            </div>

            {/* الكارت الأساسي للطور */}
            {mode === 'ANCHOR_MAYHEM' ? (
              <div className="bg-gradient-to-br from-red-950/50 via-slate-900 to-slate-900 border-2 border-red-500/70 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    🎙️
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {t.anchorModeTitle}
                      </h3>
                      <span className="bg-red-600/30 text-red-300 border border-red-500/40 text-[10px] font-bold px-2 py-0.2 rounded-full">
                        الطور النشط
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed break-words">
                      {t.anchorModeDesc}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-red-400/90 font-medium mt-2">
                      <span>⚡ {t.anchorModeHighlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border-2 border-amber-500/70 rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden transition">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-xl sm:text-2xl shrink-0">
                    🤫
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-black text-white">
                        {t.secretModeTitle}
                      </h3>
                      <span className="bg-amber-600/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.2 rounded-full">
                        الطور النشط
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1.5 leading-relaxed break-words">
                      {t.secretModeDesc}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-amber-400/90 font-medium mt-2">
                      <span>✨ {t.secretModeHighlight}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* لوحة حساس الضحك وإعدادات المايك في اللوبي */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <span>😂 حساس الضحك (Laugh Sensor):</span>
              </span>
              <button
                onClick={() => setLaughDetectorActive(!laughDetectorActive)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition ${
                  laughDetectorActive
                    ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}
              >
                {laughDetectorActive ? 'مُفعّل بالمايكروفون ✓' : 'يدوي بالضغط'}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-full transition-all duration-100"
                  style={{ width: `${laughDetectorActive ? currentAudioLevel : 20}%` }}
                ></div>
              </div>
              <span className="font-mono text-[11px] text-slate-400 shrink-0">
                {laughDetectorActive ? `${currentAudioLevel}% صوت` : 'جاهز'}
              </span>
            </div>
          </div>

          {/* شبكة الأصدقاء المتواجدين (مكان الصحاب ودعوتهم) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold flex items-center gap-1.5 text-slate-300">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>طاقم الأصدقاء المتواجد ({Object.keys(players).length})</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={shareInviteLink}
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 text-[11px]"
                >
                  <Share2 className="w-3 h-3" />
                  <span>{inviteCopied ? 'تم نسخ الرابط!' : 'دعوة صديق'}</span>
                </button>

                <button
                  onClick={handleAddBot}
                  className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-0.5 text-[11px]"
                  title="إضافة متسابق آلي للتجربة"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>+ بوت</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {Object.values(players).map((p) => (
                <div
                  key={p.id}
                  className={`bg-slate-900/80 border rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 transition min-w-0 ${
                    p.id === 'p1' ? 'border-red-600/50 bg-red-950/20' : 'border-slate-800/80'
                  }`}
                >
                  <div className="text-xl sm:text-2xl relative shrink-0">
                    {p.avatar}
                    {p.isHost && (
                      <span className="absolute -top-1.5 -right-1.5 text-[10px]">👑</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-200 truncate">{p.name}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400">
                      <span>{p.score} نقطة</span>
                      {p.isMuted && <span className="text-rose-400">🔇</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الزر الرئيسي البارز لبدء البث المباشر (Full Width & No Cutoff) */}
          <div className="pt-2">
            <button
              onClick={() => {
                soundEffects.playBreakingNewsSting();
                setPhase(mode === 'ANCHOR_MAYHEM' ? 'ANCHOR_BROADCAST' : 'PROMPT_ANSWERING');
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-base shadow-xl shadow-red-950/60 flex items-center justify-center gap-2 mx-auto transition-transform active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current shrink-0" />
              <span>{t.startBroadcastBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. طور المذيع المتورط: التيليبرومبتر وحساس الضحك المباشر */}
      {phase === 'ANCHOR_BROADCAST' && (
        <div className="space-y-4">
          {/* شريط معلومات المذيع وحساس الضحك */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-3.5 py-2.5 rounded-2xl text-xs gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0"></span>
              <span className="text-red-400 font-bold truncate">المذيع: {players.p1.name}</span>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              <span className="font-mono text-amber-400 font-bold">{timer}s</span>
              <span className="text-slate-300 font-bold bg-amber-950/60 border border-amber-800 px-2 py-0.5 rounded-lg text-[11px]">
                😂 الضحكات: {laughCount}
              </span>
            </div>
          </div>

          {/* تنبيه رصد الضحكة الحي */}
          {laughAlertTriggered && (
            <div className="bg-red-600 text-white font-black text-center py-2 px-4 rounded-xl animate-bounce shadow-lg text-xs sm:text-sm">
              🤣 قفشة! رصد حساس الضحك نوبة ضحك على الهواء للمذيع! (+نقطة للجمهور)
            </div>
          )}

          {/* شاشة التيليبرومبتر الإخبارية التلفزيونية */}
          <div className="bg-slate-950 border-2 border-red-600/80 rounded-3xl p-4 sm:p-6 space-y-3.5 shadow-2xl text-right">
            <div className="flex items-center justify-between text-xs">
              <span className="bg-red-700 text-white font-black px-2 py-0.5 rounded text-[10px]">
                {currentNews.category}
              </span>
              <span className="text-slate-500 font-mono text-[10px]">TELEPROMPTER</span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white leading-snug">
              {currentNews.headline}
            </h3>

            {/* نص القراءة مع الكلمات التوريطية المحقونة */}
            <div className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800">
              {currentNews.scriptTemplate.map((part, idx) => {
                if (part.startsWith('[BLANK_')) {
                  const blankNum = parseInt(part.replace(/[^0-9]/g, '')) - 1;
                  const injected = sabotageWords[blankNum];
                  return (
                    <span
                      key={idx}
                      className="inline-flex mx-1 px-2 py-0.5 rounded-lg font-black bg-red-600 text-white shadow text-xs sm:text-sm"
                    >
                      ⚡ {injected ? injected.word : '...كلمة توريط...'}
                    </span>
                  );
                }
                return <span key={idx}>{part} </span>;
              })}
            </div>

            <p className="text-[11px] text-amber-300 italic">
              💡 تعليمات المخرج: {currentNews.contextHint}
            </p>
          </div>

          {/* لوحة قصف الكلمات المفاجئة وزر الضحك اليدوي */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400">قصف المذيع بالكلمات:</span>
              <button
                onClick={handleManualLaugh}
                className="bg-amber-600 hover:bg-amber-500 text-black font-black text-[11px] px-2.5 py-1 rounded-lg transition active:scale-95"
              >
                🤣 مسكته بيضحك!
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customSabotageInput}
                onChange={(e) => setCustomSabotageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSabotage()}
                placeholder="اكتب كلمة محرجة تظهر في التيليبرومبتر فجأة..."
                className="flex-1 bg-slate-950 border border-slate-700 text-slate-100 px-3 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-red-500"
              />
              <button
                onClick={() => handleAddSabotage()}
                className="bg-red-600 hover:bg-red-500 text-white px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm transition shrink-0"
              >
                اقذف 💥
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={() => {
                soundEffects.playVoteClick();
                setPhase('ANCHOR_VOTING');
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs sm:text-sm transition text-center"
            >
              انتهت النشرة! تقييم أداء المذيع →
            </button>
          </div>
        </div>
      )}

      {/* 3. تصويت أداء المذيع */}
      {phase === 'ANCHOR_VOTING' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-center space-y-4">
          <span className="text-3xl">⚖️</span>
          <h3 className="text-xl font-black text-white">محكمة الاستوديو: تقييم المذيع</h3>
          <p className="text-xs text-slate-400">
            ضحك المذيع على الهواء <span className="text-amber-400 font-bold">{laughCount} مرات</span>!
          </p>

          <div className="grid grid-cols-5 gap-1.5 max-w-sm mx-auto">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  soundEffects.playVoteClick();
                  setPlayers((prev) => ({
                    ...prev,
                    p1: { ...prev.p1, score: prev.p1.score + star * 10 }
                  }));
                  setPhase('FINAL_PODIUM');
                }}
                className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-amber-300 font-bold text-center transition"
              >
                <div className="text-sm sm:text-base">⭐ {star}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. طور السر الكوميدي: كتابة الإجابة السرية */}
      {phase === 'PROMPT_ANSWERING' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold">🤫 السؤال السري</span>
            <span className="font-mono text-amber-300 font-bold">{timer}s</span>
          </div>

          <div className="bg-slate-950 border border-amber-500/50 rounded-3xl p-5 sm:p-7 text-center space-y-3 shadow-xl">
            <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800">
              {currentPrompt.situationCategory}
            </span>
            <h3 className="text-base sm:text-xl font-black text-white leading-relaxed">
              "{currentPrompt.promptText}"
            </h3>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
            <textarea
              rows={3}
              value={userSecretAnswer}
              onChange={(e) => setUserSecretAnswer(e.target.value)}
              placeholder="اكتب إجابتك هنا في سرية تامة قبل انتهاء العداد..."
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-3 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => {
                soundEffects.playVoteClick();
                if (userSecretAnswer.trim()) {
                  setSecretAnswers((prev) => ({
                    ...prev,
                    a_user: { id: 'a_user', text: userSecretAnswer, authorId: 'p1', votes: 0 }
                  }));
                }
                setPhase('PROMPT_VOTING');
              }}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-black text-xs sm:text-sm transition"
            >
              اعتماد الإجابة السرية! 🔒
            </button>
          </div>
        </div>
      )}

      {/* 5. التصويت الأعمى للسر الكوميدي */}
      {phase === 'PROMPT_VOTING' && (
        <div className="space-y-3.5">
          <div className="text-center space-y-1">
            <h3 className="text-lg font-black text-white">التصويت الأعمى للجمهور 🗳️</h3>
            <p className="text-[11px] text-slate-400">صوّت للإجابة الأكثر إضحاكاً، الأسماء ستظهر بعد التصويت!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {Object.values(secretAnswers).map((ans) => {
              const isSelected = userVotedAnswerId === ans.id;
              const author = players[ans.authorId as keyof typeof players];
              return (
                <div
                  key={ans.id}
                  onClick={() => handleCastSecretVote(ans.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-slate-100 text-xs sm:text-sm font-semibold mb-2.5">"{ans.text}"</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    {userVotedAnswerId ? (
                      <span className="text-cyan-300 font-bold text-[11px]">
                        بقلم: {author?.name || 'مجهول'}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[10px] flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> مجهول
                      </span>
                    )}

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}>
                      {isSelected ? '✓ صوّتت' : 'صوّت'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {userVotedAnswerId && (
            <div className="text-center pt-1">
              <button
                onClick={() => setPhase('FINAL_PODIUM')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition"
              >
                عرض التتويج 🏆
              </button>
            </div>
          )}
        </div>
      )}

      {/* 6. منصة التتويج */}
      {phase === 'FINAL_PODIUM' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 text-center space-y-4">
          <div className="text-4xl">🏆</div>
          <h3 className="text-xl sm:text-2xl font-black text-white">تتويج بطل الاستوديو! 🎉</h3>

          <div className="space-y-2 max-w-sm mx-auto pt-1">
            {Object.values(players)
              .sort((a, b) => b.score - a.score)
              .map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs ${
                    idx === 0
                      ? 'bg-amber-950/40 border-amber-500 text-amber-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>#{idx + 1}</span>
                    <span>{p.avatar}</span>
                    <span className="truncate">{p.name}</span>
                  </div>
                  <span className="shrink-0">{p.score} نقطة</span>
                </div>
              ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                soundEffects.playVoteClick();
                setPhase('LOBBY');
                setUserVotedAnswerId(null);
                setUserSecretAnswer('');
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              العودة للوبي ولعب جولة جديدة
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

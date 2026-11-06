import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Users, Sparkles, RefreshCw, Trophy, 
  Send, ThumbsUp, Radio, ChevronRight, Mic,
  Copy, Check, Share2, Plus, Volume2, ShieldCheck,
  EyeOff
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GamePhase, GameMode, Player, SabotageWord } from '../types/game';
import comedyData from '../data/comedyContent.json';
import { soundEffects } from '../utils/soundEffects';
import { Language, translations } from '../i18n/translations';
import { useAuth } from '../context/AuthContext';

interface GameSimulatorProps {
  lang: Language;
}

export const GameSimulator: React.FC<GameSimulatorProps> = ({ lang }) => {
  const { user } = useAuth();
  const t = translations[lang];

  const [phase, setPhase] = useState<GamePhase>('LOBBY');
  const [mode, setMode] = useState<GameMode>('ANCHOR_MAYHEM');
  const [roomCode] = useState('NEWS-99');
  const [copiedCode, setCopiedCode] = useState(false);

  // قائمة اللاعبين في الاستوديو مع دمج المستخدم الحالي
  const [players, setPlayers] = useState<Record<string, Player>>({
    p1: { id: 'p1', name: user.name, avatar: user.avatar, score: user.score, isHost: true, isAnchor: true, isReady: true, connected: true },
    p2: { id: 'p2', name: 'سارة المشاغبة', avatar: '😎', score: 95, isHost: false, isAnchor: false, isReady: true, connected: true },
    p3: { id: 'p3', name: 'كريم التافه', avatar: '🤡', score: 140, isHost: false, isAnchor: false, isReady: true, connected: true },
    p4: { id: 'p4', name: 'منى المحققة', avatar: '🕵️‍♀️', score: 80, isHost: false, isAnchor: false, isReady: true, connected: true }
  });

  // تحديث بيانات اللاعب الرئيسي إذا تم تعديلها من الـ Auth
  useEffect(() => {
    setPlayers((prev) => ({
      ...prev,
      p1: { ...prev.p1, name: user.name, avatar: user.avatar }
    }));
  }, [user.name, user.avatar]);

  // بيانات طور المذيع المتورط
  const [selectedNewsIndex] = useState(0);
  const currentNews = comedyData.newsScripts[selectedNewsIndex] || comedyData.newsScripts[0];
  
  const [sabotageWords, setSabotageWords] = useState<SabotageWord[]>([
    { id: 'w1', senderId: 'p2', senderName: 'سارة', word: 'شبشب زنوبة فسفوري', insertedAtIndex: 0, revealed: true },
    { id: 'w2', senderId: 'p3', senderName: 'كريم', word: 'حلة محشي مسكونة', insertedAtIndex: 1, revealed: true },
    { id: 'w3', senderId: 'p4', senderName: 'منى', word: 'كيلو بطاطس عاطفية', insertedAtIndex: 2, revealed: false },
  ]);
  const [customSabotageInput, setCustomSabotageInput] = useState('');
  const [laughCount, setLaughCount] = useState(1);

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

  // مؤقت الجولة
  const [timer, setTimer] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (phase === 'ANCHOR_BROADCAST' || phase === 'PROMPT_ANSWERING') {
      setTimer(35);
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
  }, [phase]);

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
    navigator.clipboard.writeText(roomCode);
    setCopiedCode(true);
    soundEffects.playVoteClick();
    setTimeout(() => setCopiedCode(false), 2000);
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

  const handleTriggerLaugh = () => {
    soundEffects.playLaughGiggle();
    setLaughCount((prev) => prev + 1);
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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. الشاشة الرئيسية للوبي (Clean & Minimal UX) */}
      {phase === 'LOBBY' && (
        <div className="space-y-6">
          {/* كود الاستوديو ورابط الدخول المبسط */}
          <div className="flex items-center justify-between bg-slate-900/60 border border-slate-800/80 px-4 py-2.5 rounded-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs text-slate-400 font-medium">{t.roomCode}:</span>
              <span className="font-mono text-sm font-black text-white tracking-wider">{roomCode}</span>
            </div>

            <button
              onClick={copyRoomCode}
              className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition active:scale-95 cursor-pointer"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? t.copied : t.copyLink}</span>
            </button>
          </div>

          {/* محدد الأطوار النظيف: الكارت المختار هو الأساسي والثاني مصغر */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
              <span>{t.selectGameMode}</span>
              <span className="text-slate-500 font-normal">{t.changeMode}</span>
            </div>

            {/* الكارت الأساسي للطور المختار */}
            {mode === 'ANCHOR_MAYHEM' ? (
              <div className="bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 border-2 border-red-500/70 rounded-3xl p-6 shadow-xl relative overflow-hidden transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center text-2xl shrink-0">
                      🎙️
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white">{t.anchorModeTitle}</h3>
                        <span className="bg-red-600/30 text-red-300 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          الطور النشط
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                        {t.anchorModeDesc}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-red-400/90 font-medium mt-2">
                        <span>⚡ {t.anchorModeHighlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* زر التبديل للطور الآخر */}
                  <button
                    onClick={() => {
                      soundEffects.playVoteClick();
                      setMode('COMEDY_SECRET');
                    }}
                    className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition active:scale-95 shrink-0"
                  >
                    تبديل إلى "السر الكوميدي" 🤫
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/70 rounded-3xl p-6 shadow-xl relative overflow-hidden transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/40 text-amber-400 flex items-center justify-center text-2xl shrink-0">
                      🤫
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white">{t.secretModeTitle}</h3>
                        <span className="bg-amber-600/30 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          الطور النشط
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                        {t.secretModeDesc}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-amber-400/90 font-medium mt-2">
                        <span>✨ {t.secretModeHighlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* زر التبديل للمذيع المتورط */}
                  <button
                    onClick={() => {
                      soundEffects.playVoteClick();
                      setMode('ANCHOR_MAYHEM');
                    }}
                    className="self-start sm:self-center px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition active:scale-95 shrink-0"
                  >
                    تبديل إلى "المذيع المتورط" 🎙️
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* شبكة الأصدقاء المتواجدين (Grid نظيف وخفيف) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-bold flex items-center gap-1.5 text-slate-300">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                {t.playersConnected} ({Object.keys(players).length})
              </span>
              <span className="text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {t.allReady}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.values(players).map((p, idx) => (
                <div
                  key={p.id}
                  className="bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-3.5 flex items-center gap-3 transition"
                >
                  <div className="text-2xl relative">
                    {p.avatar}
                    {p.isHost && (
                      <span className="absolute -top-1.5 -right-1.5 text-[10px]">👑</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-slate-200 truncate">{p.name}</p>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1">
                      {p.id === 'p1' ? t.youBadge : idx === 1 ? 'سارة' : 'متسابق'} • {p.score} {t.points}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الزر الرئيسي والبارز فقط في الشاشة: بدء البث المباشر */}
          <div className="pt-4 text-center">
            <button
              onClick={() => {
                soundEffects.playBreakingNewsSting();
                setPhase(mode === 'ANCHOR_MAYHEM' ? 'ANCHOR_BROADCAST' : 'PROMPT_ANSWERING');
              }}
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-base shadow-xl shadow-red-950/60 flex items-center justify-center gap-2.5 mx-auto transition-transform active:scale-95 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>{t.startBroadcastBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. طور المذيع المتورط: البث والتلفزيون */}
      {phase === 'ANCHOR_BROADCAST' && (
        <div className="space-y-4">
          {/* شريط المذيع والوقت */}
          <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 px-4 py-2.5 rounded-2xl text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-red-400 font-bold">{t.readingNow} {players.p1.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-amber-400 font-bold">{t.timeLeft}: {timer}s</span>
              <span className="text-slate-300 font-bold">😂 {t.laughCounter}: {laughCount}</span>
            </div>
          </div>

          {/* شاشة التيليبرومبتر الإخبارية */}
          <div className="bg-slate-950 border-2 border-red-600/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-right">
            <div className="flex items-center justify-between text-xs">
              <span className="bg-red-700 text-white font-black px-2.5 py-0.5 rounded text-[11px]">
                {currentNews.category}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">NEWS BROADCAST</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              {currentNews.headline}
            </h3>

            {/* نص القراءة مع الكلمات التوريطية المحقونة */}
            <div className="text-base sm:text-lg text-slate-200 leading-relaxed bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              {currentNews.scriptTemplate.map((part, idx) => {
                if (part.startsWith('[BLANK_')) {
                  const blankNum = parseInt(part.replace(/[^0-9]/g, '')) - 1;
                  const injected = sabotageWords[blankNum];
                  return (
                    <span
                      key={idx}
                      className="inline-flex mx-1.5 px-2.5 py-0.5 rounded-lg font-black bg-red-600 text-white shadow"
                    >
                      ⚡ {injected ? injected.word : '...كلمة توريط...'}
                    </span>
                  );
                }
                return <span key={idx}>{part} </span>;
              })}
            </div>

            <p className="text-xs text-amber-300 italic pt-1">
              💡 {t.directorInstruction} {currentNews.contextHint}
            </p>
          </div>

          {/* لوحة قصف الكلمات للجمهور */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400">{t.sabotageBoxTitle}</span>
              <button
                onClick={handleTriggerLaugh}
                className="bg-amber-600 hover:bg-amber-500 text-black font-black text-xs px-3 py-1 rounded-lg transition"
              >
                {t.caughtLaughingBtn}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customSabotageInput}
                onChange={(e) => setCustomSabotageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSabotage()}
                placeholder={t.sabotagePlaceholder}
                className="flex-1 bg-slate-950 border border-slate-700 text-slate-100 px-3.5 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-red-500"
              />
              <button
                onClick={() => handleAddSabotage()}
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition shrink-0"
              >
                {t.dropWordBtn}
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={() => {
                soundEffects.playVoteClick();
                setPhase('ANCHOR_VOTING');
              }}
              className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-extrabold text-xs sm:text-sm transition"
            >
              {t.finishRoundVote} →
            </button>
          </div>
        </div>
      )}

      {/* 3. تقييم أداء المذيع */}
      {phase === 'ANCHOR_VOTING' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6">
          <span className="text-4xl">⚖️</span>
          <h3 className="text-2xl font-black text-white">محكمة الاستوديو: تقييم أداء المذيع</h3>
          <p className="text-xs sm:text-sm text-slate-400">
            المذيع ضحك على الهواء <span className="text-amber-400 font-bold">{laughCount} مرات</span>!
          </p>

          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto">
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
                className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500 text-amber-300 font-bold text-center transition"
              >
                <div className="text-base sm:text-lg">⭐ {star}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. طور السر الكوميدي: كتابة الإجابة السرية */}
      {phase === 'PROMPT_ANSWERING' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-bold">🤫 {t.secretPromptTitle}</span>
            <span className="font-mono text-amber-300 font-bold">{timer}s</span>
          </div>

          <div className="bg-slate-950 border border-amber-500/50 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
              {currentPrompt.situationCategory}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-relaxed">
              "{currentPrompt.promptText}"
            </h3>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
            <textarea
              rows={3}
              value={userSecretAnswer}
              onChange={(e) => setUserSecretAnswer(e.target.value)}
              placeholder={t.secretAnswerPlaceholder}
              className="w-full bg-slate-950 border border-slate-700 text-slate-100 p-3 rounded-xl text-sm focus:outline-none focus:border-amber-500"
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
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-black font-black text-sm transition"
            >
              {t.submitSecretAnswer}
            </button>
          </div>
        </div>
      )}

      {/* 5. التصويت الأعمى للسر الكوميدي */}
      {phase === 'PROMPT_VOTING' && (
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-white">{t.blindVotingTitle}</h3>
            <p className="text-xs text-slate-400">{t.blindVotingSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.values(secretAnswers).map((ans, idx) => {
              const isSelected = userVotedAnswerId === ans.id;
              const author = players[ans.authorId as keyof typeof players];
              return (
                <div
                  key={ans.id}
                  onClick={() => handleCastSecretVote(ans.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-400'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <p className="text-slate-100 text-sm font-semibold mb-3">"{ans.text}"</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
                    {userVotedAnswerId ? (
                      <span className="text-cyan-300 font-bold">
                        {t.secretAuthorRevealed} {author?.name || 'مجهول'}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px] flex items-center gap-1">
                        <EyeOff className="w-3.5 h-3.5" /> مجهول الهوية
                      </span>
                    )}

                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${isSelected ? 'bg-cyan-500 text-black' : 'text-slate-400'}`}>
                      {isSelected ? t.votedSuccessfully : t.voteThisAnswer}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {userVotedAnswerId && (
            <div className="text-center pt-2">
              <button
                onClick={() => setPhase('FINAL_PODIUM')}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition"
              >
                عرض التتويج 🏆
              </button>
            </div>
          )}
        </div>
      )}

      {/* 6. منصة التتويج */}
      {phase === 'FINAL_PODIUM' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-4">
          <div className="text-5xl">🏆</div>
          <h3 className="text-2xl font-black text-white">{t.winnerDeclared}</h3>
          <p className="text-xs text-slate-400">{t.podiumTitle}</p>

          <div className="space-y-2 max-w-sm mx-auto pt-2">
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
                  <div className="flex items-center gap-2">
                    <span>#{idx + 1}</span>
                    <span>{p.avatar}</span>
                    <span>{p.name}</span>
                  </div>
                  <span>{p.score} {t.points}</span>
                </div>
              ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                soundEffects.playVoteClick();
                setPhase('LOBBY');
                setUserVotedAnswerId(null);
                setUserSecretAnswer('');
              }}
              className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
            >
              {t.backToLobby}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

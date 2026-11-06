import React, { useState } from 'react';
import { Code2, Copy, Check, ArrowRight, ShieldCheck, Database, Zap } from 'lucide-react';

export const TypesViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const rawCode = `/**
 * استوديو النشرة الكوميدية (Comedy News Studio)
 * ملف الأنواع والـ State الأساسي للعبة الجماعية أونلاين
 * متوافق تماماً مع Next.js و Supabase Realtime أو Pusher
 */

// حالات اللعبة العامة في الغرفة
export type GamePhase =
  | 'LOBBY'                   // غرفة الانتظار وتجمع اللاعبين
  | 'MODE_SELECTION'         // اختيار الطور (المذيع المتورط أو السر الكوميدي)
  // طور 1: المذيع المتورط (The Caught Anchor)
  | 'ANCHOR_PREPARE'         // المذيع يجهز والجمهور يختار كلمات التوريط
  | 'ANCHOR_BROADCAST'       // المذيع يقرا النشرة على الهواء وتظهر الكلمات المفاجئة
  | 'ANCHOR_VOTING'          // تقييم أداء المذيع (هل ضحك؟ هل رقّع الموقف بذكاء؟)
  // طور 2: السر الكوميدي (The Secret Punchline)
  | 'PROMPT_REVEAL'          // كشف السؤال الكوميدي السري
  | 'PROMPT_ANSWERING'       // الجميع يكتب إجابته سراً قبل انتهاء الوقت
  | 'PROMPT_VOTING'          // عرض الإجابات مجهولة الهوية والتصويت للأضحك
  // النتائج والنهاية
  | 'ROUND_RESULTS'          // توزيع النقاط وردود الفعل للجولة الحالية
  | 'FINAL_PODIUM';          // منصة التتويج وإعلان بطل الاستوديو

// أطوار اللعبة المتاحة
export type GameMode = 'ANCHOR_MAYHEM' | 'COMEDY_SECRET';

// بيانات اللاعب الفردي
export interface Player {
  id: string;               // معرف فريد (مثل supabase user id أو uuid مؤقت)
  name: string;             // اسم اللاعب أو لقبه في الاستوديو
  avatar: string;           // إيموجي أو أفاتار كرتوني للمذيع/المراسل
  score: number;            // النقاط التراكمية
  isHost: boolean;          // هل هو منشئ الغرفة
  isAnchor?: boolean;       // هل هو المذيع في هذه الجولة (لطور المذيع المتورط)
  isReady: boolean;         // جاهزية اللاعب
  hasSubmitted?: boolean;   // هل أرسل إجابته أو كلمته في الجولة الحالية
  hasVoted?: boolean;       // هل صوت في مرحلة التصويت
  connected: boolean;       // حالة الاتصال Realtime
}

// هيكل خبر النشرة الكوميدية (لطور المذيع المتورط)
export interface NewsScript {
  id: string;
  category: 'عاجل' | 'اقتصاد محشش' | 'طقس غريب' | 'رياضة خيالية' | 'منوعات فضائية';
  headline: string;              // المانشيت العريض
  leadParagraph: string;         // بداية الخبر
  scriptTemplate: string[];      // فقرات القراءة على التيليبرومبتر مع [BLANK_X]
  targetBlanksCount: number;     // كم كلمة مفاجئة يحتاجها الخبر من الجمهور
  contextHint: string;           // تلميح مضحك للمذيع
  defaultWordsPool: string[];    // كلمات اقتراحية للجمهور
}

// كلمة التوريط التي يرسلها أحد المشاهدين للمذيع
export interface SabotageWord {
  id: string;
  senderId: string;
  senderName: string;
  word: string;                  // الكلمة المحرجة أو الغريبة
  insertedAtIndex: number;       // في أي فراغ ستدخل
  revealed: boolean;             // هل ظهرت للمذيع على الشاشة الآن
}

// تصويت أداء المذيع
export interface AnchorRating {
  voterId: string;
  keptStraightFace: boolean;     // هل قدر يمسك نفسه وميضحكش؟
  improvQuality: 1 | 2 | 3 | 4 | 5; // جودة الترقيع والارتجال
  bestReactionAward?: boolean;
}

// هيكل سؤال طور "السر الكوميدي"
export interface ComedyPrompt {
  id: string;
  promptText: string;            // نص السؤال المحرج أو المضحك
  situationCategory: 'علاقات' | 'شغل ومقابلات' | 'مواقف محرجة' | 'نظريات مؤامرة' | 'تخيل لو';
  timeLimitSeconds: number;
}

// إجابة لاعب في طور السر الكوميدي
export interface SecretAnswer {
  id: string;
  playerId: string;
  promptId: string;
  text: string;                  // الإجابة السرية المكتوبة
  votesCount: number;            // عدد الأصوات التي حصل عليها
  voterIds: string[];            // من صوّت لها
}

// الحالة الكاملة للغرفة (Room State) التي يتم مزامنتها
export interface GameRoomState {
  roomCode: string;              // كود الغرفة المكون من 4-6 حروف (مثال: AR-99)
  hostId: string;                // معرف المشرف
  phase: GamePhase;              // الحالة الحالية للعبة
  currentRound: number;          // رقم الجولة الحالية
  totalRounds: number;           // إجمالي عدد الجولات
  timeRemaining: number;         // العداد التنازلي بالثواني
  players: Record<string, Player>;
  activeMode: GameMode;
  
  anchorGameData?: {
    currentAnchorId: string;
    newsScript: NewsScript;
    wordsInjected: SabotageWord[];
    ratings: Record<string, AnchorRating>;
    laughTriggeredCount: number;
  };

  secretGameData?: {
    currentPrompt: ComedyPrompt;
    answers: Record<string, SecretAnswer>;
  };

  history: any[];
}

// أحداث الـ Realtime (Pusher Events أو Supabase Broadcast)
export type RealtimeGameEvent =
  | { type: 'PLAYER_JOINED'; payload: Player }
  | { type: 'PLAYER_LEFT'; payload: { playerId: string } }
  | { type: 'GAME_PHASE_CHANGED'; payload: { newPhase: GamePhase; timeRemaining: number } }
  | { type: 'MODE_SELECTED'; payload: { mode: GameMode } }
  | { type: 'SABOTAGE_WORD_SUBMITTED'; payload: SabotageWord }
  | { type: 'ANCHOR_LAUGH_RECORDED'; payload: { anchorId: string } }
  | { type: 'ANCHOR_VOTE_SUBMITTED'; payload: AnchorRating }
  | { type: 'SECRET_ANSWER_SUBMITTED'; payload: { playerId: string; answerText: string } }
  | { type: 'SECRET_VOTE_CAST'; payload: { voterId: string; targetAnswerId: string } }
  | { type: 'NEXT_ROUND_REQUESTED'; payload: { roundNumber: number } };`;

  const copyCode = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة وزر النسخ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-white">ملف الـ Types والـ State الأساسي (TypeScript)</h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            ملف <code className="text-amber-400 font-mono">types/game.ts</code> يغطي دورة حياة اللعبة بالكامل: اللوبي، التيليبرومبتر، الكلمات التوريطية، الإجابات السرية، والتصويت.
          </p>
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-500 text-white shadow shadow-red-950 transition active:scale-95 shrink-0 self-start md:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'تم نسخ كود الـ Types!' : 'نسخ ملف types/game.ts'}</span>
        </button>
      </div>

      {/* خريطة تدفق الحالات State Machine */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950 border border-red-900/40 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> دورة حياة طور "المذيع المتورط":
          </span>
          <div className="text-[12px] font-mono text-slate-300 flex flex-wrap items-center gap-2">
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">LOBBY</span>
            <span className="text-slate-500">→</span>
            <span className="bg-red-950/80 text-red-300 px-2 py-1 rounded border border-red-800">ANCHOR_BROADCAST</span>
            <span className="text-slate-500">→</span>
            <span className="bg-amber-950/80 text-amber-300 px-2 py-1 rounded border border-amber-800">ANCHOR_VOTING</span>
            <span className="text-slate-500">→</span>
            <span className="bg-emerald-950/80 text-emerald-300 px-2 py-1 rounded border border-emerald-800">FINAL_PODIUM</span>
          </div>
        </div>

        <div className="bg-slate-950 border border-amber-900/40 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> دورة حياة طور "السر الكوميدي":
          </span>
          <div className="text-[12px] font-mono text-slate-300 flex flex-wrap items-center gap-2">
            <span className="bg-slate-900 px-2 py-1 rounded border border-slate-800">LOBBY</span>
            <span className="text-slate-500">→</span>
            <span className="bg-amber-950/80 text-amber-300 px-2 py-1 rounded border border-amber-800">PROMPT_ANSWERING</span>
            <span className="text-slate-500">→</span>
            <span className="bg-cyan-950/80 text-cyan-300 px-2 py-1 rounded border border-cyan-800">PROMPT_VOTING</span>
            <span className="text-slate-500">→</span>
            <span className="bg-emerald-950/80 text-emerald-300 px-2 py-1 rounded border border-emerald-800">FINAL_PODIUM</span>
          </div>
        </div>
      </div>

      {/* عارض الكود المصدري */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl" dir="ltr">
        <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono text-slate-300">src/types/game.ts</span>
          <span>TypeScript Interface Definitions</span>
        </div>
        <pre className="p-4 sm:p-6 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[500px]">
          <code>{rawCode}</code>
        </pre>
      </div>
    </div>
  );
};

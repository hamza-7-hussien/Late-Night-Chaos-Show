/**
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
  // النص المقروء مقسم لمقاطع تتخللها فراغات أو نقاط حقن الكلمات التوريطية
  scriptTemplate: string[];      // فقرات القراءة على التيليبرومبتر (Teleprompter)
  targetBlanksCount: number;     // كم كلمة مفاجئة يحتاجها الخبر من الجمهور
  contextHint: string;           // تلميح مضحك للمذيع
  defaultWordsPool: string[];    // كلمات اقتراحية للجمهور إذا لم يكتبوا كلماتهم
}

// كلمة التوريط التي يرسلها أحد المشاهدين للمذيع
export interface SabotageWord {
  id: string;
  senderId: string;
  senderName: string;
  word: string;                  // الكلمة المحرجة أو الغريبة المفروض يقرأها المذيع
  insertedAtIndex: number;       // في أي فراغ ستدخل
  revealed: boolean;             // هل ظهرت للمذيع على الشاشة الآن
}

// تصويت أداء المذيع
export interface AnchorRating {
  voterId: string;
  keptStraightFace: boolean;     // هل قدر يمسك نفسه وميضحكش؟ (مقياس الضحك)
  improvQuality: 1 | 2 | 3 | 4 | 5; // جودة الترقيع والارتجال
  bestReactionAward?: boolean;   // جائزة أفضل تعليق
}

// هيكل سؤال طور "السر الكوميدي"
export interface ComedyPrompt {
  id: string;
  promptText: string;            // نص السؤال المحرج أو المضحك
  situationCategory: 'علاقات' | 'شغل ومقابلات' | 'مواقف محرجة' | 'نظريات مؤامرة' | 'تخيل لو';
  timeLimitSeconds: number;      // وقت الإجابة
}

// إجابة لاعب في طور السر الكوميدي
export interface SecretAnswer {
  id: string;
  playerId: string;
  promptId: string;
  text: string;                  // الإجابة السرية المكتوبة
  votesCount: number;            // عدد الأصوات التي حصل عليها
  voterIds: string[];            // من صوّت لها (يكشف بعد انتهاء التصويت)
}

// إحصائيات الجولة
export interface RoundSummary {
  roundNumber: number;
  mode: GameMode;
  winnerPlayerId: string;
  winnerPlayerName: string;
  highlightText: string;         // أفضل قفشة أو أكثر كلمة أضحكت الناس
  pointsAwarded: Record<string, number>; // playerId -> points earned this round
}

// الحالة الكاملة للغرفة (Room State) التي يتم مزامنتها عبر Supabase Realtime أو Pusher
export interface GameRoomState {
  roomCode: string;              // كود الغرفة المكون من 4-6 حروف (مثال: AR-99)
  hostId: string;                // معرف المشرف
  phase: GamePhase;              // الحالة الحالية للعبة
  currentRound: number;          // رقم الجولة الحالية
  totalRounds: number;           // إجمالي عدد الجولات
  timeRemaining: number;         // العداد التنازلي بالثواني
  players: Record<string, Player>; // قائمة اللاعبين بالـ ID
  activeMode: GameMode;          // الطور الفعّال حالياً
  
  // بيانات جولة المذيع المتورط (إذا كان الطور هو ANCHOR_MAYHEM)
  anchorGameData?: {
    currentAnchorId: string;
    newsScript: NewsScript;
    wordsInjected: SabotageWord[];
    ratings: Record<string, AnchorRating>; // voterId -> rating
    laughTriggeredCount: number;           // كم مرة ضحك المذيع على الهواء
  };

  // بيانات جولة السر الكوميدي (إذا كان الطور هو COMEDY_SECRET)
  secretGameData?: {
    currentPrompt: ComedyPrompt;
    answers: Record<string, SecretAnswer>; // answerId -> SecretAnswer
  };

  // سجل الجولات المنتهية
  history: RoundSummary[];
}

// أحداث الـ Realtime التي يتم إرسالها واستقبالها (Pusher Events أو Supabase Broadcast)
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
  | { type: 'NEXT_ROUND_REQUESTED'; payload: { roundNumber: number } }
  | { type: 'RESET_GAME'; payload: { hostId: string } };

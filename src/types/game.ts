/**
 * Late Show - استوديو النشرة الكوميدية
 * ملف الأنواع والـ State الأساسي للعبة الجماعية أونلاين
 */

export type GamePhase =
  | 'ONBOARDING'              // شاشة البداية والتعريف وتسجيل الدخول
  | 'LOBBY'                   // غرفة الانتظار وتجمع اللاعبين
  | 'MODE_SELECTION'         // اختيار الطور
  | 'ANCHOR_PREPARE'         // المذيع يجهز والجمهور يختار كلمات التوريط
  | 'ANCHOR_BROADCAST'       // المذيع يقرا النشرة على الهواء وتظهر الكلمات
  | 'ANCHOR_VOTING'          // تقييم أداء المذيع
  | 'PROMPT_REVEAL'          // كشف السؤال السري
  | 'PROMPT_ANSWERING'       // كتابة الإجابة السرية
  | 'PROMPT_VOTING'          // التصويت الأعمى
  | 'ROUND_RESULTS'          // نتائج الجولة
  | 'FINAL_PODIUM';          // منصة التتويج

export type GameMode = 'ANCHOR_MAYHEM' | 'COMEDY_SECRET';

export interface Player {
  id: string;
  name: string;
  avatar: string;
  email?: string;
  score: number;
  isHost: boolean;
  isAnchor?: boolean;
  isReady: boolean;
  hasSubmitted?: boolean;
  hasVoted?: boolean;
  connected: boolean;
  isMuted?: boolean;         // حالة المايكروفون
  isDeafened?: boolean;      // حالة السماعة
  isSpeaking?: boolean;      // هل يتكلم حالياً
  isBot?: boolean;           // لاعب افتراضي للتجربة الفردية
}

export interface RoomSettings {
  roomCode: string;
  roomName: string;
  totalRounds: number;
  roundTimerSeconds: number;
  teleprompterSpeed: 'slow' | 'normal' | 'fast';
  laughDetectorSensitivity: 'low' | 'medium' | 'high';
  allowCustomSabotages: boolean;
  isPrivate: boolean;
}

export interface NewsScript {
  id: string;
  category: 'عاجل' | 'اقتصاد محشش' | 'طقس غريب' | 'رياضة خيالية' | 'منوعات فضائية';
  headline: string;
  leadParagraph: string;
  scriptTemplate: string[];
  targetBlanksCount: number;
  contextHint: string;
  defaultWordsPool: string[];
}

export interface SabotageWord {
  id: string;
  senderId: string;
  senderName: string;
  word: string;
  insertedAtIndex: number;
  revealed: boolean;
}

export interface AnchorRating {
  voterId: string;
  keptStraightFace: boolean;
  improvQuality: 1 | 2 | 3 | 4 | 5;
}

export interface ComedyPrompt {
  id: string;
  promptText: string;
  situationCategory: 'علاقات' | 'شغل ومقابلات' | 'مواقف محرجة' | 'نظريات مؤامرة' | 'تخيل لو';
  timeLimitSeconds: number;
}

export interface SecretAnswer {
  id: string;
  playerId: string;
  promptId: string;
  text: string;
  votesCount: number;
  voterIds: string[];
}

export interface GameRoomState {
  settings: RoomSettings;
  hostId: string;
  phase: GamePhase;
  currentRound: number;
  timeRemaining: number;
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

export interface FileNode {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  badge?: string;
  children?: FileNode[];
}

export const NEXTJS_PROJECT_STRUCTURE: FileNode = {
  name: "comedy-news-studio (Next.js 14/15 App Router)",
  type: "folder",
  children: [
    {
      name: "app",
      type: "folder",
      description: "المجلد الرئيسي للـ App Router والصفحات والـ APIs",
      children: [
        { name: "layout.tsx", type: "file", description: "المظهر العام وتضمين خط Cairo والـ Providers" },
        { name: "page.tsx", type: "file", description: "شاشة البداية: إنشاء غرفة جديدة أو إدخال كود الغرفة" },
        {
          name: "room",
          type: "folder",
          children: [
            {
              name: "[code]",
              type: "folder",
              description: "رابط الغرفة التشاركية (مثال: /room/AR-99)",
              children: [
                { name: "page.tsx", type: "file", description: "واجهة الغرفة واللعبة (Client Component مع Realtime hook)" },
                { name: "loading.tsx", type: "file", description: "شاشة تحميل شارة النشرة العاجلة" }
              ]
            }
          ]
        },
        {
          name: "api",
          type: "folder",
          description: "مسارات الـ Serverless لمعالجة الحالات الحرجة وتوليد الأكواد",
          children: [
            {
              name: "rooms",
              type: "folder",
              children: [
                { name: "create", type: "folder", children: [{ name: "route.ts", type: "file", description: "POST: إنشاء كود غرفة فريد وتجهيز حالة البداية" }] },
                { name: "sync-state", type: "folder", children: [{ name: "route.ts", type: "file", description: "POST: تحديث حالة الجولة وحساب النقاط تلقائياً" }] }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "components",
      type: "folder",
      description: "مكونات الواجهة مقسمة حسب الطور",
      children: [
        {
          name: "lobby",
          type: "folder",
          children: [
            { name: "LobbyRoom.tsx", type: "file", description: "قائمة اللاعبين المتصلين ورمز الـ QR واختيار الطور" },
            { name: "PlayerAvatarBadge.tsx", type: "file", description: "أفاتار اللاعب مع شارة المذيع/المشاهد" }
          ]
        },
        {
          name: "anchor-mode",
          type: "folder",
          description: "طور المذيع المتورط",
          children: [
            { name: "TeleprompterScreen.tsx", type: "file", description: "شاشة القراءة المتحركة للمذيع مع مؤثرات الخط العريض" },
            { name: "SabotageWordPad.tsx", type: "file", description: "لوحة الجمهور لكتابة وقذف الكلمات المفاجئة على الهواء" },
            { name: "LaughMeter.tsx", type: "file", description: "مقياس الضحك وتصويت الجمهور على قدرة صمود المذيع" }
          ]
        },
        {
          name: "secret-mode",
          type: "folder",
          description: "طور السر الكوميدي",
          children: [
            { name: "PromptCard.tsx", type: "file", description: "بطاقة السؤال الكوميدي مع عداد الثواني التنازلي" },
            { name: "SecretInputModal.tsx", type: "file", description: "صندوق الإجابة السرية المجهولة" },
            { name: "BlindVotingCards.tsx", type: "file", description: "شبكة عرض الإجابات مجهولة الهوية للتصويت السري" }
          ]
        },
        {
          name: "studio-ui",
          type: "folder",
          description: "عناصر بصرية ومؤثرات تلفزيونية",
          children: [
            { name: "BreakingNewsBanner.tsx", type: "file", description: "شريط الأخبار العاجلة الأحمر التلفزيوني المتحرك" },
            { name: "OnAirBadge.tsx", type: "file", description: "إشارة (على الهواء مباشرة - LIVE ON AIR) الوامضة" },
            { name: "PodiumResults.tsx", type: "file", description: "منصة التتويج والمؤثرات الاحتفالية والكونفيتي" }
          ]
        }
      ]
    },
    {
      name: "lib",
      type: "folder",
      description: "خدمات الاتصال والمزامنة الحية",
      children: [
        { name: "supabaseClient.ts", type: "file", description: "تهيئة عميل Supabase Realtime (Presence & Broadcast)" },
        { name: "pusherClient.ts", type: "file", description: "(بديل اختياري) عميل Pusher JS للاشتراك في القنوات" },
        { name: "audioEffects.ts", type: "file", description: "أصوات النشرة العاجلة وصفارات الإنذار وضحكات الجمهور" }
      ]
    },
    {
      name: "hooks",
      type: "folder",
      children: [
        { name: "useGameRoom.ts", type: "file", description: "Custom Hook لإدارة اشتراك القناة والمزامنة الفورية" },
        { name: "useSoundFx.ts", type: "file", description: "Hook لتشغيل المؤثرات الصوتية عند وقوع الأحداث" }
      ]
    },
    {
      name: "types",
      type: "folder",
      children: [
        { name: "game.ts", type: "file", description: "ملف الأنواع الأساسي (GamePhase, Player, NewsScript, etc.)" }
      ]
    },
    {
      name: "data",
      type: "folder",
      children: [
        { name: "comedyContent.json", type: "file", description: "بنك الأخبار والأسئلة والكلمات المفاجئة الجاهزة" }
      ]
    },
    { name: ".env.example", type: "file", description: "المتغيرات مثل NEXT_PUBLIC_SUPABASE_URL و KEY" },
    { name: "package.json", type: "file", description: "التبعيات (next, react, @supabase/supabase-js, framer-motion)" }
  ]
};

export const CODE_SNIPPETS = {
  supabaseHook: `// hooks/useGameRoom.ts
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import { GameRoomState, RealtimeGameEvent, Player } from '@/types/game';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useGameRoom(roomCode: string, currentPlayer: Player) {
  const [gameState, setGameState] = useState<GameRoomState | null>(null);
  const channelRef = useRef<any>(null);

  useEffect(() => {
    // إنشاء قناة Realtime خاصة برقم الغرفة
    const channel = supabase.channel(\`room:\${roomCode}\`, {
      config: {
        presence: { key: currentPlayer.id },
        broadcast: { ack: true }
      }
    });

    // 1. تتبع وجود اللاعبين (Presence)
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        console.log('اللاعبون المتصلون حالياً:', state);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('انضم لاعب جديد:', newPresences);
      })
      // 2. استقبال أحداث اللعبة عبر Broadcast
      .on('broadcast', { event: 'game-event' }, ({ payload }: { payload: RealtimeGameEvent }) => {
        handleIncomingEvent(payload);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // تسجيل حضور اللاعب في الغرفة
          await channel.track({
            id: currentPlayer.id,
            name: currentPlayer.name,
            avatar: currentPlayer.avatar,
            score: 0,
            onlineAt: new Date().toISOString()
          });
        }
      });

    channelRef.current = channel;

    return () => {
      channel.unsubscribe();
    };
  }, [roomCode, currentPlayer.id]);

  // إرسال حدث لجميع المتصلين في الغرفة بنقرة زر
  const broadcastEvent = async (event: RealtimeGameEvent) => {
    if (!channelRef.current) return;
    await channelRef.current.send({
      type: 'broadcast',
      event: 'game-event',
      payload: event
    });
  };

  const handleIncomingEvent = (event: RealtimeGameEvent) => {
    // تحديث الـ State محلياً حسب الحدث الوارد
  };

  return { gameState, broadcastEvent };
}`,

  pusherAlternative: `// lib/pusherClient.ts
// في حال رغبت باستخدام Pusher بدلاً من Supabase:
// npm install pusher-js pusher
import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  authEndpoint: '/api/pusher/auth', // لحماية القنوات الخاصة (presence-*)
});

// القناة التشاركية:
// const channel = pusherClient.subscribe(\`presence-room-\${roomCode}\`);
// channel.bind('client-sabotage-word', (data) => { ... });`
};

import React, { useState } from 'react';
import { Rocket, ShieldAlert, CheckCircle, Zap, Code, Copy, Check, Server, Globe } from 'lucide-react';
import { CODE_SNIPPETS } from '../data/projectBlueprint';

export const VercelGuide: React.FC = () => {
  const [copiedHook, setCopiedHook] = useState(false);
  const [copiedEnv, setCopiedEnv] = useState(false);

  const copyHookCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS.supabaseHook);
    setCopiedHook(true);
    setTimeout(() => setCopiedHook(false), 2000);
  };

  const copyEnvCode = () => {
    const envText = `# Vercel & Supabase Realtime Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=https://comedy-news-studio.vercel.app`;
    navigator.clipboard.writeText(envText);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* رأس الدليل */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl font-bold text-white">حل الـ Realtime على Vercel: لماذا وكيف نطبقه؟</h2>
        </div>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          دليل هندسي عملي لحل مشكلة الـ WebSockets التقليدية عند رفع ألعاب الـ Multiplayer على Vercel.
        </p>
      </div>

      {/* المقارنة: المشكلة والحل الهندسي الأفضل */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* المشكلة على Vercel */}
        <div className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>المشكلة: ليه Socket.io / ws العادي بيفشل على Vercel؟</span>
          </div>
          <ul className="text-xs text-rose-200/80 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>Serverless Architecture:</strong> خوادم Vercel مبنية على Lambdas وEdge Functions مؤقتة تقفل بعد ثوانٍ من انتهاء الطلب (Stateless)، وبالتالي لا تستطيع الحفاظ على اتصال TCP مفتوح ومستمر.
            </li>
            <li>
              <strong>تكلفة البنية التحتية:</strong> تشغيل سيرفر VPS مخصص (مثل EC2 أو DigitalOcean) عشان Socket.io فقط هيكلفك اشتراك شهري وصيانة مستمرة.
            </li>
          </ul>
        </div>

        {/* الحل الذهبي: Supabase Realtime أو Pusher */}
        <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>الحل الذكي: Supabase Realtime (Channels + Presence)</span>
          </div>
          <ul className="text-xs text-emerald-200/80 space-y-2 list-disc list-inside leading-relaxed">
            <li>
              <strong>مزامنة فورية بدون سيرفر:</strong> المتصفح يتصل مباشرة بسحابة Supabase عبر WebSocket مخصص، وترسل الأحداث لغرفة اللعبة <code className="font-mono bg-emerald-950 px-1 rounded">room:CODE</code> في أقل من 50ms.
            </li>
            <li>
              <strong>Presence مدمج:</strong> يخبرك فوراً إذا دخل صاحبك الغرفة أو قطع اتصاله بدون كتابة سطر كود واحد في الباك إند!
            </li>
            <li>
              <strong>مجاني 100%:</strong> الخطة المجانية تدعم حتى 500 لاعب متصل في نفس اللحظة و 2 مليون رسالة شهرياً، وهو أكثر من كافٍ لعشرات مجموعات الأصدقاء.
            </li>
          </ul>
        </div>
      </div>

      {/* كود الـ Hook الجاهز لـ Next.js */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>كود Custom Hook جاهز: <code className="text-cyan-400 font-mono text-xs">hooks/useGameRoom.ts</code></span>
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              ينظم الاتصال بالقناة، تتبع اللاعبين (Presence)، وإرسال أحداث اللعبة بنقرة زر (Broadcast).
            </p>
          </div>

          <button
            onClick={copyHookCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95 shrink-0 self-start sm:self-auto"
          >
            {copiedHook ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedHook ? 'تم نسخ الكود!' : 'نسخ كود الـ Hook'}</span>
          </button>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-xs font-mono text-slate-300 max-h-96" dir="ltr">
          <pre>{CODE_SNIPPETS.supabaseHook}</pre>
        </div>
      </div>

      {/* خطوات الرفع على Vercel في 4 خطوات بسيطة */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-red-500" />
          <span>خطوات تشغيل ورفع اللعبة على Vercel (Quick Start)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-red-600/30 text-red-400 font-bold flex items-center justify-center text-xs">
              1
            </span>
            <p className="font-bold text-slate-200">إنشاء مشروع Supabase</p>
            <p className="text-slate-400 leading-relaxed">
              ادخل على supabase.com وأنشئ مشروع جديد مجاني. من إعدادات الـ API انسخ الـ URL والـ Anon Key.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-amber-600/30 text-amber-400 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <p className="font-bold text-slate-200">تفعيل Realtime Channels</p>
            <p className="text-slate-400 leading-relaxed">
              من لوحة تحكم Supabase، توجه إلى قسم Database ثم Realtime وتأكد من تفعيل Broadcast & Presence للغرف.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-400 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <p className="font-bold text-slate-200">ربط مستودع GitHub بـ Vercel</p>
            <p className="text-slate-400 leading-relaxed">
              ارفع المشروع على GitHub، ثم اضغط Import في لوحة تحكم Vercel. سيتعرف عليه تلقائياً كـ Next.js.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 font-bold flex items-center justify-center text-xs">
              4
            </span>
            <p className="font-bold text-slate-200">إضافة المتغيرات والتشغيل</p>
            <p className="text-slate-400 leading-relaxed">
              أضف <code className="text-emerald-300 font-mono">NEXT_PUBLIC_SUPABASE_URL</code> و <code className="text-emerald-300 font-mono">ANON_KEY</code> في Vercel واضغط Deploy!
            </p>
          </div>
        </div>

        {/* زر نسخ ملف المتغيرات */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={copyEnvCode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95"
          >
            {copiedEnv ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEnv ? 'تم نسخ المتغيرات!' : 'نسخ قالب .env.local لـ Vercel'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { GitBranch, ShieldAlert, CheckCircle2, Copy, Check, Terminal, Globe, Lock } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface GitHubRepoGuideProps {
  lang: Language;
}

export const GitHubRepoGuide: React.FC<GitHubRepoGuideProps> = ({ lang }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const t = translations[lang];

  const gitCommands = `# 1. قم بتهيئة المستودع المحلي (إن لم يكن مهيأ):
git init
git add .
git commit -m "feat: استوديو النشرة الكوميدية - الإصدار الكامل"

# 2. اربط المستودع برابط الـ GitHub الخاص بك:
# (استبدل USERNAME و REPO باسم حسابك والمستودع)
git remote add origin https://github.com/USERNAME/comedy-news-studio.git
git branch -M main

# 3. ارفع الكود إلى GitHub:
git push -u origin main`;

  const copyGit = () => {
    navigator.clipboard.writeText(gitCommands);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-white">ربط اللعبة بمستودع GitHub ورفعها على Vercel</h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            دليل الربط الآمن والـ Continuous Deployment التلقائي
          </p>
        </div>

        <button
          onClick={copyGit}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95 shrink-0 self-start md:self-auto"
        >
          {copiedCmd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copiedCmd ? 'تم نسخ أوامر Git!' : 'نسخ أوامر الرفع لـ GitHub'}</span>
        </button>
      </div>

      {/* تنبيه أمان هام بخصوص الـ Token */}
      <div className="bg-amber-950/30 border border-amber-800/60 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <Lock className="w-4 h-4 text-amber-400 shrink-0" />
          <span>تنبيه أمان هام بخصوص الـ GitHub Token:</span>
        </div>
        <p className="text-xs text-amber-200/90 leading-relaxed">
          حفاظاً على أمان حسابك وكودك الشخصي، <strong>لا ترسل أبداً الـ Personal Access Token في المحادثة النصية</strong> لأي مساعد ذكي. بدلاً من ذلك، الطريقة الاحترافية والأكثر أماناً هي:
          ربط مستودع GitHub الخاص بك مباشرة بـ Vercel أو استخدام أوامر <code className="bg-black/40 px-1 py-0.5 rounded font-mono">git push</code> من جهازك.
        </p>
      </div>

      {/* أوامر Git الجاهزة للتشغيل */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-bold text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            خطوات رفع الكود إلى المستودع (3 أوامر فقط):
          </span>
          <span className="font-mono text-[11px] text-slate-500">Terminal / Bash</span>
        </div>

        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto text-xs font-mono text-emerald-300 leading-relaxed" dir="ltr">
          <pre>{gitCommands}</pre>
        </div>
      </div>

      {/* دورة العمل التلقائية مع Vercel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 font-bold flex items-center justify-center text-sm">
            1
          </div>
          <h4 className="font-bold text-slate-200 text-sm">التعديل هنا في الاستوديو</h4>
          <p className="text-slate-400 leading-relaxed">
            أي تعديل أو ميزة تطلبها سأقوم ببرمجتها وفحصها وبنائها لك فوراً، ويمكنك تنزيل الكود أو نسخه بنقرة واحدة.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold flex items-center justify-center text-sm">
            2
          </div>
          <h4 className="font-bold text-slate-200 text-sm">الرفع على GitHub</h4>
          <p className="text-slate-400 leading-relaxed">
            تقوم بعمل <code className="text-amber-300 font-mono">git push</code> للتحديثات الجديدة إلى المستودع الرئيسي.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
            3
          </div>
          <h4 className="font-bold text-slate-200 text-sm">النشر التلقائي على Vercel</h4>
          <p className="text-slate-400 leading-relaxed">
            يقوم Vercel تلقائياً باكتشاف الـ Commit وبناء وتحديث رابط اللعبة المباشر في ثوانٍ بدون أي تدخل يدوي!
          </p>
        </div>
      </div>
    </div>
  );
};

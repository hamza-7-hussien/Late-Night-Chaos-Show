import React, { useState } from 'react';
import { FileJson, Copy, Check, Sparkles, MessageCircle, Newspaper, Plus } from 'lucide-react';
import comedyData from '../data/comedyContent.json';

export const ContentLibrary: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'news' | 'prompts' | 'words'>('news');

  const copyEntireJson = () => {
    navigator.clipboard.writeText(JSON.stringify(comedyData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* رأس الصفحة مع زر النسخ الكامل للـ JSON */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <FileJson className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl font-bold text-white">بنك الأخبار والأسئلة الكوميدي (JSON جاهز للتشغيل)</h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            ملف <code className="text-amber-400 font-mono">data/comedyContent.json</code> يحتوي على سيناريوهات إخبارية وقوالب تيليبرومبتر وأسئلة إحراج جاهزة لتغذية اللعبة فوراً.
          </p>
        </div>

        <button
          onClick={copyEntireJson}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-500 text-black font-extrabold shadow shadow-amber-950 transition active:scale-95 shrink-0 self-start md:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'تم نسخ ملف JSON كاملاً!' : 'نسخ ملف comedyContent.json'}</span>
        </button>
      </div>

      {/* أزرار التبديل بين الأقسام */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSection('news')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeSection === 'news'
              ? 'bg-red-600 text-white shadow'
              : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>نشرات المذيع المتورط ({comedyData.newsScripts.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('prompts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeSection === 'prompts'
              ? 'bg-amber-600 text-black shadow'
              : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>أسئلة السر الكوميدي ({comedyData.comedyPrompts.length})</span>
        </button>

        <button
          onClick={() => setActiveSection('words')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
            activeSection === 'words'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>كلمات التوريط المفاجئة ({comedyData.funnyWordPresets.length})</span>
        </button>
      </div>

      {/* قسم 1: نشرات الأخبار */}
      {activeSection === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comedyData.newsScripts.map((news) => (
            <div
              key={news.id}
              className="bg-slate-950 border border-slate-800 hover:border-red-900/60 rounded-2xl p-5 space-y-3 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-red-950/80 text-red-400 border border-red-800/60 px-2 py-0.5 rounded font-bold">
                    {news.category}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">{news.id}</span>
                </div>
                <h4 className="text-base font-bold text-white leading-snug">{news.headline}</h4>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  {news.scriptTemplate.map((part, i) => (
                    <span
                      key={i}
                      className={part.startsWith('[BLANK_') ? 'text-amber-400 font-bold bg-amber-950/60 px-1 rounded' : ''}
                    >
                      {part}
                    </span>
                  ))}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="text-amber-300 italic">تلميح للمذيع: {news.contextHint}</span>
                <span>{news.targetBlanksCount} كلمات مفاجئة</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* قسم 2: أسئلة السر الكوميدي */}
      {activeSection === 'prompts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comedyData.comedyPrompts.map((prompt) => (
            <div
              key={prompt.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-900/60 rounded-2xl p-5 space-y-3 transition flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-amber-950/80 text-amber-300 border border-amber-800/60 px-2.5 py-0.5 rounded font-bold">
                    تصنيف: {prompt.situationCategory}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">{prompt.id}</span>
                </div>
                <h4 className="text-lg font-bold text-slate-100 leading-snug">
                  "{prompt.promptText}"
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>مهلة الإجابة المقترحة: {prompt.timeLimitSeconds} ثانية</span>
                <span className="text-cyan-400">تصويت أعمى</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* قسم 3: بنك الكلمات التوريطية */}
      {activeSection === 'words' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
          <p className="text-xs text-slate-400">
            هذه الكلمات تظهر كأزرار اقتراح سريع للمشاهدين ليقذفوها فوراً في التيليبرومبتر للمذيع بنقرة واحدة:
          </p>
          <div className="flex flex-wrap gap-2.5">
            {comedyData.funnyWordPresets.map((word, i) => (
              <span
                key={i}
                className="bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <span>⚡</span>
                <span>{word}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

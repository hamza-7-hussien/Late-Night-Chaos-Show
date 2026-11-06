import React, { useState } from 'react';
import { Folder, FolderOpen, FileCode, Check, Copy, Layers, ExternalLink } from 'lucide-react';
import { NEXTJS_PROJECT_STRUCTURE, FileNode } from '../data/projectBlueprint';

export const ProjectStructureView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateAsciiTree = (node: FileNode, prefix = ''): string => {
    let result = `${prefix}${node.type === 'folder' ? '📁 ' : '📄 '}${node.name}${node.description ? `  # ${node.description}` : ''}\n`;
    if (node.children) {
      node.children.forEach((child) => {
        result += generateAsciiTree(child, prefix + '  ');
      });
    }
    return result;
  };

  const renderNode = (node: FileNode, depth = 0) => {
    const isFolder = node.type === 'folder';

    return (
      <div key={node.name + depth} className="space-y-1">
        <div
          onClick={() => setSelectedFile(node)}
          style={{ paddingRight: `${depth * 18}px` }}
          className={`flex items-center justify-between py-1.5 px-3 rounded-lg text-xs sm:text-sm cursor-pointer transition ${
            selectedFile?.name === node.name
              ? 'bg-red-600/20 text-red-300 border border-red-500/30'
              : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {isFolder ? (
              <FolderOpen className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
            )}
            <span className={`font-mono ${isFolder ? 'font-bold text-amber-200' : 'text-slate-200'}`}>
              {node.name}
            </span>
          </div>

          {node.description && (
            <span className="text-[11px] text-slate-500 hidden md:inline truncate max-w-xs">
              {node.description}
            </span>
          )}
        </div>

        {node.children && (
          <div className="border-r border-slate-800 mr-2 space-y-0.5">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-bold text-white">هيكل مجلدات وملفات المشروع (Next.js App Router)</h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            تصميم هندسي معياري للعبة جماعية خفيفة وسريعة، مهيأة للرفع على Vercel بدون خادم دائم، مع استغلال كفاءة Realtime Channels.
          </p>
        </div>

        <button
          onClick={() => handleCopyText(generateAsciiTree(NEXTJS_PROJECT_STRUCTURE))}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition active:scale-95 shrink-0 self-start md:self-auto"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'تم نسخ الهيكل بالكامل!' : 'نسخ شجرة الملفات'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* شجرة الملفات التفاعلية */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl max-h-[600px] overflow-y-auto">
          <div className="text-xs font-bold text-slate-400 mb-3 px-2 flex items-center justify-between">
            <span>تصفح الهيكل (اضغط على أي ملف لمعرفة وظيفته):</span>
            <span className="text-slate-500 font-mono">Next.js 14/15 App Router</span>
          </div>
          <div className="space-y-1">
            {renderNode(NEXTJS_PROJECT_STRUCTURE)}
          </div>
        </div>

        {/* بطاقة تفاصيل الملف المختار وشرح المعمارية */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="text-red-400">⚡</span>
              تفاصيل الملف المحدد
            </h3>

            {selectedFile ? (
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-amber-300">
                    {selectedFile.name}
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                    {selectedFile.type === 'folder' ? 'مجلد' : 'ملف برمجي'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedFile.description || 'ملف تنظيمي ضمن منظومة التطبيق.'}
                </p>
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-500 bg-slate-950 rounded-xl border border-dashed border-slate-800">
                اضغط على أي ملف أو مجلد في الشجرة لعرض التفاصيل الهندسية الخاصة به.
              </div>
            )}

            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <h4 className="font-bold text-slate-200">لماذا هذا التوزيع مثالي لـ Vercel؟</h4>
              <ul className="space-y-2 text-slate-400 leading-relaxed list-disc list-inside">
                <li>
                  <strong className="text-slate-200">Next.js App Router:</strong> يعزل شاشات الغرفة <code className="text-amber-400 font-mono">/room/[code]</code> كـ Client Component خفيف يتصل مباشرة بـ Supabase أو Pusher.
                </li>
                <li>
                  <strong className="text-slate-200">صفر تكلفة استضافة للـ WebSockets:</strong> لا حاجة لخادم Node.js شغال 24/7 يدفعك فلوس على الفاضي؛ Vercel يخدم صفحات الويب وSupabase Realtime يتكفل بالمزامنة مجاناً في الخطة المجانية.
                </li>
                <li>
                  <strong className="text-slate-200">فصل الـ Components:</strong> كل طور (المذيع المتورط / السر الكوميدي) معزول في مجلد فرعي مستقل يسهل إضافة أطوار جديدة مستقبلاً مثل "صحفي الفضائح" أو "دبلجة المشاهد".
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

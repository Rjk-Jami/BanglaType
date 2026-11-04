import * as React from 'react';
import { Layers, Server, Monitor, Cpu, Sparkles } from 'lucide-react';

export function SubpathImportsDiagram() {
  const paths = [
    {
      importPath: "import { ... } from 'banglatype'",
      title: "প্রধান বান্ডল (Main Bundle)",
      target: "React 18 & 19 (Client & SSR)",
      icon: Layers,
      color: "border-[#006A4E] dark:border-[#008763]",
      badge: "সম্পূর্ণ প্যাকেজ",
      includes: "BanglaInput, BanglaEditor, সব হুক এবং কোর ইঞ্জিন ফাংশন",
    },
    {
      importPath: "import { ... } from 'banglatype/ui'",
      title: "UI কম্পোনেন্টস (UI Primitives)",
      target: "React Client",
      icon: Monitor,
      color: "border-teal-500",
      badge: "প্রি-বিল্ট UI",
      includes: "Button, Badge, Card, GlassModal, AvroCandidateBar",
    },
    {
      importPath: "import { ... } from 'banglatype/hooks'",
      title: "হেডলেস হুকস (Headless Hooks)",
      target: "React Client",
      icon: Sparkles,
      color: "border-emerald-600",
      badge: "হেডলেস লজিক",
      includes: "useBanglaInput, useBanglaEditor (কোনো UI বা CSS ছাড়া)",
    },
    {
      importPath: "import { ... } from 'banglatype/lib'",
      title: "বিশুদ্ধ অ্যালগরিদম (Pure Engine)",
      target: "Node.js, Edge, Server Components, Worker",
      icon: Server,
      color: "border-amber-600",
      badge: "জিরো ডিপেনডেন্সি",
      includes: "parseAvroText, smartTransliterateFullText, getJatiyoChar",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Cpu className="w-4 h-4 text-[#006A4E] dark:text-[#008763]" />
        <h4 className="font-heading font-bold text-base text-[#14201B] dark:text-[#EDF5F1]">
          সাবপাথ ইম্পোর্ট আর্কিটেকচার ডায়াগ্রাম (Subpath Architecture)
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {paths.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-white dark:bg-[#121E19] border-l-4 ${item.color} border border-[#D9E2DD] dark:border-[#20312B] shadow-xs space-y-2 flex flex-col justify-between`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-zinc-500" />
                    <span className="font-heading font-bold text-sm text-[#14201B] dark:text-[#EDF5F1]">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#EBF3EF] dark:bg-[#142821] text-[#006A4E] dark:text-[#00A377]">
                    {item.badge}
                  </span>
                </div>
                <code className="text-xs font-mono text-zinc-700 dark:text-zinc-300 block bg-[#F4F7F5] dark:bg-[#0C1512] px-2 py-1 rounded">
                  {item.importPath}
                </code>
              </div>

              <div className="space-y-1 pt-2 border-t border-[#D9E2DD]/60 dark:border-[#20312B]/60 text-xs font-body">
                <div className="text-zinc-500">
                  <strong className="text-zinc-700 dark:text-zinc-300">রানটাইম:</strong> {item.target}
                </div>
                <div className="text-zinc-500">
                  <strong className="text-zinc-700 dark:text-zinc-300">অন্তর্ভুক্ত:</strong> {item.includes}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


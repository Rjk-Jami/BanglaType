'use client';

import * as React from 'react';
import { Type, CheckCircle2, AlertTriangle, Cpu, Layers } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

const fontsCodeSnippet = `// app/layout.tsx (Next.js App Router)
import { Anek_Bangla, Hind_Siliguri } from 'next/font/google';

const anek = Anek_Bangla({
  subsets: ['bengali', 'latin'],
  variable: '--font-anek',
  display: 'swap',
});

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});`;

const subpathsSnippet = `// 1. Full bundle (All-in-one)
import { BanglaInput, BanglaEditor } from 'banglatype';

// 2. UI Primitives only (Buttons, Badges, Modals)
import { Button, Badge, Card } from 'banglatype/ui';

// 3. Headless hooks only (No UI dependencies)
import { useBanglaInput, useBanglaEditor } from 'banglatype/hooks';

// 4. Pure typing engine & algorithms only (Node.js & server safe)
import { parseAvroText, getJatiyoChar } from 'banglatype/lib';`;

export function TypographyAndBestPractices() {
  return (
    <div className="flex flex-col gap-6">
      {/* 4.A Typography */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl ring-1 ring-black/5 dark:ring-white/5 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Type className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
              বাংলা টাইপোগ্রাফি সেটআপ (Bengali Typography Best Practices)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body">
              যুক্তাক্ষর (যেমন: ক্ষ, ন্ত, স্ত্র) সঠিকভাবে প্রদর্শন ও ফন্ট ক্লিপিং রোধ করার নিয়ম
            </p>
          </div>
        </div>

        {/* 4 Golden Typography Rules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-body">
          <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-0.5">১. লাইন হাইট (Line-Height &ge; 1.5)</strong>
              <p className="text-zinc-600 dark:text-zinc-400">
                বাংলা হ্রস্বকার ও দীর্ঘকার যেন না কাটে সেজন্য <code className="font-mono text-zinc-800 dark:text-zinc-200">leading-relaxed</code> (1.625) বা কমপক্ষে 1.5 ব্যবহার করুন।
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-0.5">২. নো নেগেটিভ ট্র্যাকিং (No Negative Tracking)</strong>
              <p className="text-zinc-600 dark:text-zinc-400">
                বাংলা টেক্সটে কখনো <code className="font-mono text-rose-500">tracking-tight</code> দেবেন না। নেগেটিভ লেটার-স্পেসিং যুক্তবর্ণের গ্লিফ ভেঙে ফেলে।
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-0.5">৩. ক্যাপিটাল লেটার বা Uppercase নিষিদ্ধ</strong>
              <p className="text-zinc-600 dark:text-zinc-400">
                বাংলায় কোনো ক্যাপিটাল অক্ষর নেই। CSS এ <code className="font-mono text-rose-500">uppercase</code> দিলে অক্ষর বিকৃত হয়ে যায়।
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-50/80 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-zinc-900 dark:text-zinc-100 block mb-0.5">৪. ফর্মে Font Inheritance</strong>
              <p className="text-zinc-600 dark:text-zinc-400">
                গ্লোবাল CSS এ <code className="font-mono text-zinc-800 dark:text-zinc-200">input, textarea &#123; font-family: inherit; &#125;</code> নিশ্চিত করুন।
              </p>
            </div>
          </div>
        </div>

        {/* Font Loading Snippet */}
        <CodeBlock code={fontsCodeSnippet} language="tsx" title="Google Fonts Setup (Next.js)" />
      </div>

      {/* 4.B SSR & Tree Shaking Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SSR Compatibility */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl ring-1 ring-black/5 dark:ring-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-zinc-900 dark:text-zinc-100">
                SSR ও Next.js App Router সুরক্ষা
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body">Zero hydration mismatch</p>
            </div>
          </div>

          <ul className="text-xs font-body text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>ইন্টারেক্টিভ সকল কম্পোনেন্টে স্বয়ংক্রিয়ভাবে <code className="font-mono text-zinc-800 dark:text-zinc-200">&apos;use client&apos;</code> প্রি-কনফিগার করা।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>AvroCandidateBar ব্রাউজার পোর্টাল রেন্ডারিংয়ে <code className="font-mono text-zinc-800 dark:text-zinc-200">typeof document !== &apos;undefined&apos;</code> চেক করে।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>পুনর্ব্যবহারযোগ্য DOM মিরর এলিমেন্ট মেমরি লিক এবং লেআউট ফ্লিকার রোধ করে।</span>
            </li>
          </ul>
        </div>

        {/* Tree shaking */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl ring-1 ring-black/5 dark:ring-white/5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-zinc-900 dark:text-zinc-100">
                ট্রি-শেকিং ও সাবপাথ ইম্পোর্ট
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body">লাইটওয়েট বান্ডল সাইজ</p>
            </div>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-body">
            প্রয়োজনে শুধুমাত্র স্পেসিফিক মডিউল ইম্পোর্ট করে অপ্রয়োজনীয় কোড বাদ দেওয়া সম্ভব:
          </p>

          <CodeBlock code={subpathsSnippet} language="ts" title="Subpath Imports" />
        </div>
      </div>
    </div>
  );
}

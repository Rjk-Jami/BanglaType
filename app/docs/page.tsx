import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DocTOC } from '@/components/docs/DocTOC';
import { DocQuickInstall } from '@/components/docs/DocQuickInstall';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { Pattern1FormDemo } from '@/components/docs/Pattern1FormDemo';
import { Pattern2EditorDemo } from '@/components/docs/Pattern2EditorDemo';
import { Pattern3HeadlessInputDemo } from '@/components/docs/Pattern3HeadlessInputDemo';
import { Pattern4HeadlessEditorDemo } from '@/components/docs/Pattern4HeadlessEditorDemo';
import { Pattern5PureFunctionsDemo } from '@/components/docs/Pattern5PureFunctionsDemo';
import { TypographyAndBestPractices } from '@/components/docs/TypographyAndBestPractices';
import { ApiReferenceTable } from '@/components/docs/ApiReferenceTable';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  ArrowLeft,
  TextCursorInput,
  FileText,
  Boxes,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'লাইব্রেরি ইন্টিগ্রেশন গাইড — BanglaType Production Guide',
  description:
    'যেকোনো React, Next.js, Vite, Remix বা Node.js প্রজেক্টে banglatype লাইব্রেরি যুক্ত করার সম্পূর্ণ হ্যান্ডস-অন ভিজ্যুয়াল গাইড ও লাইভ ডেমো।',
};

const singleLineSnippet = `import { BanglaInput } from 'banglatype';

export default function SearchBar() {
  return <BanglaInput placeholder="বাংলায় খুঁজুন (যেমন: khobor → খবর)..." />;
}`;

const multilineSnippet = `import { BanglaEditor } from 'banglatype';

export default function NoteEditor() {
  return <BanglaEditor placeholder="এখানে বাংলায় বিস্তারিত লিখুন..." />;
}`;

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-zinc-50 via-zinc-100/60 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950">
      {/* Ambient background decoration */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Global Navbar */}
      <Navbar />

      {/* Sticky Quick-Jump Navigation Bar */}
      <DocTOC />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 pt-8 pb-20 w-full max-w-5xl mx-auto">
        <div className="w-full flex flex-col gap-12">
          
          {/* Header & Hero */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-body font-medium text-zinc-600 dark:text-zinc-400 bg-white/80 dark:bg-zinc-900/80 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200/80 dark:border-zinc-800 transition-colors shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>প্লেগ্রাউন্ড স্টুডিওতে ফিরুন</span>
              </Link>

              <Badge variant="emerald" size="sm" className="font-mono text-[11px]">
                v0.1.0 Production
              </Badge>
            </div>

            <div className="space-y-2">
              <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                প্রোডাকশন-রেডি লাইব্রেরি ইন্টিগ্রেশন নির্দেশিকা
              </h1>
              <p className="font-body text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                আপনার যেকোনো এক্সটার্নাল React, Next.js, Vite, Remix বা Node.js প্রজেক্টে <code className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-1.5 py-0.5 rounded">banglatype</code> প্লাগ করুন মাত্র ১ লাইন কোডে — জিরো বয়লারপ্লেট ও শতভাগ টাইপসেফ সহ।
              </p>
            </div>
          </div>

          {/* Section 1: Quick Start */}
          <section id="quick-start" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                ১
              </div>
              <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                কুইক স্টার্ট: ১ লাইনের ড্রপ-ইন কম্পোনেন্ট (Quick Start)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1.A Single Line Input */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl ring-1 ring-black/5 dark:ring-white/5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <TextCursorInput className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-zinc-100">
                      A. সিঙ্গেল-লাইন ইনপুট (&lt;BanglaInput /&gt;)
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-body leading-relaxed">
                    সার্চবার, ফর্ম বা ছোট ইনপুটের জন্য ইনস্ট্যান্ট ফোনেটিক কনভার্সন, কেয়ারট-অ্যাঙ্করড সাজেশন্স, ক্লিয়ার বাটন এবং কপি বাটন।
                  </p>
                </div>
                <CodeBlock code={singleLineSnippet} language="tsx" title="SearchBar.tsx" />
              </div>

              {/* 1.B Multiline Editor */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl ring-1 ring-black/5 dark:ring-white/5 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <h3 className="font-heading font-bold text-base text-zinc-900 dark:text-zinc-100">
                      B. মাল্টিলাইন টেক্সট এরিয়া (&lt;BanglaEditor /&gt;)
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-body leading-relaxed">
                    পূর্ণাঙ্গ গ্লাসমেট ওয়ার্কস্পেস যার মধ্যে মোড সুইচিং (Avro / Jatiyo / English), লাইভ শব্দ ও ক্যারেক্টার কাউন্টার এবং কনভার্সন সংযুক্ত।
                  </p>
                </div>
                <CodeBlock code={multilineSnippet} language="tsx" title="NoteEditor.tsx" />
              </div>
            </div>
          </section>

          {/* Section 2: Installation */}
          <section id="installation" className="space-y-4 scroll-mt-28">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                ২
              </div>
              <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                ইনস্টলেশন ও ডিপেনডেন্সি (Installation)
              </h2>
            </div>

            <DocQuickInstall />
          </section>

          {/* Section 3: Integration Patterns */}
          <section id="patterns" className="space-y-8 scroll-mt-28">
            <div className="space-y-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  ৩
                </div>
                <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ৫টি ইন্টিগ্রেশন প্যাটার্ন (লাইভ ডেমো ও কোড)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-body">
                সহজ ড্রপ-ইন ফর্ম থেকে শুরু করে সম্পূর্ণ হেডলেস হুক এবং পিউর নোডজেএস ফাংশন পর্যন্ত সব ব্যবহারের উপায় নিচে সরাসরি লাইভ চালিয়ে দেখুন:
              </p>
            </div>

            {/* Pattern 1 */}
            <Pattern1FormDemo />

            {/* Pattern 2 */}
            <Pattern2EditorDemo />

            {/* Pattern 3 */}
            <Pattern3HeadlessInputDemo />

            {/* Pattern 4 */}
            <Pattern4HeadlessEditorDemo />

            {/* Pattern 5 */}
            <Pattern5PureFunctionsDemo />
          </section>

          {/* Section 4: Production Checklist & Typography */}
          <section id="best-practices" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                ৪
              </div>
              <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                প্রোডাকশন চেকলিস্ট ও বাংলা টাইপোগ্রাফি
              </h2>
            </div>

            <TypographyAndBestPractices />
          </section>

          {/* Section 5: API Reference */}
          <section id="api-reference" className="space-y-6 scroll-mt-28">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                ৫
              </div>
              <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                পাবলিক API স্পেসিফিকেশন (Public API Reference)
              </h2>
            </div>

            <ApiReferenceTable />
          </section>

          {/* Bottom Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-emerald-950 via-zinc-950 to-teal-950 border border-emerald-900/40 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Boxes className="w-5 h-5 text-emerald-400" />
                <h3 className="font-heading font-bold text-xl text-white">
                  এখনই আপনার প্রজেক্টে যুক্ত করতে প্রস্তুত?
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 font-body max-w-xl">
                কোনো জটিল কনফিগারেশন ছাড়াই npm থেকে ইন্সটল করে সরাসরি ব্যবহার শুরু করুন। সম্পূর্ণ টাইপস্ক্রিপ্ট সাপোর্ট ও আধুনিক UI কম্পোনেন্টস অন্তর্ভুক্ত।
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-body font-semibold transition-colors shadow-lg shadow-emerald-900/30 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>প্লেগ্রাউন্ডে পরীক্ষা করুন</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

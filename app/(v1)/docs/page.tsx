import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { DocTOC } from '@/components/docs/DocTOC';
import { DocsHero } from '@/components/docs/DocsHero';
import { DocQuickStartSection } from '@/components/docs/DocQuickStartSection';
import { DocInstallationSection } from '@/components/docs/DocInstallationSection';
import { DocCtaBanner } from '@/components/docs/DocCtaBanner';

export const metadata: Metadata = {
  title: 'লাইব্রেরি ইন্টিগ্রেশন নির্দেশিকা — BanglaType Documentation',
  description:
    'যেকোনো React, Next.js, Vite, Remix বা Node.js প্রজেক্টে banglatype লাইব্রেরি যুক্ত করার সম্পূর্ণ হ্যান্ডস-অন ভিজ্যুয়াল গাইড ও লাইভ ডেমো।',
};

// Code-split heavy interactive sections
const DocPatternsSection = dynamic(
  () => import('@/components/docs/DocPatternsSection').then((mod) => mod.DocPatternsSection),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-64 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
      </div>
    ),
  }
);

const KeyboardShortcutsTable = dynamic(
  () => import('@/components/docs/KeyboardShortcutsTable').then((mod) => mod.KeyboardShortcutsTable),
  {
    loading: () => (
      <div className="h-40 bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
    ),
  }
);

const DocBestPracticesSection = dynamic(
  () => import('@/components/docs/DocBestPracticesSection').then((mod) => mod.DocBestPracticesSection),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-48 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
      </div>
    ),
  }
);

const HonestLimitsSection = dynamic(
  () => import('@/components/docs/HonestLimitsSection').then((mod) => mod.HonestLimitsSection),
  {
    loading: () => (
      <div className="h-32 bg-zinc-100 dark:bg-zinc-900 rounded-2xl animate-pulse" />
    ),
  }
);

const DocApiReferenceSection = dynamic(
  () => import('@/components/docs/DocApiReferenceSection').then((mod) => mod.DocApiReferenceSection),
  {
    loading: () => (
      <div className="space-y-4 animate-pulse">
        <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
        <div className="h-72 bg-zinc-100 dark:bg-zinc-900 rounded-2xl" />
      </div>
    ),
  }
);

export default function DocsPage() {
  return (
    <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 pt-20 pb-20">
      {/* Mobile Sticky Table of Contents bar */}
      <div className="lg:hidden mb-6 sticky top-14 z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-2 bg-[#F4F7F5]/90 dark:bg-[#0C1512]/90 backdrop-blur-md border-b border-[#D9E2DD] dark:border-[#20312B]">
        <DocTOC variant="mobile" />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-10 2xl:gap-12 relative">
        {/* Left Side: Sticky Table of Contents (TOC) with increased height on 2xl */}
        <aside className="hidden lg:block w-64 xl:w-72 2xl:w-80 shrink-0 sticky top-20 z-20 self-start 2xl:h-[calc(100vh-7rem)]">
          <DocTOC variant="desktop" className="2xl:h-full" />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 w-full max-w-4xl 2xl:max-w-5xl space-y-12">
          {/* Header & Hero */}
          <DocsHero />

          {/* Section 1: Quick Start */}
          <DocQuickStartSection />

          {/* Section 2: Installation */}
          <DocInstallationSection />

          {/* Section 3: Integration Patterns & Bring Your Own UI */}
          <DocPatternsSection />

          {/* Section 4: Keyboard Shortcuts */}
          <KeyboardShortcutsTable />

          {/* Section 5: Production Checklist & Typography */}
          <DocBestPracticesSection />

          {/* Section 6: Honest Limits */}
          <HonestLimitsSection />

          {/* Section 7: API Reference */}
          <DocApiReferenceSection />

          {/* Bottom Call to Action Banner */}
          <DocCtaBanner />
        </main>
      </div>
    </div>
  );
}

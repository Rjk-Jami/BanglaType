'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { KeyboardMode } from '@/lib/keyboard/types';
import { HomeHero } from '@/components/home/HomeHero';
import { HomeModeControl } from '@/components/home/HomeModeControl';

// Code-split client components
const HomeInputShowcase = dynamic(
  () => import('@/components/home/HomeInputShowcase').then((mod) => mod.HomeInputShowcase),
  {
    loading: () => (
      <div className="h-32 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] animate-pulse" />
    ),
  }
);

const HomeEditorShowcase = dynamic(
  () => import('@/components/home/HomeEditorShowcase').then((mod) => mod.HomeEditorShowcase),
  {
    loading: () => (
      <div className="h-96 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] animate-pulse" />
    ),
  }
);

export default function Home() {
  const [mode, setMode] = useState<KeyboardMode>('avro');

  return (
    <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 pt-16 pb-16 w-full max-w-7xl mx-auto">
      <div className="w-full flex flex-col gap-8">
        {/* 1. Hero Section: Live transliteration moment */}
        <HomeHero />

        {/* 2. Studio Workspace & Mode Control */}
        <div className="space-y-4 pt-4 border-t border-[#D9E2DD]/70 dark:border-[#20312B]/70">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-[#14201B] dark:text-[#EDF5F1]">
              স্টুডিও ওয়ার্কস্পেস (Interactive Studio)
            </h2>
            <span className="text-xs text-zinc-500 font-body">
              লাইভ টাইপিং, মোড সুইচিং ও সংখ্যা গণনা
            </span>
          </div>

          <HomeModeControl mode={mode} onModeChange={setMode} />
        </div>

        {/* 3. Single-Line Input Showcase Card */}
        <HomeInputShowcase mode={mode} />

        {/* 4. Multiline Textarea Editor Showcase Card */}
        <HomeEditorShowcase mode={mode} onModeChange={setMode} />
      </div>
    </main>
  );
}

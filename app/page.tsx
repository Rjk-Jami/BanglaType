'use client';

import { useState } from 'react';
import { NavTab, KeyboardMode } from '@/lib/keyboard/types';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { BanglaEditor } from '@/components/editor/BanglaEditor';
import { PhoneticGuideView } from '@/components/guide/PhoneticGuideView';
import { DictionaryView } from '@/components/dictionary/DictionaryView';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('writer');
  const [mode, setMode] = useState<KeyboardMode>('avro');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-zinc-50 via-zinc-100/60 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950">
      {/* Ambient background decoration */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[400px] h-[400px] bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Navigation */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 pb-16">
        <AnimatePresence mode="wait">
          {activeTab === 'writer' && (
            <motion.div
              key="writer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col"
            >
              <HeroSection />
              <BanglaEditor mode={mode} onModeChange={setMode} />
            </motion.div>
          )}

          {activeTab === 'guide' && (
            <motion.div
              key="guide"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <PhoneticGuideView />
            </motion.div>
          )}

          {activeTab === 'dictionary' && (
            <motion.div
              key="dictionary"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <DictionaryView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

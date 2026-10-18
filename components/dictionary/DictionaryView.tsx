'use client';

import { useState, useMemo } from 'react';
import { BANGLA_DICTIONARY } from '@/lib/dictionary/bangla-dict';
import { Search, Book, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function DictionaryView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWords = useMemo(() => {
    if (!searchTerm.trim()) return BANGLA_DICTIONARY;
    const q = searchTerm.toLowerCase().trim();
    return BANGLA_DICTIONARY.filter(
      (entry) =>
        entry.word.includes(q) ||
        entry.phonetic.toLowerCase().includes(q) ||
        entry.meaning.includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-medium">
          <Book className="w-3.5 h-3.5" />
          <span>সহজ বাংলা অভিধান</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          অভিধান (Bangla Dictionary)
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg">
          সঠিক বানান, অর্থ ও উচ্চারণ দেখে নিন। বাংলা অথবা ইংরেজি উভয় হরফেই অনুসন্ধান করতে পারেন:
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-lg mx-auto w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="শব্দ বা উচ্চারণ লিখুন (যেমন: বাংলা, bangla)..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl text-base bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      {/* Dictionary Entries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWords.map((entry) => (
          <motion.div
            key={entry.word}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-md transition-all flex flex-col gap-2"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {entry.word}
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  /{entry.phonetic}/
                </span>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                {entry.partOfSpeech}
              </span>
            </div>

            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pt-1">
              {entry.meaning}
            </p>

            {entry.example && (
              <div className="mt-auto pt-2 text-xs text-zinc-500 dark:text-zinc-400 italic bg-zinc-50/70 dark:bg-zinc-800/50 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
                <span className="font-semibold not-italic text-zinc-600 dark:text-zinc-300">
                  উদাহরণ:{' '}
                </span>
                "{entry.example}"
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          অভিধানে এই শব্দটি পাওয়া যায়নি। অন্য কোনো শব্দ দিয়ে চেষ্টা করুন।
        </div>
      )}
    </div>
  );
}

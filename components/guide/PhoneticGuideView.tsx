'use client';

import { useState, useMemo } from 'react';
import { PHONETIC_RULES } from '@/lib/keyboard/phonetic-rules';
import { Search, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

export function PhoneticGuideView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredRules = useMemo(() => {
    return PHONETIC_RULES.filter((rule) => {
      const matchesSearch =
        rule.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.bangla.includes(searchTerm) ||
        (rule.exampleEng && rule.exampleEng.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (rule.exampleBan && rule.exampleBan.includes(searchTerm));

      const matchesCat =
        selectedCategory === 'all' || rule.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const categories = [
    { id: 'all', label: 'সব নিয়ম' },
    { id: 'vowel', label: 'স্বরবর্ণ' },
    { id: 'consonant', label: 'ব্যঞ্জনবর্ণ' },
    { id: 'conjunct', label: 'যুক্তবর্ণ ও বিশেষ' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5" />
          <span>অভ্র ফোনেটিক সহায়িকা</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          ধ্বনি নির্দেশিকা (Phonetic Guide)
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-lg">
          ইংরেজি অক্ষরে উচ্চারণ অনুযায়ী লিখুন, খুব সহজেই বাংলায় পরিণত হবে। নিচে সব নিয়ম ও উদাহরণ দেওয়া হলো:
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm">
        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="নিয়ম বা অক্ষর খুঁজুন..."
            className="w-full pl-9 pr-3 py-2 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto p-1 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-xl">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors select-none cursor-pointer whitespace-nowrap ${
                selectedCategory === c.id
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredRules.map((rule) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/70 dark:border-zinc-800/70 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 border border-zinc-200 dark:border-zinc-700">
                {rule.english}
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                {rule.bangla}
              </span>
            </div>

            {rule.exampleEng && rule.exampleBan && (
              <div className="mt-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>
                  যেমন:{' '}
                  <span className="font-mono text-zinc-700 dark:text-zinc-300">
                    {rule.exampleEng}
                  </span>
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  → {rule.exampleBan}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredRules.length === 0 && (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          কোনো ফলাফল পাওয়া যায়নি। অন্য কিছু লিখে খুঁজুন।
        </div>
      )}
    </div>
  );
}

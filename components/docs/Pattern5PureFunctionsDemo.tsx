'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  parseAvroText,
  smartTransliterateFullText,
  getJatiyoChar,
  fetchWordSuggestions,
} from '@/lib';
import { CodeBlock } from './CodeBlock';
import { Play, Code, Cpu, Terminal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const codeSnippet = `import {
  parseAvroText,
  smartTransliterateFullText,
  getJatiyoChar,
  fetchWordSuggestions,
} from 'banglatype';

// 1. Instant synchronous phonetic transliteration
const bangla = parseAvroText('amar sonar bangla');
console.log(bangla); // "আমার সোনার বাংলা"

// 2. Intelligent full text transliteration with dictionary lookup
const accurateBangla = await smartTransliterateFullText('ami bangladeshke bhalobashi');
console.log(accurateBangla); // "আমি বাংলাদেশকে ভালোবাসি"

// 3. Physical QWERTY-to-Jatiyo keyboard keystroke conversion
const char = getJatiyoChar({ key: 'd', shiftKey: false });
console.log(char); // "ি"

// 4. Fetch dictionary candidates for phonetic word
const candidates = await fetchWordSuggestions('shadhinota');
console.log(candidates); // ["স্বাধীনতা", "স্বাধীনতার", ...]`;

export function Pattern5PureFunctionsDemo() {
  const [tab, setTab] = useState<'demo' | 'code'>('demo');
  const [inputText, setInputText] = useState('amar sonar bangla');
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<{
    fastAvro: string;
    smartTranslit: string;
    candidates: string[];
    sampleJatiyo: string;
  } | null>(null);

  const handleRun = async () => {
    setRunning(true);
    try {
      const fast = parseAvroText(inputText);
      const smart = await smartTransliterateFullText(inputText);
      const words = inputText.trim().split(/\s+/);
      const lastWord = words[words.length - 1] || 'bangla';
      const suggs = await fetchWordSuggestions(lastWord);
      const jatiyoD = getJatiyoChar({ key: 'd', shiftKey: false }) || 'ি';

      setResults({
        fastAvro: fast,
        smartTranslit: smart,
        candidates: suggs,
        sampleJatiyo: `key: 'd' → "${jatiyoD}"`,
      });
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-xs font-mono font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
              প্যাটার্ন ৫
            </span>
            <h4 className="font-heading font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50">
              পিউর ফাংশনস (Backend, Node.js, CLI, Non-React)
            </h4>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body mt-1">
            React ছাড়া যেকোনো ব্যাকএন্ড, API রুট, স্ক্রিপ্ট বা CLI টুলে সরাসরি অ্যালগরিদম ব্যবহার করুন
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center p-1 bg-zinc-200/60 dark:bg-zinc-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setTab('demo')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-body font-medium transition-colors cursor-pointer ${
              tab === 'demo'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>ইন্টারেক্টিভ স্যান্ডবক্স</span>
          </button>
          <button
            onClick={() => setTab('code')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-body font-medium transition-colors cursor-pointer ${
              tab === 'code'
                ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Node.js কোড</span>
          </button>
        </div>
      </div>

      {/* Contents */}
      <div className="p-5 sm:p-6">
        {tab === 'demo' ? (
          <div className="space-y-5 max-w-2xl">
            {/* Input sandbox controls */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 font-body flex items-center justify-between">
                <span>টেস্ট ইনপুট স্ট্রিং (English Phonetic Input):</span>
                <span className="text-zinc-400 font-normal">যেকোনো শব্দ পরিবর্তন করে টেস্ট করুন</span>
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="যেমন: ami banglay gan gai..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 font-mono text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-emerald-500/30"
                />
                <Button
                  onClick={handleRun}
                  variant="emerald"
                  size="default"
                  disabled={running || !inputText.trim()}
                  className="shrink-0"
                >
                  {running ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>ফাংশন রান করুন</span>
                </Button>
              </div>
            </div>

            {/* Live Outputs preview */}
            {results && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-body flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  <span>ফাংশন এক্সিকিউশন আউটপুট (Real-time Function Outputs):</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* 1. Fast Avro */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200">
                    <div className="text-emerald-400 font-mono text-[11px] mb-1 font-semibold">
                      parseAvroText(str)
                    </div>
                    <div className="text-lg font-heading text-white">{results.fastAvro}</div>
                    <div className="text-[11px] text-zinc-500 mt-1 font-mono">Synchronous • ~0.1ms</div>
                  </div>

                  {/* 2. Smart Translit */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200">
                    <div className="text-teal-400 font-mono text-[11px] mb-1 font-semibold">
                      smartTransliterateFullText(str)
                    </div>
                    <div className="text-lg font-heading text-white">{results.smartTranslit}</div>
                    <div className="text-[11px] text-zinc-500 mt-1 font-mono">Async • Dictionary Refined</div>
                  </div>

                  {/* 3. Suggestions */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200">
                    <div className="text-amber-400 font-mono text-[11px] mb-1 font-semibold">
                      fetchWordSuggestions(lastWord)
                    </div>
                    <div className="text-sm font-heading text-white flex flex-wrap gap-1.5 mt-1">
                      {results.candidates.length > 0 ? (
                        results.candidates.slice(0, 5).map((w, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-zinc-800 text-amber-300">
                            {w}
                          </span>
                        ))
                      ) : (
                        <span className="text-zinc-500">কোনো সাজেশন মেলেনি</span>
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-2 font-mono">
                      Total {results.candidates.length} candidates
                    </div>
                  </div>

                  {/* 4. Jatiyo mapping */}
                  <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200">
                    <div className="text-purple-400 font-mono text-[11px] mb-1 font-semibold">
                      getJatiyoChar(keystroke)
                    </div>
                    <div className="text-lg font-heading text-white">{results.sampleJatiyo}</div>
                    <div className="text-[11px] text-zinc-500 mt-1 font-mono">QWERTY to Jatiyo Physical Key</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CodeBlock code={codeSnippet} language="ts" title="pure-translit.ts" />
        )}
      </div>
    </div>
  );
}

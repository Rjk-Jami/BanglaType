'use client';

import * as React from 'react';
import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';

interface PropRow {
  name: string;
  type: string;
  defaultVal?: string;
  desc: string;
}

const banglaInputProps: PropRow[] = [
  {
    name: 'mode',
    type: "'avro' | 'jatiyo' | 'english'",
    defaultVal: "'avro'",
    desc: 'সক্রিয় কীবোর্ড টাইপিং মোড',
  },
  {
    name: 'placeholder',
    type: 'string',
    defaultVal: "'এক লাইনে বাংলায় লিখুন...'",
    desc: 'ইনপুট প্লেসহোল্ডার টেক্সট',
  },
  {
    name: 'initialValue',
    type: 'string',
    defaultVal: "''",
    desc: 'প্রাথমিক ডিফল্ট ভ্যালু',
  },
  {
    name: 'onValueChange',
    type: '(value: string) => void',
    defaultVal: 'undefined',
    desc: 'যেকোনো টেক্সট পরিবর্তনের সাথে সাথে কলব্যাক ফায়ার হয়',
  },
  {
    name: 'showCopy',
    type: 'boolean',
    defaultVal: 'true',
    desc: 'ইনলাইন ক্লিপবোর্ড কপি বাটন প্রদর্শন করবে কি না',
  },
  {
    name: 'showClear',
    type: 'boolean',
    defaultVal: 'true',
    desc: 'টেক্সট থাকলে ইনলাইন ক্লিয়ার বাটন প্রদর্শন করবে কি না',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: "''",
    desc: 'কন্টেইনারের অতিরিক্ত CSS ক্লাস',
  },
];

const banglaEditorProps: PropRow[] = [
  {
    name: 'mode',
    type: "'avro' | 'jatiyo' | 'english'",
    defaultVal: "'avro'",
    desc: 'এক্সটার্নাল কন্ট্রোল্ড কীবোর্ড মোড',
  },
  {
    name: 'onModeChange',
    type: '(mode: KeyboardMode) => void',
    defaultVal: 'undefined',
    desc: 'মোড পরিবর্তন হলে কলব্যাক ফায়ার হয়',
  },
  {
    name: 'initialValue',
    type: 'string',
    defaultVal: "''",
    desc: 'প্রাথমিক টেক্সট কনটেন্ট',
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    defaultVal: 'undefined',
    desc: 'টেক্সট পরিবর্তনের কলব্যাক',
  },
  {
    name: 'showModeSelector',
    type: 'boolean',
    defaultVal: 'true',
    desc: 'উপরে সেগমেন্টেড মোড পিল প্রদর্শন করবে কি না',
  },
  {
    name: 'className',
    type: 'string',
    defaultVal: "''",
    desc: 'এডিটরের অতিরিক্ত CSS ক্লাস',
  },
];

const useBanglaInputReturn: PropRow[] = [
  {
    name: 'value',
    type: 'string',
    desc: 'বর্তমান ইনপুট টেক্সট ভ্যালু',
  },
  {
    name: 'inputRef',
    type: 'RefObject<HTMLInputElement>',
    desc: 'আপনার নিজস্ব <input> ট্যাগ-এ যুক্ত করার Ref',
  },
  {
    name: 'handleKeyDown',
    type: '(e: KeyboardEvent) => void',
    desc: 'ধ্বনিগত রূপান্তর ও শর্টকাটের Keydown লিসেনার',
  },
  {
    name: 'handleChange',
    type: '(e: ChangeEvent) => void',
    desc: 'ইনপুট চেঞ্জ হ্যান্ডলার',
  },
  {
    name: 'handleBlur',
    type: '() => void',
    desc: 'ইনপুট ব্লার হলে সক্রিয় বাফার স্থায়ীভাবে যুক্ত করার লিসেনার',
  },
  {
    name: 'clearValue',
    type: '() => void',
    desc: 'ইনপুট খালি করার ফাংশন',
  },
  {
    name: 'candidates',
    type: 'string[]',
    desc: 'সক্রিয় শব্দ পরামর্শ তালিকা (Avro Candidate Suggestions)',
  },
  {
    name: 'activeRaw',
    type: 'string',
    desc: 'বর্তমান আন-ট্রান্সলিটারেটেড ফোনেটিক বাফার (যেমন: "khob")',
  },
  {
    name: 'selectedCandidateIndex',
    type: 'number',
    desc: 'নির্বাচিত বা হাইলাইট করা ক্যান্ডিডেটের ইনডেক্স',
  },
  {
    name: 'selectCandidate',
    type: '(idx: number, appendSpace?: boolean) => void',
    desc: 'ইনডেক্স দিয়ে নির্দিষ্ট সাজেশন সিলেক্ট করার ফাংশন',
  },
  {
    name: 'hasCandidateBar',
    type: 'boolean',
    desc: 'পরামর্শ দেখানোর উপযুক্ত অবস্থা নির্দেশক বুলিয়ান ফ্ল্যাগ',
  },
];

const useBanglaEditorReturn: PropRow[] = [
  {
    name: 'text',
    type: 'string',
    desc: 'বর্তমান এডিটরের পুরো টেক্সট',
  },
  {
    name: 'textareaRef',
    type: 'RefObject<HTMLTextAreaElement>',
    desc: 'কাস্টম <textarea> এ যুক্ত করার Ref',
  },
  {
    name: 'stats',
    type: '{ characters: number, words: number, lines: number }',
    desc: 'রিয়েলটাইম শব্দ, অক্ষর ও লাইনের পরিসংখ্যান',
  },
  {
    name: 'handleKeyDown',
    type: '(e: KeyboardEvent) => void',
    desc: 'কি-বোর্ড ইভেন্ট প্রসেসর',
  },
  {
    name: 'handleChange',
    type: '(e: ChangeEvent) => void',
    desc: 'টেক্সট পরিবর্তন লিসেনার',
  },
  {
    name: 'copyToClipboard',
    type: '() => Promise<void>',
    desc: 'ক্লিপবোর্ডে কপি করার ফাংশন',
  },
  {
    name: 'copied',
    type: 'boolean',
    desc: 'কপি সফল হলে ২ সেকেন্ডের ফিডব্যাক ফ্ল্যাগ',
  },
  {
    name: 'clearText',
    type: '() => void',
    desc: 'এডিটর ক্লিয়ার করার হেল্পার',
  },
  {
    name: 'convertCurrentTextToBangla',
    type: '() => Promise<void>',
    desc: 'সম্পূর্ণ টেক্সটকে একসাথে বাংলায় রূপান্তরকারী ফাংশন',
  },
  {
    name: 'candidates',
    type: 'string[]',
    desc: 'শব্দ সাজেশনের অ্যারে',
  },
  {
    name: 'hasCandidateBar',
    type: 'boolean',
    desc: 'সাজেশন দেখানোর ফ্ল্যাগ',
  },
];

type ApiTab = 'input' | 'editor' | 'hookInput' | 'hookEditor';

export function ApiReferenceTable() {
  const [activeTab, setActiveTab] = useState<ApiTab>('input');
  const [search, setSearch] = useState('');

  let currentRows: PropRow[] = [];
  let title = '';
  let subtitle = '';

  if (activeTab === 'input') {
    currentRows = banglaInputProps;
    title = '<BanglaInput /> Props';
    subtitle = 'সিঙ্গেল-লাইন ইনপুট কম্পোনেন্টের সব কনফিগারেশন প্রপ্স';
  } else if (activeTab === 'editor') {
    currentRows = banglaEditorProps;
    title = '<BanglaEditor /> Props';
    subtitle = 'মাল্টিলাইন টেক্সট এডিটর কম্পোনেন্টের সব কনফিগারেশন প্রপ্স';
  } else if (activeTab === 'hookInput') {
    currentRows = useBanglaInputReturn;
    title = 'useBanglaInput() Return Object';
    subtitle = 'হেডলেস সিঙ্গেল-লাইন ইনপুট হুকের রিটার্ন মেম্বার';
  } else {
    currentRows = useBanglaEditorReturn;
    title = 'useBanglaEditor() Return Object';
    subtitle = 'হেডলেস টেক্সটএরিয়া হুকের রিটার্ন স্টেট ও মেথড';
  }

  const filtered = currentRows.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
                পাবলিক API রেফারেন্স (Public API Reference)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-body">
                সকল কম্পোনেন্ট প্রপ্স এবং হেডলেস হুক এর পূর্ণাঙ্গ স্পেসিফিকেশন
              </p>
            </div>
          </div>

          {/* Quick search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="প্রপ বা মেম্বার খুঁজুন..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-body outline-none focus:ring-2 focus:ring-emerald-500/20 w-full sm:w-48"
            />
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            onClick={() => setActiveTab('input')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'input'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/60'
            }`}
          >
            &lt;BanglaInput /&gt;
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'editor'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/60'
            }`}
          >
            &lt;BanglaEditor /&gt;
          </button>
          <button
            onClick={() => setActiveTab('hookInput')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'hookInput'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/60'
            }`}
          >
            useBanglaInput()
          </button>
          <button
            onClick={() => setActiveTab('hookEditor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'hookEditor'
                ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                : 'bg-zinc-200/60 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300/60'
            }`}
          >
            useBanglaEditor()
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-5 sm:p-6 space-y-3">
        <div className="flex items-baseline justify-between">
          <h4 className="font-heading font-bold text-sm text-zinc-900 dark:text-zinc-100">
            {title}
          </h4>
          <span className="text-xs text-zinc-500 font-body">{subtitle}</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
          <table className="w-full text-left text-xs font-body divide-y divide-zinc-200/80 dark:divide-zinc-800">
            <thead className="bg-zinc-100/70 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-semibold font-mono uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-4 py-3">নাম (Prop / Member)</th>
                <th className="px-4 py-3">টাইপ (Type)</th>
                {activeTab.startsWith('hook') ? null : (
                  <th className="px-4 py-3">ডিফল্ট (Default)</th>
                )}
                <th className="px-4 py-3">বিবরণ (Description)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 bg-white/50 dark:bg-zinc-900/50">
              {filtered.map((r, i) => (
                <tr
                  key={i}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                    {r.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
                    <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[11px] text-zinc-800 dark:text-zinc-200">
                      {r.type}
                    </span>
                  </td>
                  {activeTab.startsWith('hook') ? null : (
                    <td className="px-4 py-3 font-mono text-zinc-500 dark:text-zinc-400 whitespace-nowrap text-[11px]">
                      {r.defaultVal || '-'}
                    </td>
                  )}
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 leading-relaxed min-w-[200px]">
                    {r.desc}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-zinc-400 font-body"
                  >
                    কোনো তথ্য মেলেনি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

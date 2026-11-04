import { TextCursorInput, FileText } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

const singleLineSnippet = `import { BanglaInput } from 'banglatype';

export default function SearchBar() {
  return <BanglaInput placeholder="বাংলায় খুঁজুন (যেমন: khobor → খবর)..." />;
}`;

const multilineSnippet = `import { BanglaEditor } from 'banglatype';

export default function NoteEditor() {
  return <BanglaEditor placeholder="এখানে বাংলায় বিস্তারিত লিখুন..." />;
}`;

export function DocQuickStartSection() {
  return (
    <section id="quick-start" className="space-y-6 scroll-mt-24">
      <div className="flex items-center gap-2 pb-2 border-b border-[#D9E2DD] dark:border-[#20312B]">
        <div className="w-7 h-7 rounded-lg bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs">
          ১
        </div>
        <h2 className="font-heading text-2xl font-bold text-[#14201B] dark:text-[#EDF5F1]">
          কুইক স্টার্ট: ১ লাইনের ড্রপ-ইন কম্পোনেন্ট (Quick Start)
        </h2>
      </div>

      <div className="grid grid-cols-1  gap-6">
        {/* 1.A Single Line Input */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TextCursorInput className="w-4 h-4 text-[#006A4E] dark:text-[#008763]" />
              <h3 className="font-heading font-bold text-base text-[#14201B] dark:text-[#EDF5F1]">
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
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#006A4E] dark:text-[#008763]" />
              <h3 className="font-heading font-bold text-base text-[#14201B] dark:text-[#EDF5F1]">
                B. মাল্টিলাইন টেক্সট এরিয়া (&lt;BanglaEditor /&gt;)
              </h3>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 font-body leading-relaxed">
              পূর্ণাঙ্গ ওয়ার্কস্পেস যার মধ্যে মোড সুইচিং (Avro / Jatiyo / English), লাইভ শব্দ ও ক্যারেক্টার কাউন্টার এবং কনভার্সন সংযুক্ত।
            </p>
          </div>
          <CodeBlock code={multilineSnippet} language="tsx" title="NoteEditor.tsx" />
        </div>
      </div>
    </section>
  );
}

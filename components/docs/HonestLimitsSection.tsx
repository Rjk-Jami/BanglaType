import * as React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export function HonestLimitsSection() {
  return (
    <section id="limits" className="space-y-4 scroll-mt-24">
      <div className="flex items-center gap-2 pb-2 border-b border-[#D9E2DD] dark:border-[#20312B]">
        <div className="w-7 h-7 rounded-lg bg-[#006A4E] text-white flex items-center justify-center font-bold text-xs">
          <ShieldCheck className="w-4 h-4" />
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold text-[#14201B] dark:text-[#EDF5F1]">
            সীমাবদ্ধতা ও বাস্তব ব্যবহারের নোট (Honest Limits)
          </h2>
          <p className="text-xs text-zinc-500 font-body">
            ডিকশনারিমুক্ত ইঞ্জিন ও ব্রাউজার ইনপুট ইভেন্টের কারিগরি সীমাবদ্ধতা
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#121E19] border border-[#D9E2DD] dark:border-[#20312B] shadow-xs space-y-4 text-xs font-body text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <p>
          <code className="font-mono text-[#006A4E] dark:text-[#00A377] bg-[#EBF3EF] dark:bg-[#142821] px-1 py-0.5 rounded">banglatype</code> কোনো ভারী বহিরাগত ডিকশনারি বা ভারী ব্যাকএন্ড রিকোয়েস্ট ছাড়াই বিশুদ্ধ অ্যালগরিদমিক নিয়মে চলে। তাই উৎপাদন পরিবেশে কাজ করার সময় নিচের বিষয়গুলো মনে রাখা জরুরি:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Limit 1: Homophones */}
          <div className="p-4 rounded-xl bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B] space-y-2">
            <strong className="text-[#14201B] dark:text-[#EDF5F1] block font-heading text-sm font-bold">
              ১. সমোচ্চারিত শব্দ (Homophones)
            </strong>
            <p>
              কিছু বানান যেমন &apos;শ&apos;/&apos;ষ&apos;/&apos;স&apos; কিংবা &apos;ণ&apos;/&apos;ন&apos; একই ইংরেজি ফোনেটিক বানানে আসতে পারে। এক্ষেত্রে ক্যান্ডিডেট ড্রপডাউন থেকে ব্যবহারকারীকে সঠিক বিকল্পটি বেছে নিতে হবে।
            </p>
          </div>

          {/* Limit 2: User corrections */}
          <div className="p-4 rounded-xl bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B] space-y-2">
            <strong className="text-[#14201B] dark:text-[#EDF5F1] block font-heading text-sm font-bold">
              ২. কাস্টম কারেকশন ক্যাশিং
            </strong>
            <p>
              প্রয়োজনে <code className="font-mono text-[#006A4E] dark:text-[#00A377]">setCachedWord(raw, bn)</code> ব্যবহার করে আপনি আপনার অ্যাপ্লিকেশনে ব্যবহারকারীর প্রিয় বানানগুলো ব্রাউজারে ক্যাশ বা প্রিলোড করতে পারেন।
            </p>
          </div>

          {/* Limit 3: Mobile Keyboard */}
          <div className="p-4 rounded-xl bg-[#F4F7F5] dark:bg-[#0C1512] border border-[#D9E2DD] dark:border-[#20312B] space-y-2">
            <strong className="text-[#14201B] dark:text-[#EDF5F1] block font-heading text-sm font-bold">
              ৩. মোবাইল সফট কীবোর্ড
            </strong>
            <p>
              মোবাইল ব্রাউজারে ভার্চুয়াল কীবোর্ডের অটোকমপ্লিট ইভেন্ট ডেস্কটপের চেয়ে ভিন্ন হতে পারে। মোবাইলে সবসময় বাস্তব ডিভাইসে ইনপুট টেস্ট করে নেওয়া বাঞ্ছনীয়।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


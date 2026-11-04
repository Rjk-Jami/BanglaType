import Link from 'next/link';
import { Boxes, Sparkles } from 'lucide-react';

export function DocCtaBanner() {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#0C1512] border border-[#20312B] text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="space-y-2 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Boxes className="w-5 h-5 text-[#00A377]" />
          <h3 className="font-heading font-bold text-xl text-white">
            এখনই আপনার প্রজেক্টে যুক্ত করতে প্রস্তুত?
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 font-body max-w-xl">
          কোনো জটিল কনফিগারেশন ছাড়াই npm থেকে ইনস্টল করে সরাসরি ব্যবহার শুরু করুন। সম্পূর্ণ টাইপস্ক্রিপ্ট সাপোর্ট ও আধুনিক UI কম্পোনেন্ট অন্তর্ভুক্ত।
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00553E] text-white text-xs sm:text-sm font-body font-semibold transition-colors shadow-xs flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>স্টুডিওতে পরীক্ষা করুন</span>
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DocsHero() {
  return (
    <header className="space-y-4 pt-2">
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-body font-medium text-zinc-600 dark:text-zinc-400 bg-white dark:bg-[#121E19] hover:text-[#006A4E] dark:hover:text-[#00A377] border border-[#D9E2DD] dark:border-[#20312B] transition-colors shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>স্টুডিওতে ফিরুন</span>
        </Link>

        <Badge variant="emerald" size="sm" className="font-mono text-[11px] bg-[#EBF3EF] dark:bg-[#142821] text-[#006A4E] dark:text-[#00A377] border-0">
          v0.1.0 Production
        </Badge>
      </div>

      <div className="space-y-2">
        <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-normal text-[#14201B] dark:text-[#EDF5F1]">
          লাইব্রেরি ইন্টিগ্রেশন নির্দেশিকা
        </h1>
        <p className="font-body text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          যেকোনো React, Next.js, Vite, Remix বা Node.js প্রজেক্টে{' '}
          <code className="font-mono text-[#006A4E] dark:text-[#00A377] bg-[#EBF3EF] dark:bg-[#142821] px-1.5 py-0.5 rounded">
            banglatype
          </code>{' '}
          যুক্ত করার সম্পূর্ণ হ্যান্ডস-অন ভিজ্যুয়াল গাইড ও লাইভ ডেমো — জিরো ডিপেনডেন্সি ও টাইপসেফ সহ।
        </p>
      </div>
    </header>
  );
}

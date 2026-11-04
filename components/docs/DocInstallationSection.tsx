import { DocQuickInstall } from './DocQuickInstall';

export function DocInstallationSection() {
  return (
    <section id="installation" className="space-y-4 scroll-mt-24">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
          ২
        </div>
        <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          ইনস্টলেশন ও ডিপেনডেন্সি (Installation)
        </h2>
      </div>

      <DocQuickInstall />
    </section>
  );
}


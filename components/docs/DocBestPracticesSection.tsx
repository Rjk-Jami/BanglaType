import { TypographyAndBestPractices } from './TypographyAndBestPractices';

export function DocBestPracticesSection() {
  return (
    <section id="best-practices" className="space-y-6 scroll-mt-24">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
          ৪
        </div>
        <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          প্রোডাকশন চেকলিস্ট ও বাংলা টাইপোগ্রাফি
        </h2>
      </div>

      <TypographyAndBestPractices />
    </section>
  );
}


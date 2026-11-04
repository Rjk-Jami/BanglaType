import { ApiReferenceTable } from './ApiReferenceTable';

export function DocApiReferenceSection() {
  return (
    <section id="api-reference" className="space-y-6 scroll-mt-24">
      <div className="flex items-center gap-2 pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
          ৫
        </div>
        <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          পাবলিক API স্পেসিফিকেশন (Public API Reference)
        </h2>
      </div>

      <ApiReferenceTable />
    </section>
  );
}


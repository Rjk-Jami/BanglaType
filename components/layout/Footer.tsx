'use client';

export function Footer() {
  return (
    <footer className="w-full mt-auto py-6 border-t border-[#D9E2DD] dark:border-[#20312B] bg-white/60 dark:bg-[#121E19]/60 backdrop-blur-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
          <span>&copy; 2026</span>
          <span className="font-semibold text-[#14201B] dark:text-[#EDF5F1]">BanglaType (বাংলা টাইপ)</span>
          <span>•</span>
          <span>Zero-dependency Bengali typing library</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Made for the open-source community by</span>
          <span className="font-semibold text-[#14201B] dark:text-[#EDF5F1]">KhanDevs</span>
        </div>
      </div>
    </footer>
  );
}

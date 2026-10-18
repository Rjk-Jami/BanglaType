'use client';

import { TypewriterHeading } from './TypewriterHeading';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative pt-8 pb-6 sm:pt-14 sm:pb-8 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
      {/* Decorative ambient background blur glows */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/15 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-8 left-1/3 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Typewriter Heading */}
      <TypewriterHeading />

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-3 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed"
      >
        Type in English, use the Jatiyo keyboard, or write Bangla with Avro phonetic.
      </motion.p>
    </section>
  );
}

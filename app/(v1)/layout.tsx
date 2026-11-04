import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'BanglaType — Write Bangla, your way',
  description:
    'A drop-in Bengali typing engine for React and Next.js developers, with ready components, headless hooks, and server-safe pure functions.',
};

export default function V1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7F5] dark:bg-[#0C1512] text-[#14201B] dark:text-[#EDF5F1] transition-colors">
      {/* Primary Common Navbar */}
      <Navbar />

      {/* Main Page Area */}
      <div className="flex-1 flex flex-col w-full">
        {children}
      </div>

      {/* Common Footer */}
      <Footer />
    </div>
  );
}

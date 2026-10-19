import type { Metadata } from 'next';
import { Anek_Bangla, Hind_Siliguri, Geist_Mono } from 'next/font/google';
import './globals.css';

const anek = Anek_Bangla({
  subsets: ['bengali', 'latin'],
  variable: '--font-anek',
  display: 'swap',
});

const hind = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BanglaType — Write Bangla, your way',
  description:
    'Type in English, use the Jatiyo keyboard, or write Bangla with Avro phonetic in an elegant, glassmorphic workspace.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${anek.variable} ${hind.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="font-body min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors antialiased">
        {children}
      </body>
    </html>
  );
}


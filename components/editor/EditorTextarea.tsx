'use client';

import { RefObject } from 'react';
import { KeyboardMode } from '@/lib/keyboard/types';

interface EditorTextareaProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  text: string;
  mode: KeyboardMode;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
  onBlur: () => void;
  onPaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void;
}

export function EditorTextarea({
  textareaRef,
  text,
  mode,
  onKeyDown,
  onChange,
  onClick,
  onBlur,
  onPaste,
}: EditorTextareaProps) {
  const getPlaceholder = () => {
    switch (mode) {
      case 'avro':
        return 'এখানে ইংরেজিতে টাইপ করুন, স্বয়ংক্রিয়ভাবে বাংলায় রূপান্তরিত হবে (যেমন: ami banglay likhi → আমি বাংলায় লিখি)...';
      case 'jatiyo':
        return 'জাতীয় কীবোর্ড মোড সক্রিয়। ফিজিক্যাল কীবোর্ডের বাটন চেপে সরাসরি বাংলায় টাইপ করুন...';
      case 'english':
        return 'Type in English here...';
    }
  };

  return (
    <div className="relative w-full flex-1 min-h-[340px] sm:min-h-[420px] p-4 sm:p-6 flex flex-col">
      <textarea
        ref={textareaRef}
        value={text}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        onPaste={onPaste}
        placeholder={getPlaceholder()}
        spellCheck={false}
        className="w-full flex-1 bg-transparent resize-y text-lg sm:text-xl md:text-2xl text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none leading-relaxed tracking-normal font-sans selection:bg-emerald-500/30 dark:selection:bg-emerald-400/30"
        style={{
          fontFamily:
            'var(--font-hind-siliguri), "Noto Sans Bengali", "SolaimanLipi", "Kalpurush", sans-serif',
        }}
      />
    </div>
  );
}

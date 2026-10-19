'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConvertButtonProps {
  onConvert: () => Promise<void>;
  disabled?: boolean;
}

export function ConvertButton({ onConvert, disabled }: ConvertButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || loading) return;
    setLoading(true);
    try {
      await onConvert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="emerald-soft"
      size="sm"
      onClick={handleClick}
      disabled={disabled}
      loading={loading}
      leftIcon={<Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
      title="ইংরেজি লেখাকে অভ্র ফোনেটিকে বাংলায় রূপান্তর করুন"
    >
      <span>বাংলায় রূপান্তর</span>
    </Button>
  );
}

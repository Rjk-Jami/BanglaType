'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { GlassModal } from '@/components/ui/GlassModal';
import { Button } from '@/components/ui/button';

interface ClearButtonProps {
  onClear: () => void;
  disabled?: boolean;
  hasSubstantialText: boolean;
}

export function ClearButton({
  onClear,
  disabled,
  hasSubstantialText,
}: ClearButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    if (hasSubstantialText) {
      setShowConfirm(true);
    } else {
      onClear();
    }
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onClear();
  };

  return (
    <>
      <Button
        variant="destructive-outline"
        size="sm"
        onClick={handleClick}
        disabled={disabled}
        title="সব লেখা মুছুন"
        leftIcon={<Trash2 className="w-4 h-4" />}
      >
        <span>মুছুন</span>
      </Button>

      <GlassModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="লেখা মুছে ফেলতে চান?"
        maxWidth="max-w-md"
      >
        <div className="flex flex-col gap-4 text-center">
          <p className="text-sm font-body text-zinc-600 dark:text-zinc-300 leading-relaxed">
            আপনার লেখাগুলো মুছে যাবে। আপনি কি নিশ্চিত যে পুরো লেখাটি মুছে ফেলতে চান?
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="default"
              onClick={() => setShowConfirm(false)}
            >
              বাতিল
            </Button>
            <Button
              variant="destructive"
              size="default"
              onClick={handleConfirm}
            >
              হ্যাঁ, মুছে ফেলুন
            </Button>
          </div>
        </div>
      </GlassModal>
    </>
  );
}

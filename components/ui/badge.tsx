import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-body font-medium transition-colors select-none',
  {
    variants: {
      variant: {
        default:
          'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border border-transparent',
        emerald:
          'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80',
        blue:
          'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80',
        secondary:
          'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80',
        outline:
          'border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xs',
        destructive:
          'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/80',
      },
      size: {
        default: 'px-2.5 py-0.5 rounded-full text-xs',
        sm: 'px-2 py-0.2 rounded-full text-[11px]',
        lg: 'px-3 py-1 rounded-full text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'group/button relative inline-flex shrink-0 items-center justify-center font-body font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // High-contrast primary (dark in light mode, light in dark mode)
        default:
          'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-sm',
        // Brand Emerald primary
        emerald:
          'bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-sm border border-emerald-500/20',
        primary:
          'bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 shadow-sm border border-emerald-500/20',
        // Soft emerald accent / secondary action
        'emerald-soft':
          'border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/80 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 shadow-xs',
        // Neutral secondary
        secondary:
          'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs',
        // Clean neutral outline
        outline:
          'border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:bg-zinc-100/90 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-200 shadow-xs backdrop-blur-xs',
        // Transparent ghost
        ghost:
          'hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 text-zinc-600 dark:text-zinc-400',
        // Destructive / danger
        destructive:
          'bg-rose-600 hover:bg-rose-700 text-white shadow-xs border border-rose-500/20',
        // Destructive outline
        'destructive-outline':
          'border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-300 dark:hover:border-rose-800 text-zinc-600 hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400 shadow-xs',
        // Text link
        link:
          'text-emerald-600 dark:text-emerald-400 underline-offset-4 hover:underline p-0 h-auto font-normal active:scale-100',
      },
      size: {
        default: 'h-9 px-3.5 py-1.5 text-xs sm:text-sm rounded-lg gap-1.5',
        xs: 'h-6 px-2 text-[11px] rounded-md gap-1 [&_svg:not([class*=\'size-\'])]:size-3',
        sm: 'h-8 px-2.5 text-xs sm:text-sm rounded-lg gap-1.5 [&_svg:not([class*=\'size-\'])]:size-3.5',
        lg: 'h-11 px-5 text-sm sm:text-base rounded-xl gap-2 [&_svg:not([class*=\'size-\'])]:size-4.5',
        icon: 'size-9 p-0 rounded-lg [&_svg:not([class*=\'size-\'])]:size-4',
        'icon-xs': 'size-6 p-0 rounded-md [&_svg:not([class*=\'size-\'])]:size-3',
        'icon-sm': 'size-7 p-0 rounded-lg [&_svg:not([class*=\'size-\'])]:size-3.5',
        'icon-lg': 'size-11 p-0 rounded-xl [&_svg:not([class*=\'size-\'])]:size-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const computedClassName = cn(buttonVariants({ variant, size, className }));

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{
        className?: string;
        children?: React.ReactNode;
        [key: string]: unknown;
      }>;
      return React.cloneElement(child, {
        ...props,
        ref,
        className: cn(computedClassName, child.props.className),
        'aria-busy': loading || undefined,
        'aria-disabled': isDisabled || undefined,
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        data-slot="button"
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={computedClassName}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin shrink-0 size-3.5" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

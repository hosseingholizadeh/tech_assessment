'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/components/ui/utils'
import { applyTheme, readTheme, subscribeToTheme, type Theme } from '@/lib/theme/theme'

type ThemeToggleProps = {
  className?: string
}

function getServerTheme(): Theme {
  return 'dark'
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, getServerTheme)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-ink/[0.04] text-gray-200 transition-colors hover:border-ink/20 hover:bg-ink/[0.08] hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ink/40',
        className,
      )}
      onClick={() => applyTheme(nextTheme)}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}

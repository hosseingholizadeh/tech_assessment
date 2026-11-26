export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

export const themeInitScript = `(function(){try{var stored=localStorage.getItem('${THEME_STORAGE_KEY}');var isDark=stored?stored==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var root=document.documentElement;root.classList.toggle('dark',isDark);root.style.colorScheme=isDark?'dark':'light'}catch(e){}})()`

export function readTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    return
  }
}

export function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  return () => observer.disconnect()
}

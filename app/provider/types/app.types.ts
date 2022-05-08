export type AppContextI = useStylesI

export interface useStylesI {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

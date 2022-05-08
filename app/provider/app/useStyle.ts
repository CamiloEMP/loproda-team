import { useEffect, useState } from "react"
import { isBrowser } from "~/util/isBrowser"
import { useStylesI } from "../types/app.types"

export function useStyle(): useStylesI {
  const [theme, setStateTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (isBrowser()) {
      const lst = localStorage.getItem('theme')
      if (lst === 'light' || lst === 'dark') {
        setTheme(lst)
      }
    }
  })

  function setTheme(theme: 'light' | 'dark') {
    setStateTheme(theme)
    if (isBrowser()) {
      document
      localStorage.setItem('theme', theme)
      if (theme === 'light') {
        document.querySelector('html')?.classList.remove('dark')
      } else {
        document.querySelector('html')?.classList.add('dark')
      }
    }
  }

  return {
    theme,
    setTheme
  }
}


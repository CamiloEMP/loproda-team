import { createContext, PropsWithChildren, useContext } from "react";
import { AppContextI } from "../types/app.types";
import { useStyle } from "./useStyle";

export const AppContext = createContext<AppContextI>(null!)
AppContext.displayName = 'AppContext'

export const useAppContext = () => useContext(AppContext)

export function AppProvider({ children }: PropsWithChildren<unknown>): JSX.Element {
  const style = useStyle()
  return <AppContext.Provider value={{ ...style }}>{children}</AppContext.Provider>
}

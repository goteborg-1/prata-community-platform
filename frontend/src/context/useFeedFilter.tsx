import { createContext, useContext } from "react"
import type { FeedFilterContextValue } from "./FeedFilterContext"

export const FeedFilterContext = createContext<FeedFilterContextValue | undefined>(undefined)

export function useFeedFilter() {
  const context = useContext(FeedFilterContext)
  if (!context) {
    throw new Error("useFeedFilter must be used within FeedFilterProvider")
  }
  return context
}
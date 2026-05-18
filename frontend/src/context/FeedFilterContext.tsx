import { useEffect, useReducer, useState } from "react"
import type { GetPostsQuery, Category, TriggerTag, Sort } from "@shared"
import { FeedFilterContext } from "./useFeedFilter"

export type FeedFilters = Omit<GetPostsQuery, "categories" | "triggerTags" | "search"> & {
  categories: Category[],
  triggerTags: TriggerTag[],
  search: string,
}

const initialState: FeedFilters = {
  search: "",
  sort: "newest",
  categories: [],
  triggerTags: [],
  page: 1,
  limit: 5,
}

type FilterAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: Sort }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "TOGGLE_CATEGORY"; payload: Category }
  | { type: "TOGGLE_TRIGGER"; payload: TriggerTag }
  | { type: "CLEAR" }

function filterReducer(state: FeedFilters, action: FilterAction): FeedFilters {
  switch (action.type) {
    case "SET_SEARCH": return { ...state, search: action.payload, page: 1 }
    case "SET_SORT": return { ...state, sort: action.payload, page: 1 }
    case "SET_PAGE": return { ...state, page: action.payload }
    case "SET_LIMIT": return { ...state, limit: action.payload, page: 1 }
    case "TOGGLE_CATEGORY":
      return {
        ...state, page: 1,
        categories: state.categories.includes(action.payload)
          ? state.categories.filter(c => c !== action.payload)
          : [...state.categories, action.payload]
      }
    case "TOGGLE_TRIGGER":
      return {
        ...state, page: 1,
        triggerTags: state.triggerTags.includes(action.payload)
          ? state.triggerTags.filter(t => t !== action.payload)
          : [...state.triggerTags, action.payload]
      }
    case "CLEAR": return initialState
    default: return state
  }
}

export type FeedFilterContextValue = {
  filters: FeedFilters;
  activeCount: number;
  queryParams: GetPostsQuery;
  setSearch: (search: string) => void;
  setSort: (sort: Sort) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  toggleCategory: (cat: Category) => void;
  toggleTriggerTag: (tag: TriggerTag) => void;
  clearAll: () => void;
}

export function FeedFilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, dispatch] = useReducer(filterReducer, initialState)
  const [debouncedSearch, setDebouncedSearch] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 350)
    return () => clearTimeout(timer)
  }, [filters.search])

  const activeCount = filters.categories.length + filters.triggerTags.length

  const queryParams: GetPostsQuery = {
    sort: filters.sort,
    page: filters.page,
    limit: filters.limit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(filters.categories.length > 0 && { categories: filters.categories }),
    ...(filters.triggerTags.length > 0 && { triggerTags: filters.triggerTags }),
  }

  const value = {
    filters,
    activeCount,
    queryParams,
    setSearch: (search: string) => dispatch({ type: "SET_SEARCH", payload: search }),
    setSort: (sort: Sort) => dispatch({ type: "SET_SORT", payload: sort }),
    setPage: (page: number) => dispatch({ type: "SET_PAGE", payload: page }),
    setLimit: (limit: number) => dispatch({ type: "SET_LIMIT", payload: limit }),
    toggleCategory: (cat: Category) => dispatch({ type: "TOGGLE_CATEGORY", payload: cat }),
    toggleTriggerTag: (tag: TriggerTag) => dispatch({ type: "TOGGLE_TRIGGER", payload: tag }),
    clearAll: () => dispatch({ type: "CLEAR" }),
  }

  return (
    <FeedFilterContext.Provider value={value}>
      {children}
    </FeedFilterContext.Provider>
  )
}
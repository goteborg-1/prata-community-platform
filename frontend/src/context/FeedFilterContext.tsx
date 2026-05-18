import { useEffect, useState } from "react"
import type { GetPostsQuery, Category, TriggerTag, Sort } from "@shared"
import { FeedFilterContext } from "./useFeedFilter"
import { useSearchParams } from "react-router"

export type FeedFilters = Omit<GetPostsQuery, "categories" | "triggerTags" | "search"> & {
  categories: Category[],
  triggerTags: TriggerTag[],
  search: string,
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
  const [searchParams, setSearchParams] = useSearchParams()
  const [debouncedSearch, setDebouncedSearch] = useState("")

  const filters: FeedFilters = {
    search: searchParams.get("search") ?? "",
    sort: (searchParams.get("sort") as Sort) ?? "newest",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 5,
    categories: searchParams.getAll("categories") as Category[],
    triggerTags: searchParams.getAll("triggerTags") as TriggerTag[],
  }

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 350)
    return () => clearTimeout(timer)
  }, [filters.search])

  const setParam = (updates: Partial<FeedFilters>) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)

      Object.entries(updates).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          next.delete(key)
          value.forEach(v => next.append(key, v))
        } else if (value === "" || value === null || value === undefined) {
          next.delete(key)
        } else {
          next.set(key, String(value))
        }
      })

      return next
    })
  }

  const toggleArray = <T extends string>(key: "categories" | "triggerTags", value: T, current: T[]) => {
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    setParam({ [key]: next, page: 1 })
  }

  const activeCount = filters.categories.length + filters.triggerTags.length

  const queryParams: GetPostsQuery = {
    sort: filters.sort,
    page: filters.page,
    limit: filters.limit,
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(filters.categories.length > 0 && { categories: filters.categories }),
    ...(filters.triggerTags.length > 0 && { triggerTags: filters.triggerTags }),
  }

  const value: FeedFilterContextValue = {
    filters,
    activeCount,
    queryParams,
    setSearch: (search) => setParam({ search, page: 1 }),
    setSort: (sort) => setParam({ sort, page: 1 }),
    setPage: (page) => setParam({ page }),
    setLimit: (limit) => setParam({ limit, page: 1 }),
    toggleCategory: (cat) => toggleArray("categories", cat, filters.categories),
    toggleTriggerTag: (tag) => toggleArray("triggerTags", tag, filters.triggerTags),
    clearAll: () => setSearchParams(new URLSearchParams()),
  }

  return (
    <FeedFilterContext.Provider value={value}>
      {children}
    </FeedFilterContext.Provider>
  )
}
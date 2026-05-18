import { useState } from "react"
import { IoOptions } from "react-icons/io5"
import FilterDrawer from "./FilterDrawer"
import Input from "../Input/Input"
import Button from "../Button/Button"
import s from "./FeedFilter.module.css"
import { useFeedFilter } from "../../context/useFeedFilter"

export default function FeedFilter() {
  const { filters, activeCount, setSearch } = useFeedFilter()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <div className={s.row}>
        <Input 
          variant="neutral"
          placeholder="Sök inlägg..."
          value={filters.search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="neutral"
          size="small"
          onClick={() => setDrawerOpen(true)}
        >
          <span className={s.filterBtn}>
            <IoOptions size={16} />
            Filter
            {activeCount > 0 && <span className={s.filterCount}>{activeCount}</span>}
          </span>
        </Button>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
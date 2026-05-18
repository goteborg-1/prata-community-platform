import { useState, useEffect } from "react"
import { IoClose, IoChevronBack } from "react-icons/io5"
import { CATEGORY_OPTIONS, CATEGORY_LABELS, TRIGGER_OPTIONS, TRIGGER_LABELS } from "@shared"
import FilterOptionList from "./FilterOptionList"
import Button from "../Button/Button"
import s from "./FilterDrawer.module.css"
import { useFeedFilter } from "../../context/useFeedFilter"

type SubPage = "categories" | "triggers" | "sort" | null

interface Props {
  open: boolean
  onClose: () => void
}

const SORT_OPTIONS = [
  { value: "newest", label: "Nyast" },
  { value: "popular", label: "Populärt" },
] as const

export default function FilterDrawer({open, onClose}: Props) {
  const { filters, setSort, clearAll } = useFeedFilter()
  const [subPage, setSubPage] = useState<SubPage>(null)

  useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
  
      return () => {
        document.body.style.overflow = "unset"
      }
    }, [open])

  const goBack = () => setSubPage(null)

  const handleClose = () => {
    onClose()
    setTimeout(() => setSubPage(null), 300)
  }

  const categoryCount = filters.categories.length
  const triggerCount = filters.triggerTags.length

  const categoryOptions = CATEGORY_OPTIONS.map(c => ({ value: c, label: CATEGORY_LABELS[c] }))
  const triggerOptions = TRIGGER_OPTIONS.map(t => ({ value: t, label: TRIGGER_LABELS[t] }))
  
  return (
    <>
      <div className={`${s.overlay} ${open ? s.overlayVisible : ""}`} onClick={handleClose} />

      <div className={`${s.drawer} ${open ? s.drawerOpen : ""}`}>

        <div className={s.viewport}>
          {/* Main page */}
          <div className={`${s.page}`}>
            <header className={s.header}>
              <p className={s.title}>Filter</p>
              <Button variant="transparent" size="x-small" onClick={handleClose}>
                <IoClose size={20} />
              </Button>
            </header>

            <div className={s.menuList}>
              <button className={s.menuRow} onClick={() => setSubPage("sort")}>
                <span className={s.menuLabel}>Sortera</span>
                <span className={s.menuRight}>
                  <span className={s.menuValue}>{filters.sort === "newest" ? "Nyast" : "Populärt"}</span>
                  <span className={s.chevron}>›</span>
                </span>
              </button>

              <button className={s.menuRow} onClick={() => setSubPage("categories")}>
                <span className={s.menuLabel}>Kategorier</span>
                <span className={s.menuRight}>
                  {categoryCount > 0 && <span className={s.count}>{categoryCount}</span>}
                  <span className={s.chevron}>›</span>
                </span>
              </button>

              <button className={s.menuRow} onClick={() => setSubPage("triggers")}>
                <span className={s.menuLabel}>Triggervarningar</span>
                <span className={s.menuRight}>
                  {triggerCount > 0 && <span className={s.count}>{triggerCount}</span>}
                  <span className={s.chevron}>›</span>
                </span>
              </button>
            </div>

            <footer className={s.footer}>
              <Button variant="secondary" size="small" onClick={clearAll}>Rensa alla</Button>
              <Button size="small" onClick={handleClose}>Visa inlägg</Button>
            </footer>
          </div>

          {/* Sub-pages */}
          <div className={`${s.page} ${s.subPage} ${subPage !== null ? s.subPageVisible : ""}`}>
            <header className={s.header}>
              <Button variant="transparent" size="x-small" onClick={goBack}>
                <IoChevronBack size={20} />
              </Button>
              <p className={s.title}>
                {subPage === "sort" && "Sortera"}
                {subPage === "categories" && "Kategorier"}
                {subPage === "triggers" && "Triggervarningar"}
              </p>
              <Button variant="transparent" size="x-small" onClick={handleClose}>
                <IoClose size={20} />
              </Button>
            </header>

            <div className={s.subPageContent}>
              {subPage === "sort" && (
                <ul className={s.sortList}>
                  {SORT_OPTIONS.map((opt) => (
                    <li
                      key={opt.value}
                      className={`${s.sortRow} ${filters.sort === opt.value ? s.sortOn : ""}`}
                      onClick={() => setSort(opt.value)}
                    >
                      <span>{opt.label}</span>
                      {filters.sort === opt.value && <span className={s.check}>✓</span>}
                    </li>
                  ))}
                </ul>
              )}

              {subPage === "categories" && (
                <FilterOptionList options={categoryOptions} type="categories" />
              )}

              {subPage === "triggers" && (
                <FilterOptionList options={triggerOptions} type="triggerTags" variant="warn" />
              )}
            </div>

            <footer className={s.footer}>
              <Button variant="secondary" size="small" onClick={clearAll}>Rensa alla</Button>
              <Button size="small" onClick={handleClose}>Visa inlägg</Button>
            </footer>
          </div>
        </div>
      </div>
    </>
  )
}
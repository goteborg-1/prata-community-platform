import { useFeedFilter } from "../../context/useFeedFilter"
import s from "./Pagination.module.css"

interface Props {
  totalPages: number
}

const LIMIT_OPTIONS = [5, 10, 25]

function getPageNumbers(current: number, total: number): (number | "...")[] {
  const set = new Set(
    [1, total, current - 1, current, current + 1]
      .filter(p => p >= 1 && p <= total)
  )
  const sorted = Array.from(set).sort((a, b) => a - b)

  const result: (number | "...")[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("...")
    result.push(sorted[i])
  }
  return result
}

export default function Pagination({ totalPages }: Props) {
  const { filters, setPage, setLimit } = useFeedFilter()

  if (totalPages <= 1) return null

  return (
    <div className={s.row}>
      <div className={s.limitSelect}>
        <span className={s.label}>Visa</span>
        <select
          value={filters.limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className={s.select}
        >
          {LIMIT_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className={s.label}>per sida</span>
      </div>

      <div className={s.divider} />

      <div className={s.pages}>
        {getPageNumbers(filters.page, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className={s.ellipsis}>...</span>
          ) : (
            <button
              key={p}
              className={`${s.pageBtn} ${p === filters.page ? s.active : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          )
        )}
      </div>
    </div>
  )
}
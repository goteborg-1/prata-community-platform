import { getPageNumbers } from "../../utils/getPageNumbers"
import s from "./Pagination.module.css"

interface Props {
  page: number
  totalPages: number
  limit: number
  limitOptions?: number[]
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

export default function PaginationBase({
  page, totalPages, limit,
  limitOptions = [10, 25, 50],
  onPageChange, onLimitChange
}: Props) {
  if (totalPages <= 1) return null

  return (
    <div className={s.row}>
      <div className={s.limitSelect}>
        <span className={s.label}>Visa</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className={s.select}
        >
          {limitOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className={s.label}>per sida</span>
      </div>

      <div className={s.divider} />

      <div className={s.pages}>
        {getPageNumbers(page, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className={s.ellipsis}>...</span>
          ) : (
            <button
              key={p}
              className={`${s.pageBtn} ${p === page ? s.active : ""}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}
      </div>
    </div>
  )
}
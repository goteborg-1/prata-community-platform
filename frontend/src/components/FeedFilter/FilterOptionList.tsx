import type { Category, TriggerTag } from "@prata/shared"
import { useFeedFilter } from "../../context/useFeedFilter"
import s from "./FilterOptionList.module.css"

interface Option {
  value: string
  label: string
}

interface Props {
  options: Option[],
  type: "categories" | "triggerTags",
  variant?: "default" | "warn"
}

export default function FilterOptionList({ options, type, variant = "default" }: Props) {
  const { filters, toggleCategory, toggleTriggerTag } = useFeedFilter()

  const selected = (type === "categories" ? filters.categories : filters.triggerTags) as string[]

  const handleToggle = (value: string) => {
    if(type === "categories") {
      toggleCategory(value as Category) 
    } else {
      toggleTriggerTag(value as TriggerTag)
    }
  }

  return (
    <ul className={s.list}>
      {options.map((option) => (
        <li
          key={option.value}
          className={`${s.row} ${selected.includes(option.value) ? s.on : ""} ${variant === "warn" ? s.warn : ""}`}
          onClick={() => handleToggle(option.value)}
          >
          <span className={s.checkbox} />
          <span className={s.label}>{option.label}</span>
        </li>
      ))}
    </ul>
  )
}
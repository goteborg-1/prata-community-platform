import s from "./Input.module.css"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id?: string
  label?: string
  variant?: "transparent" | "neutral" | "form"
}

export default function Textarea({ id, label, variant = "transparent", ...props }: TextareaProps) {
  return (
    <div className={s.wrapper}>
      {label && <label htmlFor={id} className={s.label}>{label}</label>}
      <textarea
        id={id}
        className={`${s.input} ${s[variant]} ${s.textarea}`}
        {...props}
      />
    </div>
  )
}
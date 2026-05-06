import s from "./Input.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "transparent" | "neutral"
}

export default function Input({variant = "transparent", ...props}: InputProps) {
  return(
      <input
        className={`${s.input} ${s[variant]}`}
        {...props}
      />
  )
}
import { useState } from "react"
import { FiEyeOff, FiEye } from "react-icons/fi"
import s from "./Input.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string,
  label?: string,
  variant?: "transparent" | "neutral" | "form"
}

export default function Input({type, id, label, variant = "transparent", ...props}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  
  if(type === "password") {
    return(
      <div className={s.passWrapper}>
        <input type={isPasswordVisible ? "text" : "password"}
        className={`${s.input} ${s[variant]}`}
        {...props}
        />
        <button 
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className={s.toggleBtn}
        >
          {isPasswordVisible ? <FiEye /> : <FiEyeOff />}
        </button>
      </div>
    )
  }

  return(
    <div className={s.wrapper}>
      {label && <label htmlFor={id} className={s.label}>{label}</label>}
      <input
        id={id}
        className={`${s.input} ${s[variant]}`}
        {...props}
      />
    </div>
  )
}
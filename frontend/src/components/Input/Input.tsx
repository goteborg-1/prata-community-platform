import { useState } from "react"
import { FiEyeOff, FiEye } from "react-icons/fi"
import s from "./Input.module.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "transparent" | "neutral"
}

export default function Input({type, variant = "transparent", ...props}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  
  if(type === "password") {
    return(
      <div className={s.wrapper}>
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
      <input
        className={`${s.input} ${s[variant]}`}
        {...props}
      />
  )
}
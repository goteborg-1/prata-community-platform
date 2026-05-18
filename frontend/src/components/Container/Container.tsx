import s from "./Container.module.css";

interface ContainerProps {
  variant?: "medium" | "narrow" |"small"
  color?: "main" | "secondary"
  center?: boolean
  children: React.ReactNode
}

export default function Container({ variant = "medium", color = "main", center, children }: ContainerProps) {
  return (
    <div className={`${s.outerWrapper} ${s[color]}`}>
      <section className={`${s.container} ${s[variant]} ${center && s.center}`}>
        {children}
      </section>
    </div>
  );
}
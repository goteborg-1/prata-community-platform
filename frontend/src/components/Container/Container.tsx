import s from "./Container.module.css";

interface ContainerProps {
  variant?: "medium" | "small"
  color?: "main" | "secondary"
  center?: boolean
  children: React.ReactNode
}

export default function Container({ variant = "medium", color = "main", center, children }: ContainerProps) {
  return (
    <section className={`${s.container} ${s[variant]} ${s[color]} ${center && s.center}`}>
      {children}
    </section>
  );
}
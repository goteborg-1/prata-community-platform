import s from "./Container.module.css";

interface ContainerProps {
  variant?: "medium" | "small"
  color?: "main" | "secondary"
  children: React.ReactNode;
}

export default function Container({ variant = "medium", color = "main", children }: ContainerProps) {
  return (
    <section className={`${s.container} ${s[variant]} ${s[color]}`}>
      {children}
    </section>
  );
}
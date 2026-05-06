import s from "./Container.module.css";

interface ContainerProps {
  variant?: "medium" | "small"
  children: React.ReactNode;
}

export default function Container({ variant = "medium", children }: ContainerProps) {
  return (
    <section className={`${s.container} ${s[variant]}`}>
      {children}
    </section>
  );
}
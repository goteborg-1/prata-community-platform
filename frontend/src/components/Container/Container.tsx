import s from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children}: ContainerProps) {
  return (
    <section className={s.container}>
      {children}
    </section>
  );
}
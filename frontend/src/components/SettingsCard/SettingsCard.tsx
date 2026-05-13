import s from "./SettingsCard.module.css"

interface SettingsCardProps {
  title: string,
  children: React.ReactNode
}

export function SettingsCard({title, children}: SettingsCardProps) {
  return(
    <article className={s.card}>
      <h3 className={s.title}>{title}</h3>
      <div className={s.content}>
        {children}
      </div>
    </article>
  )
}

interface SettingsRowProps {
  label: string;
  description?: string;
  children?: React.ReactNode;
}

export function SettingsRow({ label, description, children }: SettingsRowProps) {
  return (
    <div className={s.row}>
      <div className={s.textInfo}>
        <span className={s.label}>{label}</span>
        {description && <span className={s.description}>{description}</span>}
      </div>
      <div className={s.action}>
        {children}
      </div>
    </div>
  );
}

export function SettingsDivider() {
  return <div className={s.divider} />;
}
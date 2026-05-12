import s from "./LoadingSpinner.module.css";

export default function LoadingSpinner({text}: {text: string}) {
  return (
    <div className={s.loaderContainer}>
      <div className={s.spinner} />
      <p className={s.loadingText}>{text}...</p>
    </div>
  )
}
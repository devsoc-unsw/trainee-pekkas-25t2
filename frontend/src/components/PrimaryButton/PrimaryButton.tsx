import type React from "react";
import styles from "./PrimaryButton.module.css"

type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  loading?: boolean
}

function PrimaryButton({ type, onClick, disabled, loading, children }: PrimaryButtonProps) {
  if (loading)
    return <div className={styles.loading}/>
  
  return (
    <button 
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled ?? false}
      className={styles.primaryButton}
    >
      {children}
    </button>
  )
}

export default PrimaryButton
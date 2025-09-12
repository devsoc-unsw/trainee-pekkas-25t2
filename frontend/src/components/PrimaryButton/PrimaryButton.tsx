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
  return (
    <button 
      type={type ?? "button"}
      onClick={onClick}
      disabled={disabled ?? false}
      className={`${styles.primaryButton} ${loading ? styles.loading : ''}`}
    >
      {!loading && children}
    </button>
  )
}

export default PrimaryButton
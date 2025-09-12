import React from 'react'
import styles from "./LoadingScreen.module.css"

function LoadingScreen() {
  return (
    <div className={styles.loadingOverlay}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default LoadingScreen
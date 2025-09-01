import React, { useEffect, useState } from 'react'
import styles from './ProgressBar.module.css'

type ProgressBarProps = {
  percentFilled: number;
  backgroundColor?: string;
}

function ProgressBar({ percentFilled, backgroundColor="#d04ea6" }: ProgressBarProps) {

  return (
    <div className={styles.bar}>
      <div 
        className={styles.progressHead}
        style={{
          backgroundColor: '#d1a0c2ff',
          width: `${percentFilled}%`
        }}
      />
      <div 
        className={styles.progress}
        style={{
          backgroundColor: backgroundColor,
          width: `${percentFilled}%`
        }}
      />
    </div>
  )
}

export default ProgressBar
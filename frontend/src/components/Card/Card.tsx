import React from 'react'
import styles from "./Card.module.css"

type CardProps = {
  children?: React.ReactNode
}

function Card({children}: CardProps) {
  return (
    <div className={styles.card}>
      {children}
    </div>
  )
}

export default Card
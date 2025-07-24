import React from 'react'
import styles from "./LoginPage.module.css"
import LoginCard from '../../components/LoginCard/LoginCard'

function LoginPage() {
  return (
    <div className={styles.container}>
      <LoginCard/>
    </div>
  )
}

export default LoginPage
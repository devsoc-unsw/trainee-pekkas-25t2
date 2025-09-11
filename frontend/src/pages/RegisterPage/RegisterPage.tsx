import React from 'react'
import RegisterCard from '../../components/RegisterCard/RegisterCard'
import Header from '../../components/Header/Header'
import styles from "./RegisterPage.module.css"

function RegisterPage() {
  return (
    <>
      <Header/>
      <div className={styles.container}>
        <RegisterCard/>
      </div>
    </>
  )
}

export default RegisterPage
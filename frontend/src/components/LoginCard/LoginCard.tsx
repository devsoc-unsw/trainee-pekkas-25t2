import React, { useState } from 'react'
import styles from './LoginCard.module.css'

function LoginCard() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmitHandler = () => {

  }

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>LOG IN</h1>
      <form onSubmit={onSubmitHandler} className={styles.form}>
        <label htmlFor="username" className={styles.inputContainer}>
          Username:
          <input 
            type="text"
            className={styles.formInput}
            id="username"
            name="username"
            placeholder='Enter username here'
          />
        </label>
        <label htmlFor="password" className={styles.inputContainer}>
          Password:
          <input
            type="password"
            className={styles.formInput}
            id="password"
            name="password"
            placeholder='Enter password here'
          />
        </label>
        <div className={styles.buttonContainer}>
          <button className={styles.loginButton}>Log In</button>
        </div>
      </form>
      <p className={styles.bottomText}>Don't have an account? <a href="">Register Here</a></p>
    </div>
  )
}

export default LoginCard;
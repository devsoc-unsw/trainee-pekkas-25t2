import React, { useState } from 'react'
import styles from './LoginCard.module.css'

function LoginCard() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // temp stuff... make req to backend auth here
    console.log("Logging in...")
    console.log(`username is: ${username}`)
    console.log(`password is: ${password}`)
  }

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>LOG IN</h1>
      <form onSubmit={(e) => onSubmitHandler(e)} className={styles.form}>
        <label htmlFor="username" className={styles.inputContainer}>
          Username:
          <input 
            type="text"
            className={styles.formInput}
            id="username"
            name="username"
            placeholder='Enter username here'
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.loginButton}>Log In</button>
        </div>
      </form>
      <p className={styles.bottomText}>Don't have an account? <a href="">Register Here</a></p>
    </div>
  )
}

export default LoginCard;
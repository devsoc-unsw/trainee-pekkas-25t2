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
        <input 
          type="text"
          className={styles.formInput}
          id="username"
          name="username"
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className={styles.formInput}
          id="password"
          name="password"
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.loginButton}>Log In</button>
        </div>
      </form>
      <p className={styles.bottomText}>Don't have an account? <a href="#">Register Here</a></p>
    </div>
  )
}

export default LoginCard;
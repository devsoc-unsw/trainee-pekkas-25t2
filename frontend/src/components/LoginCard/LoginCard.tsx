import React, { useState } from 'react'
import styles from './LoginCard.module.css'
import FormInput from '../FormInput/FormInput';
import Card from '../Card/Card';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router';

function LoginCard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // temp stuff... make req to backend auth here
    console.log("Logging in...")
    console.log(`username is: ${username}`)
    console.log(`password is: ${password}`)
  }

    const onClickHandler = (e: React.MouseEvent) => {
      e.preventDefault()
      navigate("/register")
    }

  return (
    <Card>
      <h1 className={styles.title}>LOG IN</h1>
      <form onSubmit={(e) => onSubmitHandler(e)} className={styles.form}>
        <FormInput 
          type="text" 
          onChange={(e) => setUsername(e.target.value)}
          placeHolder="Username"
        />
        <FormInput 
          type="password" 
          onChange={(e) => setPassword(e.target.value)}
          placeHolder="Password"
        />
        <div className="center-row">
          <PrimaryButton>Log In</PrimaryButton>
        </div>
      </form>
      <div className="center-row">
        <p>Don't have an account? <a href="" onClick={(e) => onClickHandler(e)}>Register Here</a></p>
      </div>
    </Card>
  )
}

export default LoginCard;
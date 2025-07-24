import React, { useState } from 'react'
import styles from './LoginCard.module.css'
import FormInput from '../FormInput/FormInput';
import Card from '../Card/Card';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router';

function LoginCard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // temp stuff... make req to backend auth here
    console.log("Logging in...")
    console.log(`username is: ${username}`)
    console.log(`password is: ${password}`)

    // error handling
    if (!username) {
      setIsError(true)
      console.log("error username")
      setErrorMessage("Username cannot be empty")
    } else if (!password) {
      setIsError(true)
      setErrorMessage("Password cannot be empty")
    }
  }

    const onClickHandler = (e: React.MouseEvent) => {
      e.preventDefault()
      navigate("/register")
    }

  return (
    <Card>
      <h1 className={styles.title}>LOG IN</h1>
      <form 
        onSubmit={(e) => onSubmitHandler(e)}
        className={styles.form}
        onChange={() => setIsError(false)}
      >
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
        {isError && (<div className={`${styles.errorMessage} center-row`}>{errorMessage}</div>)}
        <div className="center-row">
          <PrimaryButton type="submit">Log In</PrimaryButton>
        </div>
      </form>
      <div className="center-row">
        <p>Don't have an account? <a href="" onClick={(e) => onClickHandler(e)}>Register Here</a></p>
      </div>
    </Card>
  )
}

export default LoginCard;
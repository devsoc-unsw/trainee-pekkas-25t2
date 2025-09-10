import React, { useState } from 'react'
import styles from './LoginCard.module.css'
import FormInput from '../FormInput/FormInput';
import Card from '../Card/Card';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../utils/constants';

function LoginCard() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // error handling
    if (!username) {
      setIsError(true)
      setErrorMessage("Username cannot be empty")
      return
    } else if (!password) {
      setIsError(true)
      setErrorMessage("Password cannot be empty")
      return
    }

    setIsLoading(true)
    try {
      await axios.post(`${API_URL}/user/login`, { username, password }, {withCredentials: true});
      navigate("/todo")
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage("Error: " + error.response.data.error)
      } else {
        setErrorMessage("Unexpected error:" + (error as Error)?.message);
      }
    }
    setIsLoading(false)
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
        <div className="center-row">
          <PrimaryButton loading={isLoading} type="submit">Log In</PrimaryButton>
        </div>
        {isError && (<div className={`${styles.errorMessage} center-row`}>{errorMessage}</div>)}
      </form>
      <div className="center-row">
        <p>Don't have an account? <a href="" onClick={(e) => onClickHandler(e)}>Register Here</a></p>
      </div>
    </Card>
  )
}

export default LoginCard;
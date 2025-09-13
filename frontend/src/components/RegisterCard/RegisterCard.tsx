import React, { useState } from 'react'
import Card from '../Card/Card'
import FormInput from '../FormInput/FormInput'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import styles from "./RegisterCard.module.css"
import { useNavigate } from 'react-router'
import axios from 'axios'
import WarnIcon from '../../assets/warning-circle.svg'
import { API_URL } from '../../utils/constants'

function RegisterCard() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // error handling
    if (!email) {
      setIsError(true)
      setErrorMessage("Email cannot be empty")
      return
    } else if (!username) {
      setIsError(true)
      setErrorMessage("Username cannot be empty")
      return
    } else if (!password) {
      setIsError(true)
      setErrorMessage("Password cannot be empty")
      return
    } else if (!confirmPassword) {
      setIsError(true)
      setErrorMessage("Please confirm password")
      return
    } else if (password !== confirmPassword) {
      setIsError(true)
      setErrorMessage("Passwords do not match")
      return
    }

    setIsLoading(true)
    try {
      await axios.post(`${API_URL}/user/createUser`, { username, email, password }, {withCredentials: true});
      navigate("/todo")
    } catch (error) {
      setIsError(true);

      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage((error as Error)?.message);
      }
    }
    setIsLoading(false)
  }

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <Card>
      <h1 className={styles.title}>REGISTER</h1>
      <form 
        onSubmit={(e) => onSubmitHandler(e)}
        className={styles.form}
        onChange={() => setIsError(false)}
      >
        <FormInput 
          type="email" 
          onChange={(e) => setEmail(e.target.value)}
          placeHolder="Email"
        />
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
        <FormInput 
          type="password" 
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeHolder="Confirm Password"
        />
        <div className="center-row">
          <PrimaryButton type="submit" onClick={() => setIsError(false)}  loading={isLoading}>Sign Up</PrimaryButton>
        </div>
        {isError && (
          <div className={`${styles.errorMessage} center-row`}>
            <img src={WarnIcon} alt="warning icon" />
            {errorMessage}
          </div>
        )}
      </form>
      <div className="center-row">
        <p>Already have an account? <a href="" onClick={(e) => onClickHandler(e)}>Log in</a></p>
      </div>
    </Card>
  )
}

export default RegisterCard
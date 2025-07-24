import React, { useState } from 'react'
import Card from '../Card/Card'
import FormInput from '../FormInput/FormInput'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import styles from "./RegisterCard.module.css"
import { useNavigate } from 'react-router'

function RegisterCard() {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null)

  const onSubmitHandler = () => {
    // temp
    console.log("Registering user...")
  }

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate("/login")
  }

  return (
    <Card>
      <h1 className={styles.title}>REGISTER</h1>
      <form onSubmit={(e) => onSubmitHandler(e)} className={styles.form}>
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
          <PrimaryButton>Sign Up</PrimaryButton>
        </div>
      </form>
      <div className="center-row">
        <p>Already have an account? <a href="" onClick={(e) => onClickHandler(e)}>Log in</a></p>
      </div>
    </Card>
  )
}

export default RegisterCard
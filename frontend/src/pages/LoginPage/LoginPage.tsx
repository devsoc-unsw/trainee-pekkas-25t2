import styles from "./LoginPage.module.css"
import LoginCard from '../../components/LoginCard/LoginCard'
import Header from '../../components/Header/Header'

function LoginPage() {
  return (
    <>
      <Header/>
      <div className={styles.container}>
        <LoginCard/>
      </div>
    </>

  )
}

export default LoginPage
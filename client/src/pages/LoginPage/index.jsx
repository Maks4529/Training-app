import HomeButton from '../../components/HomeButton';
import LoginForm from '../../components/LoginForm';
import styles from './LoginPage.module.sass';

function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <HomeButton />
      <h2>Login</h2>
      <LoginForm />
    </div>
  )
}

export default LoginPage;
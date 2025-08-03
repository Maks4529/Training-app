import HomeButton from '../../components/HomeButton';
import RegistrationForm from '../../components/RegistrationForm';
import styles from './RegistrationPage.module.sass';

function RegistrationPage() {
  return (
    <div className={styles.registrationPage}>
      <HomeButton />
      <h2>Registration</h2>
      <RegistrationForm />
    </div>
  )
}

export default RegistrationPage;
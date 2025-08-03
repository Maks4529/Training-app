import HomeButton from '../../components/HomeButton';
import styles from './NotFoundPage.module.sass';

function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <HomeButton />
      <h2>Not Found...</h2>
    </div>
  )
}

export default NotFoundPage;
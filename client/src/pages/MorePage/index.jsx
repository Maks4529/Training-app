import TrainingList from "../../components/TrainingList";
import HomeButton from '../../components/HomeButton';
import styles from './MorePage.module.sass';

function MorePage() {
  return (
    <div className={styles.morePage}>
      <HomeButton className={styles.homeBtn} />
      <h2>Our training</h2>
      <TrainingList/>
    </div>
  )
}

export default MorePage;
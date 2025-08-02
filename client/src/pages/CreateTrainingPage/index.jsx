import CreateTrainingForm from "../../components/CreateTrainingForm";
import HomeButton from '../../components/HomeButton';
import styles from './CreateTrainingPage.module.sass';

function CreateTrainingPage() {
  return (
    <div className={styles.createTrainingPage}>
      <HomeButton className={styles.homeBtn} />
      <h2>Create new training</h2>
      <CreateTrainingForm/>
    </div>
  )
}

export default CreateTrainingPage;
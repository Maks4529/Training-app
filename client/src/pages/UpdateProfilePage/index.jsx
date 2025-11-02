import UpdateProfileForm from "../../components/UpdateProfileForm";
import HomeButton from "../../components/HomeButton";
import styles from './UpdateProfilePage.module.sass';

function UpdateProfilePage() {
  return (
    <div className={styles.updateProfilePage}>
        <HomeButton className={styles.homeBtn} />
        <h2>Update Profile</h2>
        <UpdateProfileForm />
    </div>
  )
}

export default UpdateProfilePage;
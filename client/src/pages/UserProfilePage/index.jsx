import {useSelector} from 'react-redux';
import HomeButton from '../../components/HomeButton';
import styles from './UserProfilePage.module.sass';

function UserProfilePage() {
    const currentUser = useSelector(state => state.usersData.currentUser);

    if (!currentUser){
        return <div className={styles.loading}>Loading user profile...</div>
    }

  return (
    <div className={styles.userProfilePage}>
        <HomeButton className={styles.homeBtn} />
        <h2>{`Hello, ${currentUser.firstName} ${currentUser.lastName}`}</h2>
        <img className={styles.userProfileImage} src={`http://localhost:5000${currentUser.image}`} alt='user profile'/>
        <div className={styles.userInfo}>
            <p className={styles.userInfoItem}>{`First name: ${currentUser.firstName}`}</p>
            <p className={styles.userInfoItem}>{`Last name: ${currentUser.lastName}`}</p>
            <p className={styles.userInfoItem}>{`Birthday: ${currentUser.birthday}`}</p>
            <p className={styles.userInfoItem}>{`Email: ${currentUser.email}`}</p>
        </div>
        <h3>Your trainings</h3>
        {currentUser.Trainings.length !== 0 ? <ul className={styles.userTrainingList}>
          {currentUser.Trainings.map(t => <li className={styles.userTraining} key={t.id}>{t.title}</li>)}
        </ul>: <p className={styles.trainingsNotFound}>Trainings is not found ¯\_(ツ)_/¯</p>}
    </div>
  )
}

export default UserProfilePage;
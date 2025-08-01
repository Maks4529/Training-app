import {Link} from 'react-router-dom';
import styles from './HomeButton.module.sass';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function HomeButton() {
  return (
    <Link to='/' className={styles.homeBtn}><FontAwesomeIcon icon={faArrowLeft} /></Link>
  )
}

export default HomeButton;
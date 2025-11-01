import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styles from './NavMenu.module.sass';

function NavMenu() {
    const currentUser = useSelector(state => state.usersData.currentUser);
  return (
    <>
    <nav className={styles.navMenu}>
        <img className={styles.logo} src='/images/logo.png' alt='logo' />
        <p className={styles.slogan}>Shape Your Skills. Strengthen Your Body.</p>
        <ul className={styles.navList}>
            {currentUser ? (
                <>
                <li className={styles.navItem}>
                {currentUser.role === 'trainer' &&
                <NavLink className={styles.navLink} to='/create'>Create training</NavLink>
                }
            </li>
            <li className={styles.navItem}>
                <NavLink to='/profile'><img className={styles.profileImageLink} src={`http://localhost:5000${currentUser.image}`} alt='user profile'/></NavLink>
            </li>
                </>
            ):
            <>
            <li className={styles.navItem}>
                <NavLink className={styles.navLink} to='/registration'>Registration</NavLink>
            </li>
            <li className={styles.navItem}>
                <NavLink className={styles.navLink} to='/login'>LogIn</NavLink>
            </li>
            </>}
        </ul>
    </nav>
    </>
  )
}

export default NavMenu;
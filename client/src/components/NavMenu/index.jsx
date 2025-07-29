import {NavLink} from 'react-router-dom';
import styles from './NavMenu.module.sass';

function NavMenu() {
  return (
    <>
    <nav className={styles.navMenu}>
        <img className={styles.logo} src='/images/logo.png' alt='logo' />
        <p className={styles.slogan}>Shape Your Skills. Strengthen Your Body.</p>
        <ul className={styles.navList}>
            <li className={styles.navItem}>
                <NavLink className={styles.navLink} to='/create'>Create training</NavLink>
            </li>
            <li className={styles.navItem}>
                <NavLink className={styles.navLink} to='/registration'>Registration on training</NavLink>
            </li>
            <li className={styles.navItem}>
                <NavLink className={styles.navLink} to='/login'>LogIn</NavLink>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default NavMenu;
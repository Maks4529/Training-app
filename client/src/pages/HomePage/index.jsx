import NavMenu from "../../components/NavMenu";
import { NavLink } from "react-router-dom";
import styles from './HomePage.module.sass';

function HomePage() {
  return (
    <div className={styles.homePage}>
        <img className={styles.bg} src="/images/bg.jpg" alt="background" />
        <NavMenu />
        <div className={styles.animateBlock}>
        <h1 className={styles.mainTitle}>Full range of services</h1>
        <p className={styles.subTitle}>Discover everything you need in a local gym, and nothing you don't.</p>
        <NavLink className={styles.btnMore} to='/trainings'>More</NavLink>
        </div>
    </div>
  )
}

export default HomePage;
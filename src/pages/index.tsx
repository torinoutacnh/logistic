import type { NextPage } from 'next'
import { Footer } from '../components/Footer';
import { LookingCar } from '../components/LookingCar';
import styles from '../styles/Home.module.scss'
import { Header } from './header';
import { Admin } from '../components/Admin';
import { MainHome } from './mainHome';


const Home: NextPage = () => {



  return (
    <>

      <div className={styles.container}>

        {/* <Header /> */}
        {/* <MainHome /> */}
        {/* <LookingCar /> */}
        <Admin />

      </div>

      {/* <Footer /> */}
    </>

  )
}

export default Home

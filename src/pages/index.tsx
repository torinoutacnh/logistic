import type { NextPage } from 'next'
import { Footer } from '../components/Footer';
import { LookingCar } from '../components/LookingCar';
import styles from '../styles/Home.module.scss'
<<<<<<< HEAD
import { Header } from './header';
import { Admin } from '../components/Admin';
import { MainHome } from './mainHome';
=======
import { Header } from '../components/Header/header';

import { MainHome } from '../components/Home/mainHome';
import { Admin } from '../components/Admin';
>>>>>>> 2e95573befd26e2e4293881e63ed70e69a89481f


const Home: NextPage = () => {



  return (
    <>


<<<<<<< HEAD
        {/* <Header /> */}
        {/* <MainHome /> */}
        {/* <LookingCar /> */}
        <Admin />
=======
      <MainHome />

>>>>>>> 2e95573befd26e2e4293881e63ed70e69a89481f


<<<<<<< HEAD
      {/* <Footer /> */}
=======
>>>>>>> 2e95573befd26e2e4293881e63ed70e69a89481f
    </>

  )
}

export default Home

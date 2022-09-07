import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { Header } from './header';

import { MainHome } from './mainHome';


const Home: NextPage = () => {



  return (
    <div className={styles.container}>
      <Header />

      <MainHome />

    </div>
  )
}

export default Home

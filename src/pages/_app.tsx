import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Provider from '../components/Page/Provider'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

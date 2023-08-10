import '@/styles/globals.css'
import { UserAuthContextProvider } from '@/context/UserAuthContext'

export default function App({ Component, pageProps }) {
  return <>
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>
  </>

}

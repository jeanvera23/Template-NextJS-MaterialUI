
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app';
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

import "inter-ui/inter.css";

const MyApp = ({
  Component,
  pageProps,
}) => {
  const store = useStore(pageProps.initialReduxState)

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
    </Provider>)
}

export default MyApp

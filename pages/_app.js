import '../styles/global.scss';
import '../styles/fontawesome-all.min.css';
import { wrapper } from '../store';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
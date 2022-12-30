import '../styles/global.scss';
import { Provider } from 'react-redux';
import { wrapper } from '../store';

function App({ Component, ...rest }) {
  const {store, props} = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default App;

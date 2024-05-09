import Home from '../components/home';
import initFirebase from '../utils/firebase/initFirebase';

initFirebase();

export default function Index() {
  return <Home />;
}

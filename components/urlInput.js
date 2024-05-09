import { useSelector, useDispatch } from 'react-redux';
import { typeUrl, addUrl } from '../actions/urlActions';
import { selectIsAdding, selectTypedUrl } from '../selectors/urlSelectors';
import { selectIsUserSignedIn } from '../selectors/authSelectors';
import mainStyles from '../styles/main.module.scss';

const UrlInput = () => {
  const url = useSelector(selectTypedUrl());
  const isAdding = useSelector(selectIsAdding());
  const isUserSignedIn = useSelector(selectIsUserSignedIn());
  const dispatch = useDispatch();

  return (
    <input type="url" id="url-input" tabIndex="0" className={`${mainStyles.urlInput} newstyle`} onChange={(e) => dispatch(typeUrl(e.target.value))} onKeyDown={(e) => {
      if(isAdding) {
        e.preventDefault();
      } else if(e.code === 'Enter') {
        e.preventDefault();
        dispatch(addUrl());
      }
    }} value={url} placeholder="Enter a url..." disabled={!isUserSignedIn} />
  );
};

export default UrlInput;

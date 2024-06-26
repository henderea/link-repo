import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeUrl } from '../actions/urlActions';
import mainStyles from '../styles/main.module.scss';
import { selectUrlData } from '../selectors/urlSelectors';

const UrlList = () => {
  const urlData = useSelector(selectUrlData()) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    let element = document.querySelector('#urlList');
    element.scrollTop = 0;
  });
  let [standalone, setStandalone] = useState(false);
  useEffect(() => {
    setStandalone('standalone' in window.navigator && window.navigator.standalone);
  });
  return (
    <div id="urlList" className={mainStyles.urlList}>
      {urlData.map(({
        logo,
        title,
        description,
        image,
        url,
        key
      }) => (
        <div className={mainStyles.cardHolder} key={key}>
          <div className={mainStyles.card}>
            <div className={mainStyles.cardClose} onClick={() => dispatch(removeUrl(key))}>&times;</div>
            <div className={mainStyles.cardHeader}>
              {logo && (
                <span className={mainStyles.cardHeaderIcon}>
                  <img src={logo} alt="Logo" />
                </span>
              )}
              <span className={mainStyles.cardHeaderTitle}>
                <a href={/^https:[/][/]drive.google.com/.test(url) && standalone ? `googledrive://${url}` : url} target="_blank">{title || url}</a>
              </span>
            </div>
            {description && (
              <div className={mainStyles.cardDescription}>
                {description}
              </div>
            )}
            {image && (
              <div className={mainStyles.cardImage}>
                <img className={mainStyles.cardImageImage} src={image} alt={title} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UrlList;

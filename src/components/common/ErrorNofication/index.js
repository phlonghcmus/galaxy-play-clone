import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './ErrorNofication.module.scss';

const cx = classNames.bind(styles);
function ErrorNofication({ error, errorlist }) {
  return (
    <div className={cx('card')}>
      <div className={cx('card-title')}>
        <FontAwesomeIcon icon={faCircleExclamation} />
        <span>{error}</span>
      </div>
      <ul>
        {errorlist.map((error, index) => {
          return <li key={index}>{error}</li>;
        })}
      </ul>
    </div>
  );
}

export default ErrorNofication;

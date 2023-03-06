import classNames from 'classnames/bind';

import styles from './SwitchButtonMobile.module.scss';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function SwitchButtonMobile({ select1, select2, linear, setState, State }) {
  const sideBtn2 = useRef();

  return (
    <div className={cx('selector', { linear }, 'hide-on-pc')}>
      <div className={cx('selector-wrapper')}>
        <div>
          <button
            onClick={() => {
              sideBtn2.current.classList.toggle(cx('hide'));
            }}
          >
            {State ? select1 : select2}
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
        <div className={cx('hide')} ref={sideBtn2}>
          <button
            onClick={() => {
              const negativeState = !State;
              setState(negativeState);
              sideBtn2.current.classList.toggle(cx('hide'));
            }}
          >
            {State ? select2 : select1}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwitchButtonMobile;

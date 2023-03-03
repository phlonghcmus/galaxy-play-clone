import classNames from 'classnames/bind';

import styles from './SwitchButton.module.scss';
import { useRef } from 'react';

const cx = classNames.bind(styles);
function SwitchButton({ select1, select2, linear }) {
  const btn1 = useRef();
  const btn2 = useRef();
  const slide = useRef();
  return (
    <div className={cx('selector', { linear })}>
      <div ref={slide} className={cx('item-select')}></div>
      <button
        ref={btn1}
        className={cx('item', 'select')}
        onClick={() => {
          btn2.current.classList.remove(cx('select'));
          btn1.current.classList.add(cx('select'));
          slide.current.style.left = '-1%';
          slide.current.style.width = '45%';
        }}
      >
        {select1}
      </button>
      <button
        ref={btn2}
        className={cx('item')}
        onClick={() => {
          btn1.current.classList.remove(cx('select'));
          btn2.current.classList.add(cx('select'));
          slide.current.style.left = '45%';
          slide.current.style.width = '60%';
        }}
      >
        {select2}
      </button>
    </div>
  );
}

export default SwitchButton;

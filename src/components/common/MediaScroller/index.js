import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';

import styles from './MediaScroller.module.scss';
import MediaCard from '../MediaCard';

const cx = classNames.bind(styles);
function MediaScroller({ list }) {
  const scroller = useRef();
  return (
    <div
      ref={scroller}
      onScroll={() => {
        scroller.current.classList.add(cx('scroll'));
      }}
      className={cx('scroller')}
    >
      <div className={cx('inner')}>
        {list.map((item, index) => (
          <MediaCard item={item} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

export default MediaScroller;

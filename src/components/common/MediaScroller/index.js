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
        {list.map((item, index) => {
          const rate = Math.round(item.vote_average * 10);
          let color = '';
          if (rate >= 70) color = 'rgb(30, 213, 169)';
          else if (rate >= 40) color = 'yellow';
          else color = 'red';
          return (
            <div key={index} className={cx('card')}>
              <div className={cx('card-img')}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={rate}
                    styles={buildStyles({
                      pathColor: color,
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      {rate}
                      <sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>
                  {item.name || item.title}
                </div>
                <div className={cx('content-date')}>
                  {dayjs(item.first_air_date || item.release_date).format(
                    'MMM D, YYYY'
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MediaScroller;

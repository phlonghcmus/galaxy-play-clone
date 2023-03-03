import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import dayjs from 'dayjs';

import styles from './VideoScroll.module.scss';

const cx = classNames.bind(styles);
function VideoScroll({ list }) {
  const trendingScroll = useRef();
  return (
    <div
      ref={trendingScroll}
      onScroll={() => {
        trendingScroll.current.classList.add(cx('scroll'));
      }}
      className={cx('trending-scroller')}
    >
      <div className={cx('inner')}>
        {/* <div className={cx('trending-card')}>
          <div className={cx('card-img')}>
            <img
              src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
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
                value={22}
                styles={buildStyles({
                  pathColor: 'rgb(30, 213, 169)',
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
                  22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                </span>
              </CircularProgressbarWithChildren>
            </div>
            <div className={cx('content-title')}>The Mandalorian</div>
            <div className={cx('content-date')}>Nov 12, 2019</div>
          </div>
        </div> */}
        {list.map((item, index) => {
          const rate = Math.round(item.vote_average * 10);
          let color = '';
          if (rate >= 70) color = 'rgb(30, 213, 169)';
          else if (rate >= 40) color = 'yellow';
          else color = 'red';
          return (
            <div key={index} className={cx('trending-card')}>
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

export default VideoScroll;

import classNames from 'classnames/bind';
import dayjs from 'dayjs';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';

import styles from './MediaCard.module.scss';
const cx = classNames.bind(styles);
function MediaCard({ item, index, large, border }) {
  const rate = Math.round(item.vote_average * 10);
  let color = '';
  if (rate >= 70) color = 'rgb(30, 213, 169)';
  else if (rate >= 40) color = 'yellow';
  else color = 'red';
  return (
    <div
      key={index}
      className={cx('card', large ? 'large' : '', border ? 'border' : '')}
    >
      <div
        style={
          !item.poster_path
            ? {
                background: '#ccc',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }
            : {}
        }
        className={cx('card-img')}
      >
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt="img-card"
          ></img>
        ) : (
          <div style={{ fontWeight: 700 }}>No Image Found</div>
        )}

        <div className={cx('option')}>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
      </div>
      <div className={cx('card-content')}>
        <div className={cx('content-rate')} style={{ width: 36, height: 36 }}>
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
            {rate == 0 ? (
              <span
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1.2rem',
                }}
              >
                NR
              </span>
            ) : (
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
            )}
          </CircularProgressbarWithChildren>
        </div>
        <div className={cx('content-title')}>{item.name || item.title}</div>
        <div className={cx('content-date')}>
          {dayjs(item.first_air_date || item.release_date).format(
            'MMM D, YYYY'
          )}
        </div>
      </div>
    </div>
  );
}
export default MediaCard;

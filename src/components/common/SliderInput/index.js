import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';

import styles from './SliderInput.module.scss';

const cx = classNames.bind(styles);

function SliderInput({ min, max, step, bigStep }) {
  const [minState, setMinState] = useState(min);
  const [maxState, setMaxState] = useState(max);
  const [range, setRange] = useState({});
  const sliderTrack = useRef();
  const minTrack = useRef();
  const maxTrack = useRef();
  const notificationSlider = useRef();

  useEffect(() => {
    let rangeProp = [];
    let start = 0;
    let stepRatio = step / (max - min);
    let value = min;
    rangeProp.push({
      lte: start,
      gte: start + stepRatio / 2,
      width: stepRatio / 2,
      value: value,
      isLong: true,
    });
    start = start + stepRatio / 2;
    ++value;
    for (let i = 1; i <= (max - min) / step - 1; i++) {
      rangeProp.push({
        lte: start,
        gte: start + stepRatio,
        width: stepRatio,
        value: value,
        isLong: i % bigStep === 0 ? true : false,
      });
      start = start + stepRatio;
      value = value + step;
    }
    rangeProp.push({
      lte: start,
      gte: start + stepRatio / 2,
      width: stepRatio / 2,
      value: max,
      isLong: rangeProp.length % bigStep === 0 ? true : false,
    });
    setRange(rangeProp);
  }, []);

  const handleClickTick = (value) => {
    if (Math.abs(minState - value) < Math.abs(maxState - value)) {
      setMinState(value);
    } else {
      setMaxState(value);
    }
    showNotification();
    hideNotification();
  };

  const showNotification = () => {
    notificationSlider.current.classList.add(cx('notification-show'));
  };

  const hideNotification = () => {
    setTimeout(() => {
      notificationSlider.current.classList.remove(cx('notification-show'));
    }, 500);
  };
  return (
    <div className={cx('slider-wrap')}>
      <ul className={cx('slider-list')}>
        {range.length > 0 ? (
          range.map((range, index) => {
            return (
              <li
                className={cx('disable-text-selection', 'slider-tick')}
                key={index}
                style={{
                  width: `${(range.width * 100).toFixed(3)}%`,
                  fontSize: range.isLong ? '1rem' : '0.4rem',
                }}
                onClick={() => handleClickTick(range.value)}
              >
                |
                {range.isLong && (
                  <div className={cx('item-value')}>{range.value}</div>
                )}
              </li>
            );
          })
        ) : (
          <></>
        )}
      </ul>
      <div ref={sliderTrack} className={cx('slider-track')}>
        <div
          style={{
            left: `${(minState / (max - min)) * 100}%`,
            width: `${
              (maxState / (max - min) - minState / (max - min)) * 100
            }%`,
          }}
          className={cx('slider-selection')}
        >
          <div
            ref={notificationSlider}
            className={cx('disable-text-selection')}
          >
            Rated {minState} - {maxState}
          </div>
        </div>
        <div
          ref={minTrack}
          style={{ left: `${(minState / (max - min)) * 100}%` }}
          className={cx('track-point')}
          onDragStart={(e) => {
            minTrack.current.classList.add(cx('draghandle'));
            showNotification();
          }}
          onDragEnd={(e) => {
            minTrack.current.classList.remove(cx('draghandle'));
            hideNotification();
          }}
          onDrag={(e) => {
            e.preventDefault();
            const reactSlider = sliderTrack.current.getBoundingClientRect();
            const sliderRatio = (e.clientX - reactSlider.x) / reactSlider.width;
            if (sliderRatio > range[range.length - 1].gte) {
              setMinState(range[range.length - 1].value);
              return;
            }
            if (sliderRatio < range[0].gte) {
              setMinState(range[0].value);
              return;
            }
            range.forEach((element) => {
              if (element.lte <= sliderRatio && sliderRatio <= element.gte) {
                setMinState(element.value);
                if (element.value > maxState) setMaxState(element.value);
                return;
              }
            });
          }}
        ></div>
        <div
          ref={maxTrack}
          style={{ left: `${(maxState / (max - min)) * 100}%` }}
          className={cx('track-point')}
          onDragStart={(e) => {
            maxTrack.current.classList.add(cx('draghandle'));
            showNotification();
          }}
          onDragEnd={(e) => {
            maxTrack.current.classList.remove(cx('draghandle'));
            hideNotification();
          }}
          onDrag={(e) => {
            e.preventDefault();
            const reactSlider = sliderTrack.current.getBoundingClientRect();
            const sliderRatio = (e.clientX - reactSlider.x) / reactSlider.width;
            if (sliderRatio > range[range.length - 1].gte) {
              setMaxState(range[range.length - 1].value);
              return;
            }
            if (sliderRatio < range[0].gte) {
              setMaxState(range[0].value);
              return;
            }
            range.forEach((element) => {
              if (element.lte <= sliderRatio && sliderRatio <= element.gte) {
                setMaxState(element.value);
                if (element.value < minState) setMinState(element.value);
                return;
              }
            });
          }}
        ></div>
      </div>
      <div className={cx('slider-input')}>
        {/* <input
          id="vote_average_gte"
          name="vote_average.gte"
          value="0"
          type="text"
        />
        <input
          id="vote_average_lte"
          name="vote_average.lte"
          value="10"
          type="text"
        /> */}
      </div>
    </div>
  );
}
export default SliderInput;

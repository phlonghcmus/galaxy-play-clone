import classNames from 'classnames/bind';
import { useContext, useEffect, useRef, useState } from 'react';

import styles from './SliderInput.module.scss';
import { StoreContext } from '~/components/pages/Movie/context/FiltersContext/store';

const cx = classNames.bind(styles);

function SliderInput({
  min,
  max,
  step,
  bigStep,
  minState,
  maxState,
  setMinState,
  setMaxState,
}) {
  const [range, setRange] = useState({});
  const sliderTrack = useRef();
  const minTrack = useRef();
  const maxTrack = useRef();
  const notificationSlider = useRef();
  const [state, dispatch] = useContext(StoreContext);

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
    value = value + step;
    for (let i = 1; i <= (max - min) / step - 1; i++) {
      rangeProp.push({
        lte: start,
        gte: start + stepRatio,
        width: stepRatio,
        value: value,
        isLong: value % bigStep === 0 ? true : false,
      });
      start = start + stepRatio;
      value = value + step;
    }
    rangeProp.push({
      lte: start,
      gte: start + stepRatio / 2,
      width: stepRatio / 2,
      value: max,
      isLong: max % bigStep === 0 ? true : false,
    });
    setRange(rangeProp);
  }, []);

  const handleClickTick = (value) => {
    if (Math.abs(minState - value) < Math.abs(maxState - value)) {
      dispatch(setMinState(value));
    } else {
      dispatch(setMaxState(value));
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

  const onDragMin = (e) => {
    e.preventDefault();
    const reactSlider = sliderTrack.current.getBoundingClientRect();
    const sliderRatio = (e.clientX - reactSlider.x) / reactSlider.width;
    if (sliderRatio > range[range.length - 1].gte) {
      dispatch(setMinState(range[range.length - 1].value));
      return;
    }
    if (sliderRatio < range[0].gte) {
      dispatch(setMinState(range[0].value));
      return;
    }
    range.forEach((element) => {
      if (element.lte <= sliderRatio && sliderRatio <= element.gte) {
        dispatch(setMinState(element.value));
        if (element.value > maxState) dispatch(setMaxState(element.value));
        return;
      }
    });
  };

  const onDragMax = (e) => {
    e.preventDefault();
    const reactSlider = sliderTrack.current.getBoundingClientRect();
    const sliderRatio = (e.clientX - reactSlider.x) / reactSlider.width;
    if (sliderRatio > range[range.length - 1].gte) {
      dispatch(setMaxState(range[range.length - 1].value));
      return;
    }
    if (sliderRatio < range[0].gte) {
      dispatch(setMaxState(range[0].value));
      return;
    }
    range.forEach((element) => {
      if (element.lte <= sliderRatio && sliderRatio <= element.gte) {
        dispatch(setMaxState(element.value));
        if (element.value < minState) dispatch(setMinState(element.value));
        return;
      }
    });
  };

  const onDragStart = (target) => {
    target.classList.add(cx('draghandle'));
    showNotification();
  };

  const onDragEnd = (target) => {
    target.classList.remove(cx('draghandle'));
    hideNotification();
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
      <div draggable={false} ref={sliderTrack} className={cx('slider-track')}>
        <div
          draggable={false}
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
          id="min-drag"
          style={{ left: `${(minState / (max - min)) * 100}%` }}
          className={cx('track-point')}
          onDragStart={() => onDragStart(minTrack.current)}
          onDragEnd={() => onDragEnd(minTrack.current)}
          onDrag={(e) => onDragMin(e)}
          draggable={true}
        ></div>

        <div
          ref={maxTrack}
          id="max-drag"
          style={{ left: `${(maxState / (max - min)) * 100}%` }}
          className={cx('track-point')}
          onDragStart={() => onDragStart(maxTrack.current)}
          onDragEnd={() => onDragEnd(maxTrack.current)}
          onDrag={(e) => onDragMax(e)}
          draggable={true}
        ></div>
      </div>
    </div>
  );
}
export default SliderInput;

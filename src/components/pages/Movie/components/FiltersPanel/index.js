import { useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { faCheck, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { StoreContext } from '../../context/FiltersContext/store';
import styles from '../../Movie.module.scss';
import {
  setOnFilters,
  setAvailabilities,
} from '../../context/FiltersContext/actions';
import { availabilityOptions } from '~/utils/constant';

const cx = classNames.bind(styles);

function FiltersPanel({ handleShowFilter }) {
  const [state, dispatch] = useContext(StoreContext);
  const filtersRef = useRef();
  return (
    <div ref={filtersRef} className={cx('filter_panel')}>
      <div
        onClick={() => {
          handleShowFilter(filtersRef);
          dispatch(setOnFilters(!state.onFilters));
        }}
        className={cx('name')}
      >
        <h2>Filters</h2>
        <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
      </div>
      <div className={cx('filter')}>
        <h3>Show Me</h3>
        <ul className={cx('radio-check-list')}>
          <li>
            <input id="everything" type="radio" name="showme" defaultChecked />
            <div className={cx('radio-check')}>
              <div className={cx('inside')}></div>
            </div>

            <label htmlFor="everything">Everything</label>
          </li>
          <li>
            <input id="havenotseen" type="radio" name="showme" disabled />
            <div className={cx('radio-check')}>
              <div className={cx('inside')}></div>
            </div>

            <label htmlFor="havenotseen">Movies I Haven't Seen</label>
          </li>
          <li>
            <input id="haveseen" type="radio" name="showme" disabled />
            <div className={cx('radio-check')}>
              <div className={cx('inside')}></div>
            </div>

            <label htmlFor="all-availability">Movies I Have Seen</label>
          </li>
        </ul>
      </div>
      <div className={cx('filter')}>
        <h3>Availabilities</h3>
        <ul>
          {(state.availabilities[0] === true
            ? availabilityOptions.slice(0, 1)
            : availabilityOptions
          ).map((availability, index) => {
            return (
              <li key={index}>
                <input
                  type="checkbox"
                  id={`availability-checkbox-${index}`}
                  checked={state.availabilities[index]}
                  onChange={() => {
                    const newAvailabilities = [...state.availabilities];
                    newAvailabilities[index] = !newAvailabilities[index];
                    console.log(newAvailabilities);
                    console.log(state.availabilities);
                    dispatch(setAvailabilities(newAvailabilities));
                  }}
                />
                <div className={cx('checkbox')}>
                  <div className={cx('inside')}>
                    <FontAwesomeIcon icon={faCheck} />
                  </div>
                </div>
                <label htmlFor={`availability-checkbox-${index}`}>
                  {availability.name}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={cx('filter')}>
        <h3>Release Dates</h3>
      </div>
    </div>
  );
}

export default FiltersPanel;

import classNames from 'classnames/bind';
import { useLayoutEffect, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Movie.module.scss';
import { filtersSelect } from '~/redux/select';
import { setSortFilter } from '~/redux/slices/filters';
const cx = classNames.bind(styles);
const sortOptions = [
  'Popularity Descending',
  'Popularity Ascending',
  'Rating Descending',
  'Release Date Ascending',
  'Release Date Descending',
  'Title (A-Z)',
  'Title (Z-A)',
];
function Movie() {
  const selectOption = useRef();
  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      '--default-layout-header-width',
      '1400px'
    );
  }, []);
  const filters = useSelector(filtersSelect);
  const sortRef = useRef();
  const filtersRef = useRef();
  const dispatch = useDispatch();
  const { sort } = filters;
  const handleShowFilter = (ref) => {
    ref.current.classList.toggle(cx('show'));
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1>Popular Movies</h1>
        <div className={cx('content')}>
          <div>
            <div ref={sortRef} className={cx('filter_panel')}>
              <div
                onClick={() => handleShowFilter(sortRef)}
                className={cx('name')}
              >
                <h2>Sort</h2>
                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
              </div>
              <div className={cx('filter')}>
                <h3>Sort Results By</h3>
                <div className={cx('select')}>
                  {sort}
                  <FontAwesomeIcon
                    aria-label="select"
                    className={cx('icon')}
                    icon={faCaretDown}
                  />
                  <ul>
                    {sortOptions.map((option, index) => {
                      return (
                        <li
                          key={index}
                          className={cx(sort === option ? 'selected' : '')}
                          onClick={() => dispatch(setSortFilter(option))}
                        >
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div ref={filtersRef} className={cx('filter_panel')}>
              <div
                onClick={() => handleShowFilter(filtersRef)}
                className={cx('name')}
              >
                <h2>Filters</h2>
                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
              </div>
              <div className={cx('filter')}>
                <h3>Show Me</h3>
                <ul className={cx('radio-check-list')}>
                  <li>
                    <input
                      id="everything"
                      type="radio"
                      name="showme"
                      defaultChecked
                    />
                    <div className={cx('radio-check')}>
                      <div className={cx('inside')}></div>
                    </div>

                    <label htmlFor="everything">Everything</label>
                  </li>
                  <li>
                    <input
                      id="havenotseen"
                      type="radio"
                      name="showme"
                      disabled
                    />
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
                    <label htmlFor="haveseen">Movies I Have Seen</label>
                  </li>
                </ul>
              </div>
              <div className={cx('filter')}>
                <h3>Availabilities</h3>
                <br />
              </div>
            </div>
          </div>

          <div className={cx('list')}></div>
        </div>
      </div>
    </div>
  );
}

export default Movie;

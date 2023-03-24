import classNames from 'classnames/bind';
import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCheck,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Movie.module.scss';
import { filtersSelect } from '~/redux/select';
import { setSortFilter, toggleAvaliability } from '~/redux/slices/filters';
import { sortOptions, availabilityOptions } from '~/utils/constant';
import { fetchMovieDiscover } from '~/helpers/api/discover';
import MediaCard from '~/components/common/MediaCard';
const cx = classNames.bind(styles);
function Movie() {
  const listRef = useRef();
  const filters = useSelector(filtersSelect);
  const sortRef = useRef();
  const loadingRef = useRef();
  const filtersRef = useRef();
  const { availabilities } = filters;
  const [listMovie, setListMovie] = useState([]);
  const [fetchProps, setFetchProps] = useState({ page: 1 });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [onSort, setOnSort] = useState(false);
  const [sort, setSort] = useState({
    name: 'Popularity Descending',
    value: 'popularity.desc',
  });

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      '--default-layout-header-width',
      '1400px'
    );
  }, []);
  useEffect(() => {
    const fetchData = async ({ page, sort_by }) => {
      let data = await fetchMovieDiscover({ page: page, sort_by: sort_by });
      setListMovie(listMovie.concat(data.data.results));
    };

    fetchData(fetchProps).then(() =>
      loadingRef.current.classList.remove(cx('show'))
    );
    const onScroll = () => {
      const { scrollTop, clientHeight } = document.documentElement;
      if (
        scrollTop + clientHeight >
        listRef.current.clientHeight + loadingRef.current.clientHeight
      ) {
        loadingRef.current.classList.add(cx('show'));
        setFetchProps({ ...fetchProps, page: page + 1 });
        setPage(page + 1);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page, fetchProps]);
  const handleShowFilter = (ref) => {
    ref.current.classList.toggle(cx('show'));
  };

  const handleSearchClick = () => {
    const fetchPropsVal = {
      page: 1,
    };
    if (onSort) {
      let sortProps = { sort_by: sort.value };
      Object.assign(fetchPropsVal, sortProps);
    }
    setPage(1);
    setListMovie([]);
    setFetchProps(fetchPropsVal);
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        {availabilities}
        <h1>Popular Movies</h1>
        <div className={cx('content')}>
          <div>
            <div ref={sortRef} className={cx('filter_panel')}>
              <div
                onClick={() => {
                  handleShowFilter(sortRef);
                  setOnSort(!onSort);
                }}
                className={cx('name')}
              >
                <h2>Sort</h2>
                <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
              </div>
              <div className={cx('filter')}>
                <h3>Sort Results By</h3>
                <div className={cx('select')}>
                  {sort.name}
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
                          className={cx(
                            sort.name === option.name ? 'selected' : ''
                          )}
                          onClick={() => setSort(option)}
                        >
                          {option.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/* <div ref={filtersRef} className={cx('filter_panel')}>
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

                    <label htmlFor="all-availability">Movies I Have Seen</label>
                  </li>
                </ul>
              </div>
              <div className={cx('filter')}>
                <h3>Availabilities</h3>
                <ul>
                  {(availabilities[0] === true
                    ? availabilityOptions.slice(0, 1)
                    : availabilityOptions
                  ).map((availability, index) => {
                    return (
                      <li key={index}>
                        <input
                          type="checkbox"
                          id={`availability-checkbox-${index}`}
                          checked={availabilities[index]}
                          onChange={() => dispatch(toggleAvaliability(index))}
                        />
                        <div className={cx('checkbox')}>
                          <div className={cx('inside')}>
                            <FontAwesomeIcon icon={faCheck} />
                          </div>
                        </div>
                        <label htmlFor={`availability-checkbox-${index}`}>
                          {availability}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={cx('filter')}>
                <h3>Release Dates</h3>
              </div>
            </div> */}
            <button
              onClick={() => handleSearchClick()}
              disabled={!onSort}
              className={cx('filters-btn')}
            >
              Search
            </button>
          </div>

          <div ref={listRef} className={cx('list')}>
            {listMovie.map((movie, index) => (
              <MediaCard border large item={movie} key={index} />
            ))}
          </div>
        </div>
        <div
          className={cx('loading')}
          ref={loadingRef}
          style={{ width: '100%', height: '400px' }}
        >
          Loading
        </div>
      </div>
    </div>
  );
}

export default Movie;

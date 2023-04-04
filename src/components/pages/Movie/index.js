import classNames from 'classnames/bind';
import { useLayoutEffect, useRef, useEffect, useContext } from 'react';

import { StoreContext } from './context/FiltersContext/store';
import styles from './Movie.module.scss';
import { fetchMovieDiscover } from '~/helpers/api/discover';
import MediaCard from '~/components/common/MediaCard';
import Filters from './components/Filters';
import {
  setListMovie,
  setFetchProps,
  setPage,
} from './context/FiltersContext/actions';
const cx = classNames.bind(styles);
function Movie({ onTv }) {
  const [state, dispatch] = useContext(StoreContext);
  const { fetchProps, listMovie, page } = state;
  const listRef = useRef();
  const loadingRef = useRef();

  useLayoutEffect(() => {
    document.documentElement.style.setProperty(
      '--default-layout-header-width',
      '1400px'
    );
  }, []);
  useEffect(() => {
    const fetchData = async ({
      page,
      sort_by,
      availabilities,
      releaseTypes,
      gte,
      lte,
    }) => {
      let data = await fetchMovieDiscover({
        page: page,
        sort_by: sort_by,
        availabilities: availabilities,
        releaseTypes: releaseTypes,
        gte: gte,
        lte: lte,
        onTv: onTv,
      });
      dispatch(setListMovie(listMovie.concat(data.data.results)));
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
        dispatch(setFetchProps({ ...fetchProps, page: page + 1 }));
        dispatch(setPage(state.page + 1));
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [page, fetchProps]);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1>Popular Movies</h1>
        <div className={cx('content')}>
          <div>
            {/* <div ref={sortRef} className={cx('filter_panel')}>
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
            <div ref={filtersRef} className={cx('filter_panel')}>
              <div
                onClick={() => {
                  handleShowFilter(filtersRef);
                  setOnFilter(!onFilter);
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
                          onChange={() => {
                            const newAvailabilities = [...availabilities];
                            newAvailabilities[index] =
                              !newAvailabilities[index];
                            setAvailabilities(newAvailabilities);
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
            <button
              onClick={() => handleSearchClick()}
              disabled={!onSort && !onFilter}
              className={cx('filters-btn')}
            >
              Search
            </button> */}
            <Filters />
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

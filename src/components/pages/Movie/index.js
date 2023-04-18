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
      date,
      genres,
      vote,
      userVote,
      runtime,
    }) => {
      let data = await fetchMovieDiscover({
        page: page,
        sort_by: sort_by,
        availabilities: availabilities,
        releaseTypes: releaseTypes,
        date: date,
        onTv: onTv,
        genres: genres,
        vote: vote,
        userVote: userVote,
        runtime: runtime,
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
    <div className={cx('wrapper')} onDragOver={(e) => e.preventDefault()}>
      <div className={cx('inner')}>
        <h1>Popular Movies</h1>
        <div className={cx('content')}>
          <div>
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

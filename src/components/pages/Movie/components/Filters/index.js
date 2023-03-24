import classNames from 'classnames/bind';
import { useContext } from 'react';

import { StoreContext } from '../../context/FiltersContext/store';
import SortPanel from '../SortPanel';
import styles from '../../Movie.module.scss';
import {
  setListMovie,
  setFetchProps,
  setPage,
} from '../../context/FiltersContext/actions';
import FiltersPanel from '../FiltersPanel';

const cx = classNames.bind(styles);

function Filters() {
  const [state, dispatch] = useContext(StoreContext);
  const handleShowFilter = (ref) => {
    ref.current.classList.toggle(cx('show'));
  };
  const handleSearchClick = () => {
    const fetchPropsVal = {
      page: 1,
    };
    if (state.onSort) {
      let sortProps = { sort_by: state.sort.value };
      Object.assign(fetchPropsVal, sortProps);
    }
    if (state.onFilters) {
      let availabilityProps = { availabilities: state.availabilities };
      Object.assign(fetchPropsVal, availabilityProps);
    }
    dispatch(setPage(1));
    dispatch(setListMovie([]));
    dispatch(setFetchProps(fetchPropsVal));
  };
  return (
    <>
      <SortPanel handleShowFilter={handleShowFilter} />
      <FiltersPanel handleShowFilter={handleShowFilter} />
      <button
        onClick={() => handleSearchClick()}
        disabled={!state.onSort && !state.onFilters}
        className={cx('filters-btn')}
      >
        Search
      </button>
    </>
  );
}

export default Filters;

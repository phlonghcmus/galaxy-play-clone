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
  const {
    onSort,
    sort,
    onFilters,
    releaseTypes,
    availabilities,
    dateForm,
    dateTo,
  } = state;
  const handleShowFilter = (ref) => {
    ref.current.classList.toggle(cx('show'));
  };
  const handleSearchClick = () => {
    const fetchPropsVal = {
      page: 1,
    };
    if (onSort) {
      let sortProp = { sort_by: sort.value };
      Object.assign(fetchPropsVal, sortProp);
    }
    if (onFilters) {
      let availabilityProp = { availabilities: availabilities };
      Object.assign(fetchPropsVal, availabilityProp);
      let releaseTypeProp = { releaseTypes: releaseTypes };
      Object.assign(fetchPropsVal, releaseTypeProp);
      let releaseDate = { gte: dateForm, lte: dateTo };
      Object.assign(fetchPropsVal, releaseDate);
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
        disabled={!onSort && !onFilters}
        className={cx('filters-btn')}
      >
        Search
      </button>
    </>
  );
}

export default Filters;

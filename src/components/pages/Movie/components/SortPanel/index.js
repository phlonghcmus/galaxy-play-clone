import { useContext, useRef } from 'react';
import { setSort, setOnSort } from '../../context/FiltersContext/actions';
import { StoreContext } from '../../context/FiltersContext/store';
import classNames from 'classnames/bind';
import styles from '../../Movie.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { sortOptions } from '~/utils/constant';
const cx = classNames.bind(styles);
function SortPanel({ handleShowFilter }) {
  const [state, dispatch] = useContext(StoreContext);
  const sortRef = useRef();
  return (
    <div ref={sortRef} className={cx('filter_panel')}>
      <div
        onClick={() => {
          handleShowFilter(sortRef);
          dispatch(setOnSort(!state.onSort));
        }}
        className={cx('name')}
      >
        <h2>Sort</h2>
        <FontAwesomeIcon className={cx('icon')} icon={faChevronRight} />
      </div>
      <div className={cx('filter')}>
        <h3>Sort Results By</h3>
        <div className={cx('select')}>
          {state.sort.name}
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
                    state.sort.name === option.name ? 'selected' : ''
                  )}
                  onClick={() => dispatch(setSort(option))}
                >
                  {option.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SortPanel;

import {
  faArrowTrendUp,
  faBell,
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';

import images from '~/assets/images';
import WrapperDropdownNav from '~/components/WrapperDropdownNav';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);
function Header() {
  const [searchInput, setSearchInput] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    console.log(searchInputRef);
    if (searchInputRef.current != null) {
      searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  return (
    <div className={cx('wrapper')}>
      {showSearchInput && (
        <div className={cx('search-result')}>
          <div className={cx('search-wrapper')}>
            <div className={cx('search-box')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                ref={searchInputRef}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                className={cx('search-input')}
                placeholder="Search for a movie, tv, show, person..."
              />
              {searchInput && <FontAwesomeIcon icon={faXmark} />}
            </div>
          </div>
          <div
            style={{ backgroundColor: '#F7F7F7' }}
            className={cx('search-wrapper')}
          >
            <div className={cx('search-dropdown')}>
              <FontAwesomeIcon
                className={cx('search-dropdown-icon')}
                icon={faArrowTrendUp}
              />
              <span>Trending</span>
            </div>
          </div>
          <ul>
            <li>
              <div className={cx('search-wrapper')}>
                <div className={cx('search-result-inner')}>
                  <FontAwesomeIcon
                    className={cx('search-result-icoin')}
                    icon={faMagnifyingGlass}
                  />
                  <span>We Have A Ghost</span>
                </div>
              </div>
            </li>
            <li>
              <div className={cx('search-wrapper')}>
                <div className={cx('search-result-inner')}>
                  <FontAwesomeIcon
                    className={cx('search-result-icoin')}
                    icon={faMagnifyingGlass}
                  />
                  <span>We Have A Ghost</span>
                </div>
              </div>
            </li>
            <li>
              <div className={cx('search-wrapper')}>
                <div className={cx('search-result-inner')}>
                  <FontAwesomeIcon
                    className={cx('search-result-icoin')}
                    icon={faMagnifyingGlass}
                  />
                  <span>We Have A Ghost</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
      <div className={cx('inner')}>
        <div className={cx('menu')}>
          <img className={cx('logo')} src={images.logo} alt="tmdb" />
          <ul className={cx('navigation')}>
            <li className={cx('navigation-item')}>
              <a href="/movie">Movies</a>
              <WrapperDropdownNav>
                <ul className={cx('dropdown-list')}>
                  <li>Popular</li>
                  <li>Now Playing</li>
                  <li>Upcoming</li>
                  <li>Top Rated</li>
                </ul>
              </WrapperDropdownNav>
            </li>
            <li className={cx('navigation-item')}>
              <a href="/tvshow">TV Shows</a>
              <WrapperDropdownNav>
                <ul className={cx('dropdown-list')}>
                  <li>Popular</li>
                  <li>Airing Today</li>
                  <li>On TV</li>
                  <li>Top Rated</li>
                </ul>
              </WrapperDropdownNav>
            </li>
            <li className={cx('navigation-item')}>
              <a href="/people">People</a>
              <WrapperDropdownNav>
                <ul className={cx('dropdown-list')}>
                  <li>Popular People</li>
                </ul>
              </WrapperDropdownNav>
            </li>
          </ul>
        </div>
        <ul className={cx('action')}>
          <li>
            <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
          </li>
          <li>
            <div className={cx('language')}>EN</div>
          </li>
          <li>
            <a href="/" className={cx('login-btn')}>
              Login
            </a>
          </li>
          <li>
            <a href="/" className={cx('join-tmdb-btn')}>
              Join TMDB
            </a>
          </li>
          {/* <li>
            <FontAwesomeIcon className={cx('icon')} icon={faBell} />
          </li>
          <li>
            <div className={cx('avatar')}>
              <span>P</span>
              <div className={cx('wrapper-dropdown-avatar')}>
                <span className={cx('userid')}>phlonghcmus</span>
                <span className={cx('viewprofile')}>View profile</span>
                <ul className={cx('dropdown-list')}>
                  <li className={cx('line-list')}></li>
                  <li>Discussions</li>
                  <li>Lists</li>
                  <li>Ratings</li>
                  <li>Watchlist</li>
                  <li className={cx('line-list')}></li>
                  <li>Edit Profile</li>
                  <li>Settings</li>
                  <li className={cx('line-list')}></li>
                  <li>Logout</li>
                </ul>
              </div>
            </div>
          </li> */}
          {!showSearchInput && (
            <li>
              <FontAwesomeIcon
                onClick={() => {
                  setShowSearchInput(true);
                }}
                className={cx('search-btn', 'search-btn-show')}
                icon={faMagnifyingGlass}
              />
            </li>
          )}
          {showSearchInput && (
            <li>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => {
                  setShowSearchInput(false);
                }}
                className={cx('search-btn-hide', 'search-btn')}
              />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;

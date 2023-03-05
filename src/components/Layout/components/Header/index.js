import {
  faArrowTrendUp,
  faBars,
  faBell,
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import images from '~/assets/images';
import WrapperDropdownNav from '~/components/common/WrapperDropdownNav';
import styles from './Header.module.scss';
import { auth, logout } from '~/firebase';
import { fetchTrending } from '~/helpers/api/trending';
const cx = classNames.bind(styles);
function Header() {
  const [searchInput, setSearchInput] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchTrending, setSearchTrending] = useState([]);
  const searchInputRef = useRef(null);
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchTrending('all', 'day');
      setSearchTrending(data.data.results.slice(0, 10));
    }
    if (searchInputRef.current != null) {
      searchInputRef.current.focus();
    }
    if (showSearchInput) {
      fetchData();
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
            {searchTrending.map((element, index) => {
              return (
                <li key={index}>
                  <div className={cx('search-wrapper')}>
                    <div className={cx('search-result-inner')}>
                      <FontAwesomeIcon
                        className={cx('search-result-icoin')}
                        icon={faMagnifyingGlass}
                      />
                      <span>{element.title || element.name}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={cx('inner')}>
        <div className={cx('menu')}>
          <a href="/" className={cx('logo')}>
            <img src={images.logoHeader} alt="tmdb" />
          </a>
          <ul className={cx('navigation')}>
            <FontAwesomeIcon className={cx('navigation-bar')} icon={faBars} />
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
        <a href="/" className={cx('logo-mobile')}>
          <img src={images.logoFooter} alt="tmdb" />
        </a>
        <ul className={cx('action')}>
          <li>
            <FontAwesomeIcon className={cx('icon')} icon={faPlus} />
          </li>
          <li>
            <div className={cx('language')}>EN</div>
          </li>
          {!user && (
            <>
              <li>
                <a href="/login" className={cx('login-btn')}>
                  Login
                </a>
              </li>
              <li>
                <a href="/" className={cx('join-tmdb-btn')}>
                  Join TMDB
                </a>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <FontAwesomeIcon className={cx('icon')} icon={faBell} />
              </li>
              <li>
                <div className={cx('avatar')}>
                  <span>{user.email[0]}</span>
                  <div className={cx('wrapper-dropdown-avatar')}>
                    <span className={cx('userid')}>{user.email}</span>
                    <span className={cx('viewprofile')}>View profile</span>
                    <ul className={cx('dropdown-list')}>
                      <li className={cx('line-list')}></li>
                      <li>
                        <a href="/">Discussions</a>
                      </li>
                      <li>
                        <a href="/">Lists</a>
                      </li>
                      <li>
                        <a href="/">Ratings</a>
                      </li>
                      <li>
                        <a href="/">Watchlist</a>
                      </li>
                      <li className={cx('line-list')}></li>
                      <li>
                        <a href="/">Edit Profile</a>
                      </li>
                      <li>
                        <a href="/">Settings</a>
                      </li>
                      <li className={cx('line-list')}></li>
                      <li>
                        <a href="/" onClick={logout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </>
          )}
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

import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import SwitchButton from '~/components/common/SwitchButton';

import styles from './Home.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import { fetchTrending } from '~/helpers/api/trending';
import MediaScroller from '~/components/common/MediaScroller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faPlay } from '@fortawesome/free-solid-svg-icons';
import { fetchPopular } from '~/helpers/api/popular';

const cx = classNames.bind(styles);
const user = [
  {
    avatar:
      'https://www.gravatar.com/avatar/66807fdf92e80a5f67f4a9d4082186e7.jpg?s=64',
    username: 'nicos18',
    all: 39875,
    week: 24975,
  },
  {
    avatar:
      'https://www.gravatar.com/avatar/66807fdf92e80a5f67f4a9d4082186e7.jpg?s=64',
    username: 'RuiZafon',
    all: 351848,
    week: 20122,
  },
  {
    avatar:
      'https://www.gravatar.com/avatar/3af6511cf44a709e6ae5b612903c846c.jpg?s=64',
    username: 'heli5m',
    all: 607516,
    week: 10366,
  },
  {
    avatar:
      'https://www.themoviedb.org/t/p/w64_and_h64_face/5BvxGhRE7yjtbHCXgrTxPk9hBXp.jpg',
    username: 'Sheigutn',
    all: 442348,
    week: 10008,
  },
  {
    avatar:
      'https://www.themoviedb.org/t/p/w64_and_h64_face/yYG7Rhn9HfFpssIMeNiDynvxC14.jpg',
    username: 'raze464',
    all: 524471,
    week: 8833,
  },
  {
    avatar:
      'https://www.gravatar.com/avatar/6c61757f4a3afde4fc0a32e7380c6b73.jpg?s=64',
    username: 'ukodus',
    all: 28455,
    week: 7652,
  },
  {
    avatar:
      'https://www.themoviedb.org/t/p/w64_and_h64_face/uJngdDd0WzNYGwlmBGYrDxp1akP.jpg',
    username: 'shahdk',
    all: 135737,
    week: 4309,
  },
  {
    avatar:
      'https://www.themoviedb.org/t/p/w64_and_h64_face/uJngdDd0WzNYGwlmBGYrDxp1akP.jpg',
    username: 'Magicus',
    all: 241152,
    week: 4177,
  },
  {
    avatar:
      'https://www.themoviedb.org/t/p/w64_and_h64_face/uJngdDd0WzNYGwlmBGYrDxp1akP.jpg',
    username: 'mickael8411',
    all: 10481,
    week: 3841,
  },
  {
    avatar:
      'https://www.themoviedb.org/t/p/w64_and_h64_face/uJngdDd0WzNYGwlmBGYrDxp1akP.jpg',
    username: 'lineker',
    all: 1439941,
    week: 3748,
  },
];

function Home() {
  const [todayTrendingData, setTodayTrendingData] = useState([]);
  const [weekTrendingData, setWeekTrendingData] = useState([]);
  const [onTvPopularData, setOnTvPopularData] = useState([]);
  const [inTheatersPopularData, setInTheatersPopularData] = useState([]);
  const [isTodayTrending, setIsTodayTrending] = useState(true);
  const [isOnTvTrailers, setIsOnTvTrailers] = useState(true);
  const [isOnTvPopular, setIsOnTvPopular] = useState(true);
  const [maxAllEdits, setMaxAllEdits] = useState();
  const [maxWeekEdits, setMaxWeekEdits] = useState();
  const [userEdits, setUserEdits] = useState([]);
  const trailerScroll = useRef();
  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchTrending('all', 'day');
      setTodayTrendingData(data.data.results);
      data = await fetchTrending('all', 'week');
      setWeekTrendingData(data.data.results);
      data = await fetchPopular('tv', '1');
      setOnTvPopularData(data.data.results);
      data = await fetchPopular('movie', '1');
      setInTheatersPopularData(data.data.results);
      setUserEdits(user);
      const maxAllEditsVal = Math.max.apply(
        Math,
        user.map((item) => {
          return item.all;
        })
      );
      setMaxAllEdits(maxAllEditsVal);
      const maxWeekEditsVal = Math.max.apply(
        Math,
        user.map((item) => {
          return item.week;
        })
      );
      setMaxWeekEdits(maxWeekEditsVal);
    };
    fetchData();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <section className={cx('welcome')}>
        <div className={cx('wrapp')}>
          <h1>Welcome.</h1>
          <h2>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
          <div className={cx('search')}>
            <input placeholder="Search for a movie, tv show, person....." />
            <button className={cx('search-btn')}>Search</button>
          </div>
        </div>
      </section>
      <section className={cx('media-scroller')}>
        <div className={cx('header')}>
          <h2>Trending</h2>
          <SwitchButton
            select1="Today"
            select2="This Week"
            setState={setIsTodayTrending}
          />
        </div>
        <MediaScroller
          list={isTodayTrending ? todayTrendingData : weekTrendingData}
        />
      </section>
      <section
        style={{
          backgroundImage:
            'url(https://www.themoviedb.org/t/p/w1920_and_h427_multi_faces/ihBrgKx7IuOptUYcblRJHAraRM0.jpg)',
        }}
        className={cx('trailer')}
      >
        <div
          style={{
            background:
              'linear-gradient(to right, rgba(3, 37, 65, 0.75) 0%, rgba(3, 37, 65, 0.75) 100%)',
          }}
          className={cx('wrapp')}
        >
          <div className={cx('header')}>
            <h2>Latest Trailers</h2>
            <SwitchButton
              select1={'On TV'}
              select2={'In Theaters'}
              setState={setIsOnTvTrailers}
              linear
              long
            />
          </div>
          <div
            ref={trailerScroll}
            className={cx('trailer-scroll')}
            onScroll={() => {
              trailerScroll.current.classList.add(cx('scroll'));
            }}
          >
            <div className={cx('trailer-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/ihBrgKx7IuOptUYcblRJHAraRM0.jpg"
                  alt="card-img"
                />
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <FontAwesomeIcon className={cx('play')} icon={faPlay} />
              </div>
              <div className={cx('card-content')}>
                <h2>Close</h2>
                <h3>Offcial Trailer #2</h3>
              </div>
            </div>
            <div className={cx('trailer-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/ihBrgKx7IuOptUYcblRJHAraRM0.jpg"
                  alt="card-img"
                />
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <FontAwesomeIcon className={cx('play')} icon={faPlay} />
              </div>
              <div className={cx('card-content')}>
                <h2>Close</h2>
                <h3>Offcial Trailer #2</h3>
              </div>
            </div>
            <div className={cx('trailer-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/ihBrgKx7IuOptUYcblRJHAraRM0.jpg"
                  alt="card-img"
                />
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <FontAwesomeIcon className={cx('play')} icon={faPlay} />
              </div>
              <div className={cx('card-content')}>
                <h2>Close</h2>
                <h3>Offcial Trailer #2</h3>
              </div>
            </div>
            <div className={cx('trailer-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/ihBrgKx7IuOptUYcblRJHAraRM0.jpg"
                  alt="card-img"
                />
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <FontAwesomeIcon className={cx('play')} icon={faPlay} />
              </div>
              <div className={cx('card-content')}>
                <h2>Close</h2>
                <h3>Offcial Trailer #2</h3>
              </div>
            </div>
            <div className={cx('trailer-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/ihBrgKx7IuOptUYcblRJHAraRM0.jpg"
                  alt="card-img"
                />
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <FontAwesomeIcon className={cx('play')} icon={faPlay} />
              </div>
              <div className={cx('card-content')}>
                <h2>Close</h2>
                <h3>Offcial Trailer #2</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={cx('media-scroller')}>
        <div className={cx('header')}>
          <h2>What's Popular</h2>
          <SwitchButton
            select1="On Tv"
            select2="In Theaters"
            setState={setIsOnTvPopular}
            long
          />
        </div>
        <MediaScroller
          list={isOnTvPopular ? onTvPopularData : inTheatersPopularData}
        />
      </section>
      <section className={cx('join')}>
        <div className={cx('inner')}>
          <h2 className={cx('header')}>Join Today</h2>
          <div className={cx('content')}>
            <div>
              <h3>
                Get access to maintain your own{' '}
                <i>custom personal lists, track what you've seen</i> and search
                and filter for <i>what to watch next</i>—regardless if it's in
                theatres, on TV or available on popular streaming services like
                .
              </h3>
              <button>
                <a href="/signup">Sign Up</a>
              </button>
            </div>
            <div>
              <ul>
                <li>Enjoy TMDB ad free</li>
                <li>Maintain a personal watchlist</li>
                <li>
                  Filter by your subscribed streaming services and find
                  something to watch
                </li>
                <li>Log the movies and TV shows you've seen</li>
                <li>Build custom lists</li>
                <li>Contribute to and improve our database</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className={cx('leaderboard')}>
        <div className={cx('header')}>
          <h2>Leaderboard</h2>
          <div>
            <p>
              <span className={cx('dot', 'all')}></span>All Time Edits
            </p>
            <p>
              <span className={cx('dot', 'week')}></span>Edits This Week
            </p>
          </div>
        </div>
        <div className={cx('content')}>
          <ul className={cx('data-list')}>
            {userEdits.map((user, index) => {
              console.log(user.all / maxAllEdits);
              return (
                <li key={index} className={cx('list-item')}>
                  <img src={user.avatar} alt="avatar"></img>
                  <div className={cx('data')}>
                    <h3>{user.username}</h3>
                    <div className={cx('width-wrapper')}>
                      <div
                        style={{ width: `${(user.all / maxAllEdits) * 100}%` }}
                        className={cx('width', 'all')}
                      ></div>
                      <h4>{user.all}</h4>
                    </div>
                    <div className={cx('width-wrapper')}>
                      <div
                        style={{
                          width: `${(user.week / maxWeekEdits) * 100}%`,
                        }}
                        className={cx('width', 'week')}
                      ></div>
                      <h4>{user.week}</h4>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;

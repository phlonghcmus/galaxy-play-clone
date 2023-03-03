import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import SwitchButton from '~/components/common/SwitchButton';

import styles from './Home.module.scss';
import 'react-circular-progressbar/dist/styles.css';
import { fetchTrending } from '~/helpers/trending';
import VideoScroll from '~/components/common/VideoScroll';

const cx = classNames.bind(styles);

function Home() {
  const [todayTrending, setTodayTrending] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrending('all', 'day');
      setTodayTrending(data.data.results);
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
      <section className={cx('trending')}>
        <div className={cx('header')}>
          <h2>Trending</h2>
          <SwitchButton select1="Today" select2="This Week" />
        </div>
        <VideoScroll list={todayTrending} />
      </section>
    </div>
  );
}

export default Home;

import classNames from 'classnames/bind';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
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
          <div className={cx('selector')}>
            <div className={cx('item-select')}></div>
            <button className={cx('item')}>Today</button>
            <button className={cx('item')}>This Week</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

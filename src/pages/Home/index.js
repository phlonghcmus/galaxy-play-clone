import { async } from '@firebase/util';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { json } from 'react-router-dom';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://api.themoviedb.org/3/trending/all/day?api_key=41d8502e79098c9f163a19bab0e8599f'
      );
      console.log(await response.json());
    }
    fetchData();
  }, []);

  return <div className={cx('wrapper')}>Home Page</div>;
}

export default Home;

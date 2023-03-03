import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from 'react-circular-progressbar';
import SwitchButton from '~/components/common/SwitchButton';

import styles from './Home.module.scss';
import 'react-circular-progressbar/dist/styles.css';

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
          <SwitchButton select1="Today" select2="This Week" />
        </div>
        <div className={cx('trending-scroller')}>
          <div className={cx('inner')}>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
            <div className={cx('trending-card')}>
              <div className={cx('card-img')}>
                <img
                  src="https://www.themoviedb.org/t/p/w220_and_h330_face/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg"
                  alt="img-card"
                ></img>
                <div className={cx('option')}>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </div>
              <div className={cx('card-content')}>
                <div
                  className={cx('content-rate')}
                  style={{ width: 36, height: 36 }}
                >
                  <CircularProgressbarWithChildren
                    background
                    backgroundPadding={6}
                    value={22}
                    styles={buildStyles({
                      pathColor: 'rgb(30, 213, 169)',
                      trailColor: '#204529',
                      backgroundColor: '#032541',
                    })}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '1.4rem',
                        fontWeight: '700',
                      }}
                    >
                      22<sup style={{ fontSize: '0.6rem' }}>%</sup>
                    </span>
                  </CircularProgressbarWithChildren>
                </div>
                <div className={cx('content-title')}>The Mandalorian</div>
                <div className={cx('content-date')}>Nov 12, 2019</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

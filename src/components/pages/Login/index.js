import classNames from 'classnames/bind';
import { useState } from 'react';
import ErrorNofication from '~/components/common/ErrorNofication';
import { signInWithGoogle, logInWithEmailAndPassword } from '~/firebase';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState();
  document.documentElement.style.setProperty(
    '--default-layout-header-width',
    '1400px'
  );

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <h1>Login to your account</h1>
        <h2>
          In order to use the editing and rating capabilities of TMDB, as well
          as get personal recommendations you will need to login to your
          account. If you do not have an account, registering for an account is
          free and simple. <a href="/signup">Click here</a> to get started.
        </h2>
        {err && <ErrorNofication error="There was a problem" errorlist={err} />}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            let err = await logInWithEmailAndPassword(email, password);
            if (err) setErr([err]);
          }}
        >
          <h3>Email</h3>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3>Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input type="submit" value="Login" />
        </form>
        <button onClick={signInWithGoogle}>
          <img
            src="https://static.xx.fbcdn.net/rsrc.php/yv/r/HwisNeTP7Qh.svg"
            alt="logo-google"
          />
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Login;

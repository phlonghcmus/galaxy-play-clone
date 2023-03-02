import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { registerWithEmailAndPassword } from '~/firebase';
import classNames from 'classnames/bind';

import ErrorNofication from '~/components/ErrorNofication';
import styles from './Signup.module.scss';

const cx = classNames.bind(styles);

function Signup() {
  const [errorList, setErrorList] = useState([]);
  const onSubmit = async (values) => {
    let err = await registerWithEmailAndPassword(
      values.username,
      values.email,
      values.password
    );
    if (err) setErrorList([err]);
  };
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--default-layout-header-width',
      '1400px'
    );
  });

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('benefit')}>
          <h3>Benefits of being a member</h3>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              Find something to watch on your subscribed streaming services
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <span>Log the movies and TV shows you have watched</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <span>
                Keep track of your favourite movies and TV shows and get
                recommendations from them
              </span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <span>Build and maintain a personal watchlist</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <span>Build custom mixed lists (movies and TV)</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <span>Take part in movie and TV discussions</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              <span>
                Contribute to, and improve the information in our database
              </span>
            </li>
          </ul>
        </div>
        <div className={cx('signup')}>
          <h1>Sign up for an account</h1>
          <h2>
            Signing up for an account is free and easy. Fill out the form below
            to get started. JavaScript is required to to continue.
          </h2>

          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
              email: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string()
                .min(6, 'Username needs to be at least 6 characters long')
                .required('Username is required'),
              password: Yup.string()
                .min(6, 'Password needs to be at least 6 characters long')
                .required('Password is required'),
              email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
              confirmPassword: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Passwords must match'
              ),
            })}
            validateOnMount={false}
            displayName="RegistrarForm"
            onSubmit={onSubmit}
          >
            {({
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit} noValidate>
                {errorList.length > 0 && (
                  <ErrorNofication
                    error="There was an error processing your signup"
                    errorlist={errorList}
                  />
                )}
                <h3>Username</h3>
                <input
                  id="username"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  type="text"
                ></input>

                <h3>Password (6 characters minimum)</h3>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <h3>Password Confirm</h3>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  type="password"
                />
                <h3>Email</h3>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <button
                  type="submit"
                  onClick={() => {
                    const errorList = [];
                    Object.keys(errors).forEach((key) => {
                      errorList.push(errors[key]);
                    });
                    setErrorList(errorList);
                    console.log('submit');
                  }}
                >
                  Sign Up
                </button>
                <a className={cx('cancel-btn')} href="/">
                  Cancel
                </a>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default Signup;

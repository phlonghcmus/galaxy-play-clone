import classNames from 'classnames/bind';
import styles from './WrapperDropdownNav.module.scss';
const cx = classNames.bind(styles);
function WrapperDropdownNav({ children }) {
  return <div className={cx('wrapper')}>{children}</div>;
}

export default WrapperDropdownNav;

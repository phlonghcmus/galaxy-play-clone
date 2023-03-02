import Home from '../pages/Home';
import Login from '../pages/Login';
import Movie from '../pages/Movie';
import Profile from '../pages/Profile';
import Signup from '../pages/Signup';
import Tvshow from '../pages/Tvshow';

const routes = [
  { path: '/', component: Home },
  { path: '/movie', component: Movie },
  { path: '/tvshow', component: Tvshow },
  { path: '/login', component: Login, auth: false },
  { path: '/signup', component: Signup, auth: false },
  { path: '/profile', component: Profile, auth: true },
];

export { routes };

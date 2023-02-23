const { default: Home } = require('~/pages/Home');
const { default: Movie } = require('~/pages/Movie');
const { default: Profile } = require('~/pages/Profile');
const { default: Tvshow } = require('~/pages/Tvshow');

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/movie', component: Movie },
  { path: '/tvshow', component: Tvshow },
];
const privateRoutes = [{ path: '/profile', component: Profile }];

export { publicRoutes, privateRoutes };

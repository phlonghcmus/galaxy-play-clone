import axios from 'axios';
const fetchMovieDiscover = ({ sort_by, page }) => {
  //Read https://developers.themoviedb.org/3/discover/movie-discover
  const pageString = page ? `&page=${page}` : '';
  const sortbyString = sort_by ? `&sort_by=${sort_by}` : '';
  const url = `
    https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}${sortbyString}${pageString}`;
  const response = axios.get(url);
  return response;
};
export { fetchMovieDiscover };

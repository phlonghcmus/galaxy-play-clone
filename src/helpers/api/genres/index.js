import axios from 'axios';
const fetchAllGenres = () => {
  const params = {
    api_key: process.env.REACT_APP_API_KEY,
    language: 'en-US',
  };
  const response = axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
    params,
  });
  return response;
};
export { fetchAllGenres };

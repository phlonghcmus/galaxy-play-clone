import axios from 'axios';
const fetchTrending = (media_type, time_window) => {
  //media_type('all','movie','tv','person')
  //time_window('day','week')
  const url = `https://api.themoviedb.org/3/trending/${media_type}/${time_window}?api_key=${process.env.REACT_APP_API_KEY}`;
  const response = axios.get(url);
  return response;
};
export { fetchTrending };

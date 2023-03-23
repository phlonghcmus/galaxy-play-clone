import axios from 'axios';
const fetchPopular = (media_type, page) => {
  //media_type('all','movie','tv','person')
  //page number of page
  const url = `
  https://api.themoviedb.org/3/${media_type}/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
  const response = axios.get(url);
  return response;
};
export { fetchPopular };

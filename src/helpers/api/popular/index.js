import axios from 'axios';
const fetchPopular = (media_type, page) => {
  //media_type('all','movie','tv','person')
  //page number of page
  const url = `
  https://api.themoviedb.org/3/${media_type}/popular?api_key=41d8502e79098c9f163a19bab0e8599f&language=en-US&page=${page}`;
  const response = axios.get(url);
  return response;
};
export { fetchPopular };

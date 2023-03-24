import axios from 'axios';
import { availabilityOptions } from '~/utils/constant';
const fetchMovieDiscover = ({ sort_by, page, availabilities }) => {
  //Read https://developers.themoviedb.org/3/discover/movie-discover
  const pageString = page ? `&page=${page}` : '';
  const sortbyString = sort_by ? `&sort_by=${sort_by}` : '';
  let availabilitiesString = `&with_watch_monetization_types=`;
  if (availabilities) {
    if (availabilities[0] === false) {
      availabilities = availabilities.slice(1, availabilities.length + 1);
      let first = true;
      availabilities.forEach((availability, index) => {
        if (availability === true) {
          if (first === true) {
            availabilitiesString =
              availabilitiesString + availabilityOptions[index + 1].value;
            first = false;
          } else {
            availabilitiesString =
              availabilitiesString +
              '||' +
              availabilityOptions[index + 1].value;
          }
        }
      });
    } else {
      availabilitiesString = '';
    }
  } else {
    availabilitiesString = '';
  }
  const url = `
    https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}${sortbyString}${pageString}${availabilitiesString}&watch_region=AL`;
  console.log(url);
  const response = axios.get(url);
  return response;
};
export { fetchMovieDiscover };

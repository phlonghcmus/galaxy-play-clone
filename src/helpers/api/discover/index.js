import axios from 'axios';
import { availabilityOptions, releaseTypeOptions } from '~/utils/constant';
const fetchMovieDiscover = ({
  sort_by,
  page,
  availabilities,
  releaseTypes,
  gte,
  lte,
  onTv,
}) => {
  //Read https://developers.themoviedb.org/3/discover/movie-discover
  let typeProps = 'movie';
  if (onTv) typeProps = 'tv';
  console.log(gte);
  console.log(lte);
  // if (releaseDate) {
  //   if (releaseDate.gte) {
  //   }
  //   if (releaseDate.lte) {
  //   }
  // }

  let availabilitiesString = '';
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

  let releaseTypeString = '';
  if (releaseTypes) {
    if (releaseTypes[0] === false) {
      releaseTypes = releaseTypes.slice(1, releaseTypes.length + 1);
      let first = true;
      releaseTypes.forEach((releaseType, index) => {
        if (releaseType === true) {
          if (first === true) {
            releaseTypeString =
              releaseTypeString + releaseTypeOptions[index + 1].value;
            first = false;
          } else {
            releaseTypeString =
              releaseTypeString + '||' + releaseTypeOptions[index + 1].value;
          }
        }
      });
    } else {
      releaseTypeString = '';
    }
  } else {
    releaseTypeString = '';
  }

  const params = {
    api_key: process.env.REACT_APP_API_KEY,
    page: page,
    sort_by: sort_by,
    with_watch_monetization_types: availabilitiesString,
    watch_region: 'AL',
    with_release_type: releaseTypeString,
    'release_date.gte': gte ? new Date(gte) : '',
    'release_date.lte': lte ? new Date(lte) : '',
  };
  const response = axios.get(
    `https://api.themoviedb.org/3/discover/${typeProps}`,
    {
      params,
    }
  );
  return response;
};
export { fetchMovieDiscover };

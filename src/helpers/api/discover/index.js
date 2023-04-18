import axios from 'axios';
import { availabilityOptions, releaseTypeOptions } from '~/utils/constant';
const fetchMovieDiscover = ({
  sort_by,
  page,
  availabilities,
  releaseTypes,
  date,
  onTv,
  genres,
  vote,
  userVote,
  runtime,
}) => {
  //Read https://developers.themoviedb.org/3/discover/movie-discover
  let typeProps = 'movie';
  if (onTv) typeProps = 'tv';

  const params = {
    api_key: process.env.REACT_APP_API_KEY,
    page: page,
    sort_by: sort_by,
    watch_region: 'AL',
  };

  if (date)
    Object.assign(params, {
      'release_date.gte': date.gte ? new Date(date.gte) : '',
      'release_date.lte': date.lte ? new Date(date.lte) : '',
    });

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
      Object.assign(params, {
        with_watch_monetization_types: availabilitiesString,
      });
    } else {
      availabilitiesString = '';
    }
  } else {
    availabilitiesString = '';
  }

  let with_genres = [];
  if (genres) {
    genres.forEach((genre) => {
      if (genre.value) with_genres.push(genre.id);
    });
    Object.assign(params, { with_genres: with_genres.join(',') });
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
      Object.assign(params, { with_release_type: releaseTypeString });
    } else {
      releaseTypeString = '';
    }
  } else {
    releaseTypeString = '';
  }

  if (vote) {
    Object.assign(params, {
      'vote_average.lte': vote.lte ? vote.lte : 10,
      'vote_average.gte': vote.gte ? vote.gte : 0,
    });
  }

  if (userVote) {
    Object.assign(params, {
      'vote_count.lte': userVote.lte ? userVote.lte : 500,
      'vote_count.gte': userVote.gte ? userVote.gte : 0,
    });
  }

  if (runtime) {
    Object.assign(params, {
      'with_runtime.lte': runtime.lte ? runtime.lte : 400,
      'with_runtime.gte': runtime.gte ? runtime.gte : 0,
    });
  }
  const response = axios.get(
    `https://api.themoviedb.org/3/discover/${typeProps}`,
    {
      params,
    }
  );
  return response;
};
export { fetchMovieDiscover };

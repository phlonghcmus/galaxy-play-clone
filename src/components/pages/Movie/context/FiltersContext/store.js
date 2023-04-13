import { createContext } from 'react';
import { availabilityOptions, releaseTypeOptions } from '~/utils/constant';
export const initState = {
  listMovie: [],
  fetchProps: { page: 1 },
  page: 1,
  onSort: false,
  sort: {
    name: 'Popularity Descending',
    value: 'popularity.desc',
  },
  onFilters: false,
  availabilities: new Array(availabilityOptions.length).fill(true),
  releaseTypes: new Array(releaseTypeOptions.length).fill(true),
  dateForm: '',
  dateTo: new Date(new Date().setMonth(new Date().getMonth() + 6))
    .toISOString()
    .slice(0, 10),
  genres: {},
};
function reducer(state, action) {
  switch (action.type) {
    case 'setOnSort':
      return {
        ...state,
        onSort: action.payload,
      };
    case 'setSort': {
      return {
        ...state,
        sort: action.payload,
      };
    }
    case 'setListMovie': {
      return {
        ...state,
        listMovie: action.payload,
      };
    }
    case 'setFetchProps': {
      return {
        ...state,
        fetchProps: action.payload,
      };
    }
    case 'setPage': {
      return {
        ...state,
        page: action.payload,
      };
    }
    case 'setOnFilters': {
      return {
        ...state,
        onFilters: action.payload,
      };
    }
    case 'setAvailabilities': {
      return {
        ...state,
        availabilities: action.payload,
      };
    }
    case 'setReleaseTypes': {
      return {
        ...state,
        releaseTypes: action.payload,
      };
    }
    case 'setDateForm':
      return {
        ...state,
        dateForm: action.payload,
      };
    case 'setDateTo':
      return {
        ...state,
        dateTo: action.payload,
      };
    case 'setGenres':
      return {
        ...state,
        genres: action.payload,
      };
    case 'toggleGenre':
      return {
        ...state,
        genres: state.genres.map((genre) =>
          genre.id === action.payload
            ? { ...genre, value: !genre.value }
            : genre
        ),
      };
    default:
      throw new Error('Invalid Action');
  }
}
export default reducer;
export const StoreContext = createContext();

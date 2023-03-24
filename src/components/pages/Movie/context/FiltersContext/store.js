import { createContext } from 'react';
import { availabilityOptions } from '~/utils/constant';
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
    default:
      throw new Error('Invalid Action');
  }
}
export default reducer;
export const StoreContext = createContext();

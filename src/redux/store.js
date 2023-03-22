import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filters';

export default configureStore({
  reducer: {
    filters: filtersReducer,
  },
});

import { createSlice } from '@reduxjs/toolkit';
import { availabilityOptions } from '~/utils/constant';
const initialState = {
  sort: { name: 'Popularity Descending', value: 'popularity.desc' },
  showme: 'Everything',
  availabilities: new Array(availabilityOptions.length).fill(true),
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortFilter: (state, action) => {
      state.sort = action.payload;
    },
    toggleAvaliability: (state, action) => {
      state.availabilities[action.payload] =
        !state.availabilities[action.payload];
    },
  },
});
export const { setSortFilter, toggleAvaliability } = filtersSlice.actions;
export default filtersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  sort: 'Popularity Descending',
  showme: 'Everything',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSortFilter: (state, action) => {
      state.sort = action.payload;
    },
  },
});
export const { setSortFilter } = filtersSlice.actions;
export default filtersSlice.reducer;

export const sortOptions = [
  { name: 'Popularity Descending', value: 'popularity.desc' },
  { name: 'Popularity Ascending', value: 'popularity.asc' },
  { name: 'Rating Descending', value: 'vote_average.desc' },
  { name: 'Rating Ascending', value: 'vote_average.asc' },
  { name: 'Release Date Ascending', value: 'release_date.asc' },
  { name: 'Release Date Descending', value: 'release_date.desc' },
  { name: 'Title (A-Z)', value: 'original_title.desc' },
  { name: 'Title (Z-A)', value: 'original_title.asc' },
];
export const availabilityOptions = [
  { name: 'Search all availabilities?', value: undefined },
  { name: 'Stream', value: 'flatrate' },
  { name: 'Free', value: 'free' },
  { name: 'Ads', value: 'ads' },
  { name: 'Rent', value: 'rent' },
  { name: 'Buy', value: 'buy' },
];
export const releaseTypeOptions = [
  { name: 'Search all releases?', value: undefined },
  { name: 'Premiere', value: 1 },
  { name: 'Theatrical (limited)', value: 2 },
  { name: 'Theatrical', value: 3 },
  { name: 'Digital', value: 4 },
  { name: 'Physical', value: 5 },
  { name: 'TV', value: 6 },
];

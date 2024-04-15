import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzcwZTAzZTFiOGZlMjU1OTM4Y2E3NmQ2Mzk4ZDAyZiIsInN1YiI6IjY2MTY3Mjk5NGRhM2Q0MDE4NDE1NjYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TGvqg9i6oA38wvorbpvsztaRDlJc6XRPyhuuNAordik',
  },
};

export const moviesTrendWeek = async () => {
  const respons = await axios.get(
    '/trending/movie/day?language=en-US',
    options
  );
  return respons.data.results;
};

export const moviesSearch = async query => {
  const respons = await axios.get(
    `/search/movie?query=${query}&include_adult=true&language=en-US&page=1`,
    options
  );
  return respons.data.results;
};

export const movieDetails = async id => {
  const respons = await axios.get(`/movie/${id}?language=en-US`, options);
  return respons.data;
};

export const getMovieCast = async id => {
  const respons = await axios.get(
    `/movie/${id}/credits?language=en-US`,
    options
  );
  return respons.data.cast;
};

export const getMovieReviews = async id => {
  const respons = await axios.get(
    `/movie/${id}/reviews?language=en-US`,
    options
  );
  return respons.data.results;
};

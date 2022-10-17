import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'api_key=0dda21dd928567c6bc99dbf700579ad9';

export const getPopularMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}movie/popular?${API_KEY}&language=en-US&page=1`,
  );

  return response.data.results;
};

export const getUpcomingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}movie/upcoming?${API_KEY}&language=en-US&page=1`,
  );

  return response.data.results;
};

export const getPopularTV = async () => {
  const response = await axios.get(
    `${BASE_URL}tv/popular?${API_KEY}&language=en-US&page=1`,
  );

  return response.data.results;
};

export const getFamilyMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}discover/movie?${API_KEY}&with_genres=10751`,
  );

  return response.data.results;
};

export const getDocumentaryMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}discover/movie?${API_KEY}&with_genres=99`,
  );

  return response.data.results;
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(`${BASE_URL}movie/${movieId}?${API_KEY}`);

  return response.data;
};

export const searchMovieTV = async (query, type = 'movie') => {
  const response = await axios.get(
    `${BASE_URL}search/${type}?${API_KEY}&query=${query}`,
  );

  return response.data.results;
};

import css from './MoviesPage.module.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { moviesSearch } from '../../services/movies-api';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('You have not entered anything to search');

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();
  const searchQuery = searchParams.get('query') ?? '';

  useEffect(() => {
    if (searchQuery === '') return;
    async function handleSearchMovies(movieName) {
      try {
        setIsLoading(true);
        setMovies([]);
        const data = await moviesSearch(movieName);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    handleSearchMovies(searchQuery);
  }, [searchQuery]);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.target.query.value.trim() === '') {
      notify();
    }
    setSearchParams({ searchQuery });
  };

  const handleChange = evt => {
    const query = evt.target.value;
    setSearchParams(query ? { query: query } : {});
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          value={searchQuery}
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movieData={movies} location={location} />
      <Toaster />
    </>
  );
};

export default MoviesPage;

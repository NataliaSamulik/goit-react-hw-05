import { useEffect, useState } from 'react';
import { moviesTrendWeek } from '../../services/movies-api';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

const HomePage = () => {
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    async function moviesTrend() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await moviesTrendWeek();
        setTrends(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    moviesTrend();
  }, []);

  return (
    <div className={css.homePage}>
      <h2>Trending today</h2>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <MovieList movieData={trends} location={location} />
    </div>
  );
};

export default HomePage;

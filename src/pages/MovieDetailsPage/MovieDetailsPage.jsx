import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { movieDetails } from '../../services/movies-api';
import { BASE_IMG_URL } from '../../services/constants';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLink = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function handleMovieDetails(id) {
      try {
        setIsLoading(true);
        const data = await movieDetails(id);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    handleMovieDetails(movieId);
  }, [movieId]);

  if (!movie) {
    return null;
  }
  return (
    <div className={css.detailsPage}>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <Link className={css.btnGoBack} to={backLink.current}>
        Go back
      </Link>
      <div className={css.details}>
        <img
          src={movie.poster_path ? BASE_IMG_URL + movie.poster_path : ''}
          width={300}
          height={400}
        ></img>
        <div>
          <h2>
            {movie.title} ({new Date().getFullYear(movie.release_date)})
          </h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p> {movie.genres.map(genre => genre.name).join('  ')}</p>
        </div>
      </div>
      <div className={css.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link className={css.linkDetails} to="cast" state={location.state}>
              Cast
            </Link>
          </li>
          <li>
            <Link
              className={css.linkDetails}
              to="reviews"
              state={location.state}
            >
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;

import { useEffect, useState } from 'react';
import { getMovieCast } from '../../services/movies-api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { BASE_IMG_URL } from '../../services/constants';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    async function handleMovieCast(id) {
      try {
        setIsLoading(true);
        const infoCast = await getMovieCast(id);
        setCast(infoCast);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    handleMovieCast(movieId);
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {cast.length > 0 ? (
        <ul>
          {cast.map(actor => (
            <li className={css.castItem} key={actor.id}>
              <img
                src={
                  actor.profile_path ? BASE_IMG_URL + actor.profile_path : ''
                }
                alt={actor.original_name}
                width={100}
                height={120}
              />
              <h4>{actor.original_name}</h4>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
    </>
  );
};

export default MovieCast;

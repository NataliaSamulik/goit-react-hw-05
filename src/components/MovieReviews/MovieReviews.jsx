import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../services/movies-api';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleMovieReviews(id) {
      try {
        setIsLoading(true);
        const infoReviews = await getMovieReviews(id);
        setReviews(infoReviews);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    handleMovieReviews(movieId);
  }, [movieId]);
  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li className={css.reviewsItem} key={review.id}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
    </>
  );
};

export default MovieReviews;

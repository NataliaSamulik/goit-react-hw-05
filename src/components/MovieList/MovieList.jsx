import { Link } from 'react-router-dom';

const MovieList = ({ movieData, location }) => {
  return (
    <ul>
      {movieData.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`} state={location}>
            {movie.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;

import { MovieModel } from '../../../models/movie.model';
import Movie from '../Movie/Movie';
import classes from './MoviesList.module.css';

interface Props {
    movies: MovieModel[];
}

export default function MoviesList(props: Props) {
  return (
    <ul className={classes['movies-list']}>
    {props.movies.map((movie) => (
      <Movie
        key={movie.id}
        title={movie.title}
        releaseDate={movie.releaseDate}
        openingText={movie.openingText}
      />
    ))}
  </ul>
  )
}

import React, { Fragment, useState } from 'react';
import './App.css';
import MoviesList from './components/Movies/MovieList/MovieList';
import { MovieSwapiData } from './models/movie-swapi-data.model';
import { MovieModel } from './models/movie.model';

export default function App() {

  const [movies, setMovies] = useState<MovieModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function fetchMoviesHandler() {

    setIsLoading(true);

    const response = await fetch("https://swapi.dev/api/films/")
    const data = await response.json();

    const transformedMovies: MovieModel[] = data.results.map((movieData: MovieSwapiData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date
      };
    });

    setMovies(transformedMovies);

    setIsLoading(false);

  };



return (
  <Fragment>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>
      {(isLoading === false && movies.length > 0 )&& <MoviesList movies={movies} />}
      {(isLoading === false && movies.length === 0) && <p>Found no movies!</p>}
      {isLoading === true && <p>Loading ...</p>}
    </section>
  </Fragment>
);
}

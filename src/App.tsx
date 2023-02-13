import React, { Fragment, useState } from 'react';
import './App.css';
import MoviesList from './components/Movies/MovieList/MovieList';
import { MovieSwapiData } from './models/movie-swapi-data.model';
import { MovieModel } from './models/movie.model';

export default function App() {

  const [movies, setMovies] = useState<MovieModel[]>([])

  async function fetchMoviesHandler() {

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

  };



return (
  <Fragment>
    <section>
      <button onClick={fetchMoviesHandler}>Fetch Movies</button>
    </section>
    <section>
      <MoviesList movies={movies} />
    </section>
  </Fragment>
);
}

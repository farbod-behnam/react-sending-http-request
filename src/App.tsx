import React, { Fragment, useCallback, useEffect, useState } from 'react';
import './App.css';
import AddMovie from './components/Movies/AddMovie/AddMovie';
import MoviesList from './components/Movies/MovieList/MovieList';
import { MovieSwapiData } from './models/movie-swapi-data.model';
import { MovieModel } from './models/movie.model';
import Loading from './UI/Loader/Loading';

export default function App() {

  const [movies, setMovies] = useState<MovieModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchMoviesHandler = useCallback(async () => {

    setIsLoading(true);
    let transformedMovies: MovieModel[] = []

    try {
      const response = await fetch("https://swapi.dev/api/films/")

      if (response.ok === false) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();



      transformedMovies = data.results.map((movieData: MovieSwapiData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        };
      });
    } catch (error) {
      const er = error as Error;
      setError(er.message);
      setIsLoading(false);
    }


    setMovies(transformedMovies);

    setIsLoading(false);

  }, []);


  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);


  async function addMovieHandler(movie: MovieModel) {
    const response = await fetch("http:localhost:5000/api/v1/movies", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
    
  }


  return (
    <Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}></AddMovie>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies!</p>}
        {isLoading && <Loading />}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </Fragment>
  );
}

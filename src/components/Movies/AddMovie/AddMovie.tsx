import { FormEvent, useRef } from 'react';
import { MovieModel } from '../../../models/movie.model';
import classes from './AddMovie.module.css';

interface Props {
    onAddMovie: (movie: MovieModel) => void;
}

export default function AddMovie(props: Props) {

    const titleRef = useRef<HTMLInputElement>(null);
    const openingTextRef = useRef<HTMLTextAreaElement>(null);
    const releaseDateRef = useRef<HTMLInputElement>(null);
  
    function submitHandler(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      // could add validation here...

  
      const movie: MovieModel = {
        id: Math.random(),
        title: titleRef.current?.value || "no title input",
        openingText: openingTextRef.current?.value || "no opening text input",
        releaseDate: releaseDateRef.current?.value || "no release date input"
      };
  
      props.onAddMovie(movie);
    }

  return (
    <form onSubmit={submitHandler}>
    <div className={classes.control}>
      <label htmlFor='title'>Title</label>
      <input type='text' id='title' ref={titleRef} />
    </div>
    <div className={classes.control}>
      <label htmlFor='opening-text'>Opening Text</label>
      <textarea rows={5} id='opening-text' ref={openingTextRef}></textarea>
    </div>
    <div className={classes.control}>
      <label htmlFor='date'>Release Date</label>
      <input type='text' id='date' ref={releaseDateRef} />
    </div>
    <button>Add Movie</button>
  </form>
  );
}

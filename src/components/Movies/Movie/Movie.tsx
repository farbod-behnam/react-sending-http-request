import classes from "./Movie.module.css";


interface Props {
    title: string;
    releaseDate: string;
    openingText: string;
}

export default function Movie(props: Props) {
  return (
    <li className={classes.movie}>
    <h2>{props.title}</h2>
    <h3>{props.releaseDate}</h3>
    <p>{props.openingText}</p>
  </li>
  )
}

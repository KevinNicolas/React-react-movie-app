import noImagesUrl from "../utils/noImagesUrl"
import { Link } from "react-router-dom"
import '../css/MovieCard.css'

type props = {
  movie: movieData
}

export function MovieCard (props: props) {

  const imageURL = props.movie.poster_path 
    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${props.movie.poster_path}`
    : noImagesUrl

  return (
    <Link to={`/${props.movie.id}`} className="Movie-card-link fade-in">
      <div className="Movie-card">
        {/* IMAGE */}
        <div className="image-container w-full h-full" style={{ background: `url("${imageURL}")`}}>
          <div 
            className={`
              bubble
              ${
                props.movie.vote_average < 6
                ? 'bg-red-500'
                : props.movie.vote_average <= 8
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }
            `}
          >
            <span>{ props.movie.vote_average }</span>
          </div>
        </div>
        {/* TITLE */}
        <div 
          className="
            flex 
            justify-center items-center text-center 
            w-full h-full
            px-2
            overflow-hidden overflow-ellipsis
          "
        >
          <span 
            className={`overflow-hidden overflow-ellipsis w-full ${ props.movie.original_title.length > 40 ? 'h-full' : '' }`}
          >
            { props.movie.original_title }
          </span>
        </div>
      </div>
    </Link>
  )
}
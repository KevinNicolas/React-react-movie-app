import { T_movieData } from "../types/movieApi"
import noImagesUrl from "../utils/noImagesUrl"
import '../css/MovieCard.css'

type props = {
  movie: T_movieData
}

export function MovieCard (props: props) {

  const imageURL = props.movie.poster_path 
    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${props.movie.poster_path}`
    : noImagesUrl

  if (props.movie.poster_path) { console.log('POSTER PATH:',imageURL) }

  return (
    <div className="Movie-card">
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
      <div className="flex justify-center items-center w-full h-full px-2 text-center">
        <span>{ props.movie.original_title }</span>
      </div>
    </div>
  )
}
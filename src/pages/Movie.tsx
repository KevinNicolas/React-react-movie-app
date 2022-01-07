import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiTriangle } from 'react-icons/fi'

import httpClient from '../utils/httpClient'

import '../css/general.css'
import '../css/Movie.css'

function Header () {
  return (
    <div className='bg-blue-900 full flex items-center gap-2 drop-shadow-md'>
      <Link to={'/'} className='
        bg-blue-900 hover:bg-blue-800 
        transition-default h-full react-movie-button
        flex items-center gap-2 
        px-4
      '>
        <span className='text-blue-400'>
          <FiTriangle size={48} />
        </span>
        <span className='text-white text-xl'>React-movies</span>
      </Link>
    </div>
  )
}

function ShowMovieInfo (props: { movie: detailedMovieData }) {
  const { movie } = props

  const imageURL = movie.poster_path 
    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${movie.backdrop_path}`
    : false
  
  const defaultStyles = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  }

  const backgroundImage = {
    background: `url(${imageURL})`,
    ...defaultStyles
  }

  const backgroundStyles = imageURL ? backgroundImage : defaultStyles

  return (
    <div className='movie-info-container full flex' style={backgroundStyles}>
      <div className="bg-black bg-opacity-80 text-white full grid grid-rows-4 grid-cols-1 p-4">
        <div className="flex flex-row">
          <span className="text-4xl">
            { movie.title } { movie.title !== movie.original_title ? `(${movie.original_title})` : '' }
          </span>
        </div>
        <div>
          <span>data</span>
        </div>
      </div>
    </div>
  )
}

export function Movie () {
  
  /**
   * @const params = { movieId: number }
   */
  const params = useParams()
  const endpoint = `/movie/${params.movieId}`
  const [movie, setMovie] = useState({ isLoading: true, movieData: {} })

  useEffect(() => {
    httpClient.getMovies(endpoint)
    .then((data: detailedMovieData) => { setMovie({ isLoading: false, movieData: data }) })
    .catch((err: any) => { console.error('Error:', err); return false })
  }, [])

  return (
    <div className='movie-detail-container full-screen'>
      <Header />
      {/* Content */}
      { movie.isLoading 
        ? <div className='full flex center'> <span>Cargando...</span> </div>
        : <ShowMovieInfo movie={movie.movieData as detailedMovieData} />
      }
    </div>
  )
}
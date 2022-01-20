import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiTriangle } from 'react-icons/fi'

import httpClient from '../utils/httpClient'

import '../css/general.css'
import '../css/Movie.css'
import getClassColor from '../hooks/voteAvrgColor'
import noImagesUrl from '../utils/noImagesUrl'

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
  
  const companyImageURL = (logo_path: string) => props.movie.poster_path
    ? `${process.env.REACT_APP_BASE_IMAGE_URL}${logo_path}`
    : noImagesUrl
  
    return (
    <div className='movie-info-container full flex' style={backgroundStyles}>
      <div className="bg-black bg-opacity-80 text-white p-4 full flex flex-col py-4 gap-2">
        <div className='flex justify-between items-center pl-2 pr-4'>
            <span>
              <span className='text-blue-400 text-4xl'>{ movie.title } </span>
              <span className='text-gray-300 text-3xl'>( { movie.tagline } )</span>
            </span>
          <div
            className={`
            text-white rounded-full px-9 py-7 text-4xl flex flex-col
              ${getClassColor(movie.vote_average)}
            `}
          >
            <span>{ movie.vote_average }</span>
            <span className='text-base'>of <span className='font-semibold text-purple-500'>{ movie.vote_count }</span></span>
          </div>
        </div>
        <div className='flex flex-col gap-2 px-8'>
          <span>Popularity: <span className='font-semibold'>{ movie.popularity }</span></span>
          <span>Status: <span className='font-semibold'>{ movie.status }</span></span>
          <span>Release date: <span className='font-semibold'>{ movie.release_date }</span></span>
        </div>
        <div className='px-6 py-2'>
          <span className='text-lg'>{ movie.overview }</span>
        </div>
        <div className='py-4'>
          <a 
            href={movie.homepage}
            target="_blank"
            rel="noreferrer"
            className='text-purple-600 hover:text-purple-500 hover:underline transition duration-300 cursor-pointer z-50'
          >
            <span className='text-xl'>Ir a la pagina oficial</span>
          </a>
        </div>
      </div>
      <div className={`footer ${movie.production_companies.length > 1 ? 'justify-between' : 'justify-center'}`}>
        { movie.production_companies.map((company: company) => {
          return (<img src={companyImageURL(company.logo_path)} alt={company.name} />)
        }) }
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
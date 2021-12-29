import { useState, useEffect } from 'react';
import { FiTriangle, FiSearch } from 'react-icons/fi'

import httpClient from '../utils/httpClient'
import useQuery from '../hooks/query';

import { T_movieData } from '../types/movieApi'
import { MovieCard } from '../components/MovieCard';
import '../css/root.css'


export function Root () {

  const [movieData, setMovieData] = useState({
    movies: [] as T_movieData[],
    isLoading: true
  })

  const searchQuery: string | null = useQuery().get('search')
  const endpoint = searchQuery ? `/search/movie?query=${searchQuery}` : '/discover/movie'
    
  
  useEffect(() => {
    httpClient.getMovies(endpoint)
      .then((data: any) => {
        const results: T_movieData[] = data.results
        setMovieData({ isLoading: false, movies: results })
      })
      .catch((err: any) => { console.error('Error:', err); throw err })
  }, [searchQuery])

  return (
    <div className="root-container">
      {/* Main view */}
      <div className="main-view w-screen h-screen flex justify-center items-center">
        <div className="bg-black bg-opacity-30 flex flex-row justify-center items-center h-48 w-screen">
          <div>
            <span className="text-blue-400 text-9xl">
              <FiTriangle />
            </span>
          </div>
          <div className="pb-3 flex flex-row items-end">
            <span className="text-gray-200 text-7xl font-medium">React-movies</span>
          </div>
        </div>
      </div>
      <div className='bg-gray-600 bg-opacity-90 flex flex-col'>
        <div className=''>
          <span>filters</span>
        </div>
        <div className='movies-grid'>
          {
            movieData.isLoading
            ? <></>
            : movieData.movies.map((movie: T_movieData) => <MovieCard movie={movie} />)
          }
        </div>
      </div>
    </div>
  )
}
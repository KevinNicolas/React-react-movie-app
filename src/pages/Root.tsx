import { useState, useEffect, useRef } from 'react';
import { FiTriangle } from 'react-icons/fi'

import httpClient from '../utils/httpClient'
import useQuery from '../hooks/query';

import { MovieCard } from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

import '../css/root.css'
import '../css/general.css'

export function Root () {

  const [movieData, setMovieData] = useState({
    movies: [] as movieData[],
    isLoading: true
  })

  const searchBarRef = useRef<searchBarRefs>()
  const queries = useQuery()
  const searchQuery: string | null = queries.get('search')
  const endpoint = searchQuery ? `/search/movie?query=${searchQuery}` : '/discover/movie'
  
  useEffect(() => {
    httpClient.getMovies(endpoint)
      .then((data: any) => {
        const results: movieData[] = data.results
        setMovieData({ isLoading: false, movies: results })
        if (searchBarRef.current) { searchBarRef.current.setSearchIsLoading(false) }
      })
      .catch((err: any) => { 
        console.error('Error:', err);
        if (searchBarRef.current) { searchBarRef.current.setSearchIsLoading(false) }
        throw err
      })
  }, [searchQuery])

  
  return (
    <div className="root-container">
      <div className="main-view w-screen h-screen flex justify-center items-center">
        <div className="bg-black bg-opacity-30 flex flex-row justify-center items-center h-48 w-screen">
          <div>
            <span className="text-blue-400 text-8xl sm:text-9xl">
              <FiTriangle />
            </span>
          </div>
          <div className="pb-3 flex flex-row items-end">
            <span className="text-gray-200 text-4xl sm:text-7xl font-medium">React-movies</span>
          </div>
        </div>
      </div>
      <div className='bg-gray-600 bg-opacity-90 flex flex-col'>
        <div className='bg-gray-500 flex flex-row py-4 px-8'>
          <SearchBar ref={searchBarRef} />
        </div>
        <div className='movies-grid'>
          {
            movieData.isLoading
            ? <></>
            : movieData.movies.map((movie: movieData) => <MovieCard key={movie.id} movie={movie} />)
          }
        </div>
      </div>
    </div>
  )
}
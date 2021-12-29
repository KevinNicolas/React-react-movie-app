import { useState, useEffect } from 'react';
import { FiTriangle, FiSearch } from 'react-icons/fi'

import httpClient from '../utils/httpClient'
import useQuery from '../hooks/query';

import '../css/root.css'

export function Root () {

  const [movieData, setMovieData] = useState({
    movies: [] as Record<string, any>[],
    isLoading: true
  })

  const searchQuery: string | null = useQuery().get('search')
  const endpoint = searchQuery ? `/search/movie?query=${searchQuery}` : '/discover/movie'
    
  
  useEffect(() => {
    httpClient.getMovies(endpoint)
      .then((data: any) => {
        const results: Record<string, any>[] = data.results
        setMovieData({ isLoading: false, movies: results })
        // console.log('reuslt', results[0]);
      })
      .catch((err: any) => { console.error('Error:', err); throw err })
  }, [searchQuery])

  return (
    <div className="root-container">
      {/* Main view */}
      <div className="w-screen h-screen flex justify-center items-center">
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
      <div className='py-24'>
        {/* Content... */}
      </div>
    </div>
  )
}
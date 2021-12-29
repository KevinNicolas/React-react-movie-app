import httpClient from '../utils/httpClient'
import useQuery from '../hooks/query';

export function Movies () {
  
  const searchQuery: string | null = useQuery().get('search')
  const endpoint = searchQuery ? `/search/movie?query=${searchQuery}` : '/discover/movie'

  httpClient.getMovies(endpoint)
    .then((data: any) => { console.log('DATA:',data.results) })
    .catch((err: any) => { console.error('Error:', err); return false })

  return (
    <div>
      <span>Holamundo</span>
    </div>
  )
}
interface movieData {
  id: number,
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

interface detailedMovieData extends movieData {
  budget: number,
  genres: Array<{ id: number, name: string }>
  homepage: string,
  imdb_id: string,
  production_companies: Array<{
    id: number,
    logo_path: string,
    name: string,
    origin_conutry: string
  }>,
  production_countries: Array<{ iso_3166_1: string, name: string }>,
  revenue: number,
  runtime: number,
  spoken_languages: Array<{ 
    english_name: string,
    iso_639_1: string,
    name: string
  }>,
  status: string,
  tagline: string,
}
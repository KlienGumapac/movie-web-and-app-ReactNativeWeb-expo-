export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  genre_ids: number[];
  original_language: string;
  runtime?: number;
  media_type?: 'movie' | 'tv';
}

export interface TVShow {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  original_language: string;
  origin_country: string[];
  episode_run_time?: number[];
  media_type?: 'movie' | 'tv';
}

export interface MediaItem extends Movie, TVShow {
  media_type: 'movie' | 'tv';
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface Videos {
  id: number;
  results: Video[];
}

export interface MovieDetails extends Movie {
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: any[];
  production_countries: any[];
  revenue: number;
  runtime: number;
  spoken_languages: any[];
  status: string;
  tagline: string;
  credits?: Credits;
  videos?: Videos;
}

export interface TVDetails extends TVShow {
  created_by: any[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: any;
  next_episode_to_air: any;
  networks: any[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: any[];
  production_countries: any[];
  seasons: any[];
  spoken_languages: any[];
  status: string;
  type: string;
  credits?: Credits;
  videos?: Videos;
}

export interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieCategory {
  id: string;
  title: string;
  movies: Movie[];
  loading?: boolean;
}

export interface TVCategory {
  id: string;
  title: string;
  shows: TVShow[];
  loading?: boolean;
} 
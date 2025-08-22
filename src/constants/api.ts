export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: '4239f2bc1df092d0b45e37429b31c6d6',
  READ_ACCESS_TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjM5ZjJiYzFkZjA5MmQwYjQ1ZTM3NDI5YjMxYzZkNiIsIm5iZiI6MTY1MjE5ODk2Mi4wMTEwMDAyLCJzdWIiOiI2MjdhOGUzMmFiZGVjMDAwOWVlMjNjZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6FlsnvivrhCT_-uII6C3DH8i857IGxXBY6YnMZS9EJo',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
  IMAGE_SIZES: {
    poster: {
      small: 'w185',
      medium: 'w342',
      large: 'w500',
      original: 'original'
    },
    backdrop: {
      small: 'w300',
      medium: 'w780',
      large: 'w1280',
      original: 'original'
    },
    profile: {
      small: 'w45',
      medium: 'w185',
      large: 'h632',
      original: 'original'
    }
  }
} as const;

export const API_ENDPOINTS = {

  TRENDING_MOVIES: '/trending/movie/week',
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
  UPCOMING_MOVIES: '/movie/upcoming',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
  MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
  SIMILAR_MOVIES: (id: number) => `/movie/${id}/similar`,
  
  TRENDING_TV: '/trending/tv/week',
  POPULAR_TV: '/tv/popular',
  TOP_RATED_TV: '/tv/top_rated',
  TV_DETAILS: (id: number) => `/tv/${id}`,
  TV_CREDITS: (id: number) => `/tv/${id}/credits`,
  TV_VIDEOS: (id: number) => `/tv/${id}/videos`,
  SIMILAR_TV: (id: number) => `/tv/${id}/similar`,
  
  SEARCH_MULTI: '/search/multi',
  
  MOVIE_GENRES: '/genre/movie/list',
  TV_GENRES: '/genre/tv/list',
  
  DISCOVER_MOVIES: '/discover/movie',
  DISCOVER_TV: '/discover/tv',
} as const; 
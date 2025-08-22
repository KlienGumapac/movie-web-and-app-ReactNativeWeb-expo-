import { TMDB_CONFIG, API_ENDPOINTS } from '../constants/api';
import { 
  Movie, 
  TVShow, 
  MovieDetails, 
  TVDetails, 
  ApiResponse, 
  SearchResult,
  Genre,
  Credits,
  Videos
} from '../types/movie';

class TMDBService {
  private baseURL = TMDB_CONFIG.BASE_URL;
  private apiKey = TMDB_CONFIG.API_KEY;
  private accessToken = TMDB_CONFIG.READ_ACCESS_TOKEN;

  private async makeRequest<T>(endpoint: string, params: Record<string, any> = {}): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    const queryParams = {
      api_key: this.apiKey,
      ...params,
    };

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('TMDB API request failed:', error);
      throw error;
    }
  }

  // Movie endpoints
  async getTrendingMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    return this.makeRequest<ApiResponse<Movie>>(API_ENDPOINTS.TRENDING_MOVIES, { page });
  }

  async getPopularMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    return this.makeRequest<ApiResponse<Movie>>(API_ENDPOINTS.POPULAR_MOVIES, { page });
  }

  async getTopRatedMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    return this.makeRequest<ApiResponse<Movie>>(API_ENDPOINTS.TOP_RATED_MOVIES, { page });
  }

  async getNowPlayingMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    return this.makeRequest<ApiResponse<Movie>>(API_ENDPOINTS.NOW_PLAYING, { page });
  }

  async getUpcomingMovies(page: number = 1): Promise<ApiResponse<Movie>> {
    return this.makeRequest<ApiResponse<Movie>>(API_ENDPOINTS.UPCOMING_MOVIES, { page });
  }

  async getMovieDetails(id: number): Promise<MovieDetails> {
    return this.makeRequest<MovieDetails>(API_ENDPOINTS.MOVIE_DETAILS(id));
  }

  async getMovieCredits(id: number): Promise<Credits> {
    return this.makeRequest<Credits>(API_ENDPOINTS.MOVIE_CREDITS(id));
  }

  async getMovieVideos(id: number): Promise<Videos> {
    return this.makeRequest<Videos>(API_ENDPOINTS.MOVIE_VIDEOS(id));
  }

  async getCredits(id: number, type: 'movie' | 'tv'): Promise<Credits> {
    if (type === 'movie') {
      return this.getMovieCredits(id);
    } else {
      return this.getTVCredits(id);
    }
  }

  async getVideos(id: number, type: 'movie' | 'tv'): Promise<Videos> {
    if (type === 'movie') {
      return this.getMovieVideos(id);
    } else {
      return this.getTVVideos(id);
    }
  }

  async getSimilarMovies(id: number, page: number = 1): Promise<ApiResponse<Movie>> {
    return this.makeRequest<ApiResponse<Movie>>(API_ENDPOINTS.SIMILAR_MOVIES(id), { page });
  }

  async getTrendingTV(page: number = 1): Promise<ApiResponse<TVShow>> {
    return this.makeRequest<ApiResponse<TVShow>>(API_ENDPOINTS.TRENDING_TV, { page });
  }

  async getPopularTV(page: number = 1): Promise<ApiResponse<TVShow>> {
    return this.makeRequest<ApiResponse<TVShow>>(API_ENDPOINTS.POPULAR_TV, { page });
  }

  async getTopRatedTV(page: number = 1): Promise<ApiResponse<TVShow>> {
    return this.makeRequest<ApiResponse<TVShow>>(API_ENDPOINTS.TOP_RATED_TV, { page });
  }

  async getTVDetails(id: number): Promise<TVDetails> {
    return this.makeRequest<TVDetails>(API_ENDPOINTS.TV_DETAILS(id));
  }

  async getTVCredits(id: number): Promise<Credits> {
    return this.makeRequest<Credits>(API_ENDPOINTS.TV_CREDITS(id));
  }

  async getTVVideos(id: number): Promise<Videos> {
    return this.makeRequest<Videos>(API_ENDPOINTS.TV_VIDEOS(id));
  }

  async getSimilarTV(id: number, page: number = 1): Promise<ApiResponse<TVShow>> {
    return this.makeRequest<ApiResponse<TVShow>>(API_ENDPOINTS.SIMILAR_TV(id), { page });
  }

  async searchMulti(query: string, page: number = 1): Promise<SearchResult> {
    return this.makeRequest<SearchResult>(API_ENDPOINTS.SEARCH_MULTI, { 
      query, 
      page,
      include_adult: false 
    });
  }

  async getMovieGenres(): Promise<{ genres: Genre[] }> {
    return this.makeRequest<{ genres: Genre[] }>(API_ENDPOINTS.MOVIE_GENRES);
  }

  async getTVGenres(): Promise<{ genres: Genre[] }> {
    return this.makeRequest<{ genres: Genre[] }>(API_ENDPOINTS.TV_GENRES);
  }

  async discoverMovies(params: {
    page?: number;
    genre?: number;
    sort_by?: string;
    year?: number;
  } = {}): Promise<ApiResponse<Movie>> {
    return this.makeRequest<ApiResponse<Movie>>(API_ENDPOINTS.DISCOVER_MOVIES, params);
  }

  async discoverTV(params: {
    page?: number;
    genre?: number;
    sort_by?: string;
    year?: number;
  } = {}): Promise<ApiResponse<TVShow>> {
    return this.makeRequest<ApiResponse<TVShow>>(API_ENDPOINTS.DISCOVER_TV, params);
  }
}

export const tmdbService = new TMDBService(); 
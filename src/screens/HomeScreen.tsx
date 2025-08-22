import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  RefreshControl,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Movie, TVShow } from '../types/movie';
import { tmdbService } from '../services/tmdbService';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { MovieRow } from '../components/MovieRow';
import { COLORS } from '../constants/colors';

interface HomeScreenProps {
  onLogout: () => void;
  onMoviePress: (movie: Movie | TVShow) => void;
  isLoggingOut?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout, onMoviePress, isLoggingOut = false }) => {
  const [featuredMovies, setFeaturedMovies] = useState<(Movie | TVShow)[]>([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [trendingTV, setTrendingTV] = useState<TVShow[]>([]);
  const [popularTV, setPopularTV] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [
        trendingMoviesData,
        popularMoviesData,
        topRatedMoviesData,
        nowPlayingData,
        upcomingData,
        trendingTVData,
        popularTVData,
      ] = await Promise.all([
        tmdbService.getTrendingMovies(),
        tmdbService.getPopularMovies(),
        tmdbService.getTopRatedMovies(),
        tmdbService.getNowPlayingMovies(),
        tmdbService.getUpcomingMovies(),
        tmdbService.getTrendingTV(),
        tmdbService.getPopularTV(),
      ]);

      setTrendingMovies(trendingMoviesData.results);
      setPopularMovies(popularMoviesData.results);
      setTopRatedMovies(topRatedMoviesData.results);
      setNowPlayingMovies(nowPlayingData.results);
      setUpcomingMovies(upcomingData.results);
      setTrendingTV(trendingTVData.results);
      setPopularTV(popularTVData.results);

      const featured: (Movie | TVShow)[] = [
        ...trendingMoviesData.results.slice(0, 3),
        ...popularMoviesData.results.slice(0, 2),
        ...topRatedMoviesData.results.slice(0, 2),
        ...trendingTVData.results.slice(0, 1),
      ];
      
      setFeaturedMovies(featured);
      setCurrentFeaturedIndex(0);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to load movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (featuredMovies.length > 1) {
      rotationIntervalRef.current = setInterval(() => {
        setCurrentFeaturedIndex((prevIndex) => 
          (prevIndex + 1) % featuredMovies.length
        );
      }, 5000); 
    }

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, [featuredMovies.length]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleMoviePress = (movie: Movie | TVShow) => {
    onMoviePress(movie);
  };

  const handleSearch = (query: string) => {
    Alert.alert(
      'Search',
      `Search functionality for "${query}" will be implemented in the next phase.`,
      [{ text: 'OK' }]
    );
  };

  const currentFeatured = featuredMovies[currentFeaturedIndex];

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Header onLogout={onLogout} isLoggingOut={isLoggingOut} />
        <View style={styles.loadingContent}>
      
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header onSearch={handleSearch} onLogout={onLogout} isLoggingOut={isLoggingOut} />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
    
        {currentFeatured && (
          <HeroSection
            featured={currentFeatured}
            onPress={handleMoviePress}
          />
        )}
 
        <View style={styles.content}>
          <MovieRow
            title="Trending Now"
            movies={trendingMovies}
            onMoviePress={handleMoviePress}
            size="large"
          />

          <MovieRow
            title="Popular Movies"
            movies={popularMovies}
            onMoviePress={handleMoviePress}
          />

          <MovieRow
            title="Top Rated Movies"
            movies={topRatedMovies}
            onMoviePress={handleMoviePress}
          />

          <MovieRow
            title="Now Playing"
            movies={nowPlayingMovies}
            onMoviePress={handleMoviePress}
          />

          <MovieRow
            title="Coming Soon"
            movies={upcomingMovies}
            onMoviePress={handleMoviePress}
          />

          <MovieRow
            title="Trending TV Shows"
            movies={trendingTV}
            onMoviePress={handleMoviePress}
          />

          <MovieRow
            title="Popular TV Shows"
            movies={popularTV}
            onMoviePress={handleMoviePress}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'web' ? 32 : 100, // Extra padding for mobile
  },
  content: {
    paddingBottom: 32,
  },
}); 
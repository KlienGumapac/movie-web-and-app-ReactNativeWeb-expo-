import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Movie, TVShow } from '../types/movie';
import { MovieCard } from './MovieCard';
import { COLORS } from '../constants/colors';

interface MovieRowProps {
  title: string;
  movies: (Movie | TVShow)[];
  onMoviePress: (movie: Movie | TVShow) => void;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  movies,
  onMoviePress,
  loading = false,
  size = 'medium',
}) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </View>
    );
  }

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            item={movie}
            onPress={onMoviePress}
            size={size}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Platform.OS === 'web' ? 32 : 24,
    marginTop: Platform.OS === 'web' ? 0 : 8,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 20 : 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: Platform.OS === 'web' ? 16 : 12,
    paddingHorizontal: Platform.OS === 'web' ? 16 : 12,
  },
  scrollContent: {
    paddingHorizontal: Platform.OS === 'web' ? 16 : 12,
  },
  loadingContainer: {
    height: 225,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 
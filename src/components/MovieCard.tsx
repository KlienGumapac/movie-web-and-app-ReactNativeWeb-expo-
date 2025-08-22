import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Movie, TVShow } from '../types/movie';
import { getPosterUrl, formatRating, formatYear } from '../utils/imageUtils';
import { COLORS } from '../constants/colors';

interface MovieCardProps {
  item: Movie | TVShow;
  onPress: (item: Movie | TVShow) => void;
  size?: 'small' | 'medium' | 'large';
}

const { width } = Dimensions.get('window');

export const MovieCard: React.FC<MovieCardProps> = ({ 
  item, 
  onPress, 
  size = 'medium' 
}) => {
  const isTV = 'name' in item;
  const title = isTV ? item.name : item.title;
  const releaseDate = isTV ? item.first_air_date : item.release_date;
  
  const getCardSize = () => {
    switch (size) {
      case 'small':
        return { width: 120, height: 180 };
      case 'large':
        return { width: 200, height: 300 };
      default:
        return { width: 150, height: 225 };
    }
  };

  const cardSize = getCardSize();

  return (
    <TouchableOpacity
      style={[styles.container, { width: cardSize.width }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={[styles.imageContainer, { height: cardSize.height }]}>
        <Image
          source={{ uri: getPosterUrl(item.poster_path, 'medium') }}
          style={styles.image}
          resizeMode="cover"
        />
        
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>
            {formatRating(item.vote_average)}
          </Text>
        </View>

        <View style={styles.overlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayTitle} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.overlayYear}>
              {formatYear(releaseDate)}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.year}>
          {formatYear(releaseDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.backgroundLight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ratingText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '600',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    opacity: 0,
   
  },
  overlayContent: {
    padding: 12,
  },
  overlayTitle: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  overlayYear: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  titleContainer: {
    marginTop: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  year: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
}); 
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Movie, TVShow } from '../types/movie';
import { getBackdropUrl, formatRating, formatYear, truncateText } from '../utils/imageUtils';
import { COLORS } from '../constants/colors';

interface HeroSectionProps {
  featured: Movie | TVShow;
  onPress: (item: Movie | TVShow) => void;
}

const { width, height } = Dimensions.get('window');

export const HeroSection: React.FC<HeroSectionProps> = ({ featured, onPress }) => {
  const isTV = 'name' in featured;
  const title = isTV ? featured.name : featured.title;
  const releaseDate = isTV ? featured.first_air_date : featured.release_date;

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: getBackdropUrl(featured.backdrop_path, 'large') }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <View style={styles.leftContent}>
                <Text style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
                <View style={styles.metadata}>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                      {formatRating(featured.vote_average)} Rating
                    </Text>
                  </View>
                  <Text style={styles.year}>{formatYear(releaseDate)}</Text>
                  <Text style={styles.type}>{isTV ? 'TV Series' : 'Movie'}</Text>
                </View>
                <Text style={styles.overview} numberOfLines={3}>
                  {truncateText(featured.overview, 200)}
                </Text>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => onPress(featured)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.playButtonText}>▶ Play Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.wishlistButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.wishlistButtonText}>+ My Wishlist</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rightContent}>
                <View style={styles.ratingBadge}>
                  <Text style={styles.ratingBadgeText}>TOP 10</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.mobileContainer}>
      <ImageBackground
        source={{ uri: getBackdropUrl(featured.backdrop_path, 'large') }}
        style={styles.mobileBackgroundImage}
        resizeMode="cover"
      >
        <View style={styles.mobileOverlay}>
          <View style={styles.mobileContent}>
            <Text style={styles.mobileTitle} numberOfLines={2}>
              {title}
            </Text>
            
            <View style={styles.mobileMetadata}>
              <View style={styles.mobileRatingContainer}>
                <Text style={styles.mobileRatingText}>
                  {formatRating(featured.vote_average)} Rating
                </Text>
              </View>
              <Text style={styles.mobileYear}>{formatYear(releaseDate)}</Text>
              <Text style={styles.mobileType}>{isTV ? 'TV Series' : 'Movie'}</Text>
            </View>
            
            <Text style={styles.mobileOverview} numberOfLines={2}>
              {truncateText(featured.overview, 120)}
            </Text>
            
            <View style={styles.mobileActionButtons}>
              <TouchableOpacity
                style={styles.mobilePlayButton}
                onPress={() => onPress(featured)}
                activeOpacity={0.8}
              >
                <Text style={styles.mobilePlayButtonText}>▶ Play Now</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.mobileWishlistButton}
                activeOpacity={0.8}
              >
                <Text style={styles.mobileWishlistButtonText}>+ My Wishlist</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    height: height * 0.6,
    marginBottom: 24,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  leftContent: {
    flex: 1,
    marginRight: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: 16,
    lineHeight: 42,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  ratingContainer: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '600',
  },
  year: {
    color: COLORS.background,
    fontSize: 14,
  },
  type: {
    color: COLORS.background,
    fontSize: 14,
  },
  overview: {
    color: COLORS.background,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    opacity: 0.9,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 44,
  },
  playButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  wishlistButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
    minHeight: 44,
  },
  wishlistButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  rightContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 24,
  },
  ratingBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    transform: [{ rotate: '90deg' }],
  },
  ratingBadgeText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },

  mobileContainer: {
    height: height * 0.5,
    marginBottom: 24,
  },
  mobileBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  mobileOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  mobileContent: {
    width: '100%',
  },
  mobileTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 30,
  },
  mobileMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 6,
  },
  mobileRatingContainer: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
  },
  mobileRatingText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  mobileYear: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  mobileType: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  mobileOverview: {
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
    opacity: 0.9,
  },
  mobileActionButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  mobilePlayButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  mobilePlayButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  mobileWishlistButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  mobileWishlistButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 
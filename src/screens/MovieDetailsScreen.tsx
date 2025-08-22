import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Dimensions,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  Linking,
} from 'react-native';
import { Movie, TVShow, Credits, Videos } from '../types/movie';
import { tmdbService } from '../services/tmdbService';
import { getBackdropUrl, getPosterUrl, getProfileUrl, formatRating, formatYear, truncateText } from '../utils/imageUtils';
import { COLORS } from '../constants/colors';

interface MovieDetailsScreenProps {
  movie: Movie | TVShow;
  onBack: () => void;
}

const { width, height } = Dimensions.get('window');

export const MovieDetailsScreen: React.FC<MovieDetailsScreenProps> = ({ movie, onBack }) => {
  const [credits, setCredits] = useState<Credits | null>(null);
  const [videos, setVideos] = useState<Videos | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const isTV = 'name' in movie;
  const title = isTV ? movie.name : movie.title;
  const releaseDate = isTV ? movie.first_air_date : movie.release_date;
  const runtime = isTV ? movie.episode_run_time?.[0] : movie.runtime;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        
        const [creditsData, videosData] = await Promise.all([
          tmdbService.getCredits(movie.id, isTV ? 'tv' : 'movie'),
          tmdbService.getVideos(movie.id, isTV ? 'tv' : 'movie'),
        ]);

        console.log('Credits data:', creditsData);
        console.log('Cast with profile paths:', creditsData.cast?.filter(p => p.profile_path).slice(0, 3));
        console.log('Crew with profile paths:', creditsData.crew?.filter(p => p.profile_path).slice(0, 3));

        setCredits(creditsData);
        setVideos(videosData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        Alert.alert('Error', 'Failed to load movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie.id, isTV]);

  const handlePlayPress = () => {
 
    const trailerVideo = videos?.results?.find(video => 
      video.site === 'YouTube' && 
      (video.type === 'Trailer' || video.type === 'Teaser')
    );
    
    if (trailerVideo) {
      if (Platform.OS === 'web') {

        setSelectedVideo(trailerVideo);
        setIsVideoModalVisible(true);
      } else {
    
        const youtubeUrl = `https://www.youtube.com/watch?v=${trailerVideo.key}`;
        Linking.openURL(youtubeUrl).catch(err => {
          console.error('Error opening YouTube:', err);
          Alert.alert('Error', 'Could not open YouTube video.');
        });
      }
    } else {
      Alert.alert('No Trailer Available', 'Sorry, no trailer is available for this movie.');
    }
  };

  const handleVideoPress = (video: any) => {
    if (Platform.OS === 'web') {

      setSelectedVideo(video);
      setIsVideoModalVisible(true);
    } else {
     
      const youtubeUrl = `https://www.youtube.com/watch?v=${video.key}`;
      Linking.openURL(youtubeUrl).catch(err => {
        console.error('Error opening YouTube:', err);
        Alert.alert('Error', 'Could not open YouTube video.');
      });
    }
  };

  const closeVideoModal = () => {
    setIsVideoModalVisible(false);
    setSelectedVideo(null);
  };

  const handleAddToList = () => {
    Alert.alert('Added to List', `${title} has been added to your watchlist!`);
  };

  const handleShare = () => {
    Alert.alert('Share', 'Share functionality will be implemented in the next phase.');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading movie details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
       
        <ImageBackground
          source={{ uri: getBackdropUrl(movie.backdrop_path, 'large') }}
          style={styles.heroBackground}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
          
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareButtonText}>📤</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroContent}>
              <View style={styles.posterContainer}>
                <ImageBackground
                  source={{ uri: getPosterUrl(movie.poster_path, 'large') }}
                  style={styles.poster}
                  resizeMode="cover"
                />
              </View>
              
              <View style={styles.heroInfo}>
                <Text style={styles.title} numberOfLines={2}>
                  {title}
                </Text>
                
                <View style={styles.metadata}>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                      {formatRating(movie.vote_average)} Rating
                    </Text>
                  </View>
                  <Text style={styles.year}>{formatYear(releaseDate)}</Text>
                  <Text style={styles.type}>{isTV ? 'TV Series' : 'Movie'}</Text>
                  {runtime && <Text style={styles.runtime}>{runtime} min</Text>}
                </View>

                <Text style={styles.overview} numberOfLines={3}>
                  {movie.overview}
                </Text>

                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
                    <Text style={styles.playButtonText}>▶ Play Now</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.addToListButton} onPress={handleAddToList}>
                    <Text style={styles.addToListText}>+ Add to List</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
         
          {credits && credits.cast && credits.cast.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Cast</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {credits.cast.slice(0, 10).map((person, index) => (
                  <View key={`cast-${person.id}-${index}`} style={styles.castItem}>
                    <View style={styles.castImage}>
                      {person.profile_path ? (
                        <Image
                          source={{ uri: getProfileUrl(person.profile_path, 'medium') }}
                          style={styles.castImageThumbnail}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.castImagePlaceholder}>
                          <Text style={styles.castImageText}>
                            {person.name.charAt(0)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.castName} numberOfLines={2}>
                      {person.name}
                    </Text>
                    <Text style={styles.castCharacter} numberOfLines={1}>
                      {person.character}
                    </Text>
                  </View>
                ))}

              </ScrollView>
            </View>
          )}

          {credits && credits.crew && credits.crew.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Crew</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {credits.crew.slice(0, 10).map((person, index) => (
                  <View key={`crew-${person.id}-${index}`} style={styles.castItem}>
                    <View style={styles.castImage}>
                      {person.profile_path ? (
                        <Image
                          source={{ uri: getProfileUrl(person.profile_path, 'medium') }}
                          style={styles.castImageThumbnail}
                          resizeMode="cover"
                        />
                      ) : (
                        <View style={styles.castImagePlaceholder}>
                          <Text style={styles.castImageText}>
                            {person.name.charAt(0)}
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.castName} numberOfLines={2}>
                      {person.name}
                    </Text>
                    <Text style={styles.castCharacter} numberOfLines={1}>
                      {person.job}
                    </Text>
                  </View>
                ))}

              </ScrollView>
            </View>
          )}

          {videos && videos.results && videos.results.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Videos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {videos.results.slice(0, 5).map((video) => (
                  <TouchableOpacity 
                    key={video.id} 
                    style={styles.videoItem}
                    onPress={() => handleVideoPress(video)}
                  >
                    <View style={styles.videoThumbnail}>
                      {video.site === 'YouTube' && video.key ? (
                        <Image
                          source={{ uri: `https://img.youtube.com/vi/${video.key}/mqdefault.jpg` }}
                          style={styles.videoThumbnailImage}
                        />
                      ) : (
                        <View style={styles.videoPlaceholder}>
                          <Text style={styles.playIcon}>▶</Text>
                        </View>
                      )}
                      <View style={styles.playIconOverlay}>
                        <Text style={styles.playIconText}>▶</Text>
                      </View>
                    </View>
                    <Text style={styles.videoTitle} numberOfLines={2}>
                      {video.name}
                    </Text>
                    <Text style={styles.videoType}>
                      {video.type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Release Date</Text>
                <Text style={styles.detailValue}>{formatYear(releaseDate)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Rating</Text>
                <Text style={styles.detailValue}>{formatRating(movie.vote_average)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Type</Text>
                <Text style={styles.detailValue}>{isTV ? 'TV Series' : 'Movie'}</Text>
              </View>
              {runtime && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Runtime</Text>
                  <Text style={styles.detailValue}>{runtime} min</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {Platform.OS === 'web' && (
        <Modal
          visible={isVideoModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeVideoModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedVideo && (
                <View style={styles.videoContainer}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1&rel=0&showinfo=0&modestbranding=1&playsinline=1`}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      borderRadius: '12px',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </View>
              )}
              <TouchableOpacity style={styles.closeButton} onPress={closeVideoModal}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    marginTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  heroBackground: {
    height: Platform.OS === 'web' ? height * 0.7 : height * 0.6,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Platform.OS === 'web' ? 48 : 16,
    paddingTop: Platform.OS === 'web' ? 24 : 8,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: Platform.OS === 'web' ? 48 : 40,
    height: Platform.OS === 'web' ? 48 : 40,
    borderRadius: Platform.OS === 'web' ? 24 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonText: {
    color: COLORS.background,
    fontSize: Platform.OS === 'web' ? 24 : 20,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: Platform.OS === 'web' ? 48 : 40,
    height: Platform.OS === 'web' ? 48 : 40,
    borderRadius: Platform.OS === 'web' ? 24 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  shareButtonText: {
    color: COLORS.background,
    fontSize: Platform.OS === 'web' ? 20 : 16,
  },
  heroContent: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    paddingHorizontal: Platform.OS === 'web' ? 48 : 16,
    paddingBottom: Platform.OS === 'web' ? 48 : 24,
    justifyContent: Platform.OS === 'web' ? 'flex-start' : 'flex-end',
    alignItems: Platform.OS === 'web' ? 'flex-end' : 'stretch',
  },
  posterContainer: {
    marginRight: Platform.OS === 'web' ? 48 : 0,
    marginLeft: Platform.OS === 'web' ? 0 : 0,
    marginBottom: Platform.OS === 'web' ? 0 : 16,
    alignSelf: Platform.OS === 'web' ? 'flex-end' : 'center',
  },
  poster: {
    width: Platform.OS === 'web' ? 280 : 150,
    height: Platform.OS === 'web' ? 420 : 225,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  heroInfo: {
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: Platform.OS === 'web' ? 600 : '100%',
    marginRight: Platform.OS === 'web' ? 0 : 0,
    alignSelf: Platform.OS === 'web' ? 'flex-end' : 'stretch',
  },
  title: {
    fontSize: Platform.OS === 'web' ? 48 : 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Platform.OS === 'web' ? 20 : 12,
    lineHeight: Platform.OS === 'web' ? 56 : 28,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Platform.OS === 'web' ? 20 : 12,
    flexWrap: 'wrap',
    gap: Platform.OS === 'web' ? 12 : 8,
  },
  ratingContainer: {
    backgroundColor: COLORS.success,
    paddingHorizontal: Platform.OS === 'web' ? 12 : 8,
    paddingVertical: Platform.OS === 'web' ? 6 : 4,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 14 : 12,
    fontWeight: '600',
  },
  year: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  type: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  runtime: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  overview: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 18 : 14,
    lineHeight: Platform.OS === 'web' ? 28 : 20,
    marginBottom: Platform.OS === 'web' ? 32 : 16,
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  actionButtons: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: Platform.OS === 'web' ? 20 : 12,
  },
  playButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: Platform.OS === 'web' ? 32 : 24,
    paddingVertical: Platform.OS === 'web' ? 16 : 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: Platform.OS === 'web' ? 160 : 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: '600',
  },
  addToListButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: Platform.OS === 'web' ? 32 : 24,
    paddingVertical: Platform.OS === 'web' ? 16 : 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    minWidth: Platform.OS === 'web' ? 160 : 120,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  addToListText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: '600',
  },
  content: {
    padding: Platform.OS === 'web' ? 48 : 16,
    backgroundColor: COLORS.backgroundDark,
  },
  section: {
    marginBottom: Platform.OS === 'web' ? 48 : 32,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 28 : 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Platform.OS === 'web' ? 24 : 16,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  castItem: {
    width: Platform.OS === 'web' ? 140 : 100,
    marginRight: Platform.OS === 'web' ? 24 : 16,
    alignItems: 'center',
  },
  castImage: {
    width: Platform.OS === 'web' ? 80 : 60,
    height: Platform.OS === 'web' ? 80 : 60,
    borderRadius: Platform.OS === 'web' ? 40 : 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'web' ? 12 : 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  castImageThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: Platform.OS === 'web' ? 40 : 30,
  },
  castImagePlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: Platform.OS === 'web' ? 40 : 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  castImageText: {
    color: COLORS.background,
    fontSize: Platform.OS === 'web' ? 28 : 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  castName: {
    color: COLORS.textPrimary,
    fontSize: Platform.OS === 'web' ? 14 : 12,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Platform.OS === 'web' ? 6 : 4,
    lineHeight: Platform.OS === 'web' ? 18 : 14,
  },
  castCharacter: {
    color: COLORS.textSecondary,
    fontSize: Platform.OS === 'web' ? 12 : 10,
    textAlign: 'center',
    lineHeight: Platform.OS === 'web' ? 16 : 12,
  },
  videoItem: {
    width: Platform.OS === 'web' ? 200 : 150,
    marginRight: Platform.OS === 'web' ? 24 : 16,
  },
  videoThumbnail: {
    width: Platform.OS === 'web' ? 200 : 150,
    height: Platform.OS === 'web' ? 112 : 84,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'web' ? 12 : 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  videoThumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    color: COLORS.primary,
    fontSize: Platform.OS === 'web' ? 32 : 24,
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
  },
  playIconText: {
    color: COLORS.background,
    fontSize: Platform.OS === 'web' ? 32 : 24,
    fontWeight: 'bold',
  },
  videoTitle: {
    color: COLORS.textPrimary,
    fontSize: Platform.OS === 'web' ? 14 : 12,
    fontWeight: '600',
    marginBottom: Platform.OS === 'web' ? 6 : 4,
    lineHeight: Platform.OS === 'web' ? 18 : 14,
  },
  videoType: {
    color: COLORS.textSecondary,
    fontSize: Platform.OS === 'web' ? 12 : 10,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Platform.OS === 'web' ? 32 : 16,
  },
  detailItem: {
    minWidth: Platform.OS === 'web' ? '22%' : '45%',
  },
  detailLabel: {
    color: COLORS.textSecondary,
    fontSize: Platform.OS === 'web' ? 14 : 12,
    marginBottom: Platform.OS === 'web' ? 8 : 4,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    color: COLORS.textPrimary,
    fontSize: Platform.OS === 'web' ? 16 : 14,
    fontWeight: '600',
    lineHeight: Platform.OS === 'web' ? 22 : 18,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: COLORS.backgroundDark,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    color: COLORS.background,
    fontSize: 24,
    fontWeight: 'bold',
  },
  webView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
}); 
import { TMDB_CONFIG } from '../constants/api';

export const getImageUrl = (
  path: string | null, 
  size: 'small' | 'medium' | 'large' | 'original' = 'medium',
  type: 'poster' | 'backdrop' | 'profile' = 'poster'
): string => {
  if (!path) {
    return getPlaceholderImage(type);
  }
  
  const imageSize = TMDB_CONFIG.IMAGE_SIZES[type][size];
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${imageSize}${path}`;
};

export const getPosterUrl = (
  path: string | null, 
  size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): string => {
  return getImageUrl(path, size, 'poster');
};

export const getBackdropUrl = (
  path: string | null, 
  size: 'small' | 'medium' | 'large' | 'original' = 'large'
): string => {
  return getImageUrl(path, size, 'backdrop');
};

export const getProfileUrl = (
  path: string | null, 
  size: 'small' | 'medium' | 'large' | 'original' = 'medium'
): string => {
  return getImageUrl(path, size, 'profile');
};

export const getPlaceholderImage = (type: 'poster' | 'backdrop' | 'profile' = 'poster'): string => {
  const baseUrl = 'https://via.placeholder.com';
  
  switch (type) {
    case 'poster':
      return `${baseUrl}/342x513/666666/FFFFFF?text=No+Image`;
    case 'backdrop':
      return `${baseUrl}/1280x720/666666/FFFFFF?text=No+Image`;
    case 'profile':
      return `${baseUrl}/185x278/666666/FFFFFF?text=No+Image`;
    default:
      return `${baseUrl}/342x513/666666/FFFFFF?text=No+Image`;
  }
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatYear = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};

export const formatRuntime = (minutes: number): string => {
  if (!minutes) return '';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}; 
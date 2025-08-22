import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { MovieDetailsScreen } from './src/screens/MovieDetailsScreen';
import { Movie, TVShow } from './src/types/movie';
import { COLORS } from './src/constants/colors';

type Screen = 'login' | 'signup' | 'home' | 'movieDetails';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | TVShow | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLoginSuccess = () => {
    console.log('App: handleLoginSuccess called');
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleSignUp = () => {
    console.log('App: handleSignUp called');
    setCurrentScreen('signup');
  };

  const handleBackToLogin = () => {
    console.log('App: handleBackToLogin called');
    setCurrentScreen('login');
  };

  const handleSignUpSuccess = () => {
    console.log('App: handleSignUpSuccess called');
    setCurrentScreen('login');
  };

  const handleLogout = async () => {
    console.log('App: handleLogout called');
    setIsLoggingOut(true);
    
    setTimeout(() => {
      setIsAuthenticated(false);
      setCurrentScreen('login');
      setIsLoggingOut(false);
    }, 1500); 
  };

  const handleMoviePress = (movie: Movie | TVShow) => {
    console.log('App: handleMoviePress called', movie);
    setSelectedMovie(movie);
    setCurrentScreen('movieDetails');
  };

  const handleBackFromDetails = () => {
    console.log('App: handleBackFromDetails called');
    setCurrentScreen('home');
    setSelectedMovie(null);
  };

  console.log('App: Current screen:', currentScreen, 'isAuthenticated:', isAuthenticated);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={handleLoginSuccess}
            onSignUp={handleSignUp}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onSignUpSuccess={handleSignUpSuccess}
            onBackToLogin={handleBackToLogin}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onLogout={handleLogout}
            onMoviePress={handleMoviePress}
            isLoggingOut={isLoggingOut}
          />
        );
      case 'movieDetails':
        return selectedMovie ? (
          <MovieDetailsScreen
            movie={selectedMovie}
            onBack={handleBackFromDetails}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <>
      <StatusBar style="light" />
      {renderScreen()}
      
      {isLoggingOut && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingModal}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Logging out...</Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingModal: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.textPrimary,
    fontSize: 16,
  },
});

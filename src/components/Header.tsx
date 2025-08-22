import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Platform,
  Dimensions,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  isLoggingOut?: boolean;
}

const { width } = Dimensions.get('window');

export const Header: React.FC<HeaderProps> = ({ onSearch, onLogout, isLoggingOut = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (onSearch && text.length > 2) {
      onSearch(text);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemPress = (itemId: string) => {
    console.log(`${itemId} pressed`);
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'tv-shows', label: 'TV Shows', icon: '📺' },
    { id: 'movies', label: 'Movies', icon: '🎬' },
    { id: 'series', label: 'Series', icon: '📺' },
    { id: 'upcoming', label: 'Upcoming', icon: '📅' },
  ];

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.content}>
         
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>M</Text>
              </View>
              <Text style={styles.logoLabel}>Movies</Text>
            </View>

            {Platform.OS === 'web' && (
              <View style={styles.navigationWrapper}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.navigationContainer}
                >
                  {navigationItems.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.navItem}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.navText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.rightSection}>
           
              <View style={styles.searchContainer}>
                <TextInput
                  style={[
                    styles.searchInput,
                    isSearchFocused && styles.searchInputFocused
                  ]}
                  placeholder="Search movies & TV shows..."
                  placeholderTextColor={COLORS.textSecondary}
                  value={searchQuery}
                  onChangeText={handleSearch}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              </View>

              {Platform.OS === 'web' && (
                <TouchableOpacity style={styles.languageSelector} activeOpacity={0.7}>
                  <Text style={styles.languageText}>🇺🇸 English</Text>
                </TouchableOpacity>
              )}

              <View style={styles.userActions}>
                {Platform.OS === 'web' ? (
                  <>
                    <TouchableOpacity style={styles.signUpButton} activeOpacity={0.7}>
                      <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.signInButton} activeOpacity={0.7}>
                      <Text style={styles.signInText}>Sign In</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity 
                    style={styles.mobileMenuButton} 
                    onPress={handleMenuPress}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.mobileMenuText}>☰</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity 
                  style={[styles.logoutButton, isLoggingOut && styles.logoutButtonDisabled]} 
                  onPress={handleLogout}
                  activeOpacity={0.7}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <ActivityIndicator color={COLORS.background} />
                  ) : (
                    <Text style={styles.logoutText}>Logout</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {Platform.OS !== 'web' && isMenuOpen && (
        <View style={styles.dropdownMenu}>
         
          <View style={styles.dropdownTail} />
          
          {navigationItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.dropdownItem}
              onPress={() => handleMenuItemPress(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.dropdownItemIcon}>{item.icon}</Text>
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.backgroundDark,
  },
  container: {
    backgroundColor: COLORS.backgroundDark,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: Platform.OS === 'web' ? 12 : 8,
    position: 'relative',
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Platform.OS === 'web' ? 24 : 16,
    minHeight: 50,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Platform.OS === 'web' ? 32 : 16,
    flexShrink: 0,
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoLabel: {
    color: COLORS.textPrimary,
    fontSize: Platform.OS === 'web' ? 18 : 16,
    fontWeight: 'bold',
  },
  navigationWrapper: {
    flex: 1,
    marginRight: 24,
  },
  navigationContainer: {
    flex: 1,
  },
  navItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  navText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
    gap: 12,
  },
  searchContainer: {
    minWidth: Platform.OS === 'web' ? 200 : 120,
    maxWidth: Platform.OS === 'web' ? 300 : 200,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 36,
  },
  searchInputFocused: {
    borderColor: COLORS.primary,
  },
  languageSelector: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.backgroundLight,
    flexShrink: 0,
  },
  languageText: {
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  signUpButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  signUpText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  signInText: {
    color: COLORS.background,
    fontSize: 14,
    fontWeight: '600',
  },
  mobileMenuButton: {
    backgroundColor: COLORS.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileMenuText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  logoutButtonDisabled: {
    opacity: 0.7,
  },
  logoutText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: '600',
  },
 
  dropdownMenu: {
    position: 'absolute',
    top: Platform.OS === 'web' ? '100%' : 110, 
    right: 55, 
    width: 200, 
    backgroundColor: COLORS.backgroundDark,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 15,
    zIndex: 9999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  dropdownItemIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  dropdownItemText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownTail: {
    position: 'absolute',
    top: -8,
    right: 24, 
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderLeftColor: 'transparent',
    borderRightWidth: 8,
    borderRightColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: COLORS.backgroundDark,
  },
}); 
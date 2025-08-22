# Movies App

A modern, responsive React Native web application built with Expo, TypeScript, and React Native Web. This app provides a seamless movie browsing experience with TMDB integration.

## 🚀 Features

### Current Features

- **Professional Login System**: Clean, modern login interface with form validation
- **Sign Up System**: Complete registration flow with comprehensive validation
- **Responsive Design**: Works seamlessly on web and mobile platforms
- **TypeScript Support**: Full type safety and better developer experience
- **Modern UI Components**: Reusable, accessible components with consistent styling
- **Form Validation**: Real-time validation with user-friendly error messages
- **TMDB Integration**: Real movie data from The Movie Database API
- **Movie Library**: Comprehensive movie browsing with multiple categories
- **Hero Section**: Featured movie showcase with backdrop images
- **Horizontal Scrolling**: Smooth movie row navigation
- **Search Functionality**: Search bar in header (ready for implementation)
- **Pull-to-Refresh**: Refresh movie data with pull gesture

### Movie Categories Available

- **Trending Now**: Currently trending movies and TV shows
- **Popular Movies**: Most popular movies
- **Top Rated Movies**: Highest rated movies
- **Now Playing**: Movies currently in theaters
- **Coming Soon**: Upcoming movie releases
- **Trending TV Shows**: Popular TV series
- **Popular TV Shows**: Most watched TV shows

### Coming Soon

- Movie details page with cast and crew
- Search results page
- Favorites system
- Genre filtering
- Infinite scroll for movie lists
- Movie trailers and videos
- User profiles and preferences

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Web Support**: React Native Web
- **API**: TMDB (The Movie Database)
- **Styling**: React Native StyleSheet with custom design system
- **State Management**: React hooks with local state
- **Navigation**: Custom screen management

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CustomButton.tsx
│   ├── CustomTextInput.tsx
│   ├── MovieCard.tsx
│   ├── MovieRow.tsx
│   ├── HeroSection.tsx
│   └── Header.tsx
├── screens/            # Screen components
│   ├── LoginScreen.tsx
│   ├── SignUpScreen.tsx
│   └── HomeScreen.tsx
├── services/           # API services
│   └── tmdbService.ts
├── types/              # TypeScript type definitions
│   ├── auth.ts
│   └── movie.ts
├── utils/              # Utility functions
│   ├── validation.ts
│   └── imageUtils.ts
└── constants/          # App constants
    ├── colors.ts
    └── api.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- TMDB API credentials

### TMDB API Setup

1. **Get TMDB API Credentials**

   - Visit [TMDB](https://www.themoviedb.org/settings/api)
   - Create an account and request API access
   - Get your API Key and Read Access Token

2. **Configure API Credentials**

   ```bash
   # Copy the template file
   cp src/constants/api.template.ts src/constants/api.ts

   # Edit the file and add your credentials
   # Replace YOUR_TMDB_API_KEY_HERE with your actual API key
   # Replace YOUR_TMDB_READ_ACCESS_TOKEN_HERE with your actual access token
   ```

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movies
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API (see TMDB API Setup above)**

4. **Start the development server**

   ```bash
   # For web
   npm run web

   # For mobile (iOS)
   npm run ios

   # For mobile (Android)
   npm run android
   ```

## 🔐 Authentication

The app currently includes a demo login system:

- **Email**: Any valid email format (e.g., `user@example.com`)
- **Password**: Minimum 6 characters (e.g., `password123`)

The login is simulated and accepts any valid credentials for demonstration purposes.

## 🎬 Movie Data

The app uses real movie data from TMDB (The Movie Database):

- **Real Movie Posters**: High-quality movie posters
- **Backdrop Images**: Beautiful background images for hero sections
- **Movie Information**: Titles, ratings, release dates, and descriptions
- **TV Shows**: Both movies and TV series are supported
- **Multiple Categories**: Various curated movie lists

## 🎨 Design System

The app uses a consistent design system with:

- **Primary Colors**: Blue (#007AFF)
- **Secondary Colors**: Purple (#5856D6)
- **Status Colors**: Success, Warning, Error, Info
- **Typography**: Consistent font sizes and weights
- **Spacing**: 8px grid system
- **Border Radius**: 8px for cards and inputs
- **Dark Theme**: Netflix-inspired dark interface

## 📱 Platform Support

- ✅ Web (React Native Web)
- ✅ iOS (Expo)
- ✅ Android (Expo)

## 🔧 Development

### Code Style

- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Proper error handling
- Accessibility considerations

### Component Architecture

- Reusable components in `src/components/`
- Screen-specific components in `src/screens/`
- Type definitions in `src/types/`
- Utility functions in `src/utils/`
- API services in `src/services/`

### API Integration

- TMDB API with proper authentication
- Image URL utilities for different sizes
- Error handling and loading states
- Parallel data fetching for performance

## 🚧 Next Steps

1. **Movie Details**: Implement detailed movie pages with cast, crew, and trailers
2. **Search**: Add full search functionality with results page
3. **Navigation**: Implement React Navigation for better screen management
4. **State Management**: Add Zustand for global state management
5. **Favorites**: User favorites and watchlist functionality
6. **Testing**: Add unit and integration tests
7. **Performance**: Optimize bundle size and loading times

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository.

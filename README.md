# Fitbless Fitness App

A professional, beautiful, and modern fitness application built with React Native (Expo) and TypeScript. Fitbless helps users record workouts, manage routines/programs, join clubs, chat with teams, and track their fitness progress.

## Features

- **Authentication**
  - Email/password sign up & login
  - Social authentication (Google, Apple)

- **Home Page**
  - Motivational banner
  - Recent activity feed
  - Quick access to continue workouts

- **Training Management**
  - Workout Routines (CRUD operations)
  - Programmed Workouts
  - Exercise library with custom exercises
  - Workout tracking (start, pause, complete)
  - Share routines/programs

- **History & Progress**
  - Detailed workout history
  - Filterable workout records
  - Progress tracking and analytics

- **Social Features**
  - Create and join clubs
  - Club management with admin roles
  - Real-time club chat
  - Club activity feed

- **Settings & Customization**
  - Account management
  - Notification preferences
  - App settings and theme customization

## Tech Stack

- **Frontend:** React Native (Expo) with TypeScript
- **Navigation:** React Navigation (tabbed + stack)
- **State Management:** Context API
- **UI Components:** React Native Vector Icons, Expo Linear Gradient
- **Development Tools:** TypeScript, Babel

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd fitbless
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
```bash
# For iOS
npm run ios
# or
yarn ios

# For Android
npm run android
# or
yarn android

# For web
npm run web
# or
yarn web
```

## Project Structure

```
fitbless/
├── src/              # Source code
├── assets/           # Images, fonts, and other static assets
├── ios/              # iOS specific files
├── .expo/            # Expo configuration
├── App.tsx           # Main application component
├── index.ts          # Entry point
└── package.json      # Project dependencies and scripts
```

## Development Status

The project is currently in active development, following the phases outlined in the project plan. Current focus is on implementing core features and building a solid foundation for the application.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
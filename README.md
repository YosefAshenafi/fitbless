# Fitbless Fitness App

A professional, beautiful, and modern fitness application built with React Native (Expo) and TypeScript. Fitbless helps users record workouts, manage routines/programs, join clubs, chat with teams, and track their fitness progress.

## Screenshots
<img width="313" alt="Screenshot 2025-05-03 at 12 21 30 PM" src="https://github.com/user-attachments/assets/3b935e9b-b27d-4d30-acc8-5ade37551434" />
<img width="313" alt="Screenshot 2025-05-03 at 12 32 09 PM" src="https://github.com/user-attachments/assets/3bbca735-9f04-4a1d-9851-339a40163964" />
<img width="315" alt="Screenshot 2025-05-03 at 12 35 41 PM" src="https://github.com/user-attachments/assets/34549316-20f4-41e1-b4cf-5debf198bec0" />
<img width="316" alt="Screenshot 2025-05-03 at 12 33 37 PM" src="https://github.com/user-attachments/assets/0dd38cf2-1b22-4cec-a215-f8390022f1ac" />
<img width="309" alt="Screenshot 2025-05-03 at 12 34 26 PM" src="https://github.com/user-attachments/assets/efc93414-c43b-466b-8c61-ac90243bfff7" />
<img width="309" alt="Screenshot 2025-05-03 at 12 35 10 PM" src="https://github.com/user-attachments/assets/a75deb9f-ccbc-4a51-9054-62cccb7cd4b6" />

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

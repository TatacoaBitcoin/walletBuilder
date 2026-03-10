# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tatacoa Wallet Builder is a React Native mobile wallet foundation providing modular building blocks for wallet development. It uses TypeScript and targets both iOS and Android.

## Common Commands

```bash
# Development
yarn start              # Start Metro bundler
yarn ios                # Run on iOS simulator
yarn android            # Run on Android emulator

# Quality
yarn lint               # Run ESLint
yarn test               # Run Jest tests
yarn test --watch       # Run tests in watch mode
yarn test path/to/file  # Run specific test file
```

## Architecture

### Entry Point Flow
- `index.js` - App entry, wraps App with `PreferencesProvider` context
- `App.tsx` - Root component with NavigationContainer and SafeAreaProvider
- Toggles between `PublicFlow` (unauthenticated) and `PrivateFlow` (authenticated)

### Navigation Structure (`src/navigation/`)
- **PublicFlow** - Stack navigator: Welcome → Login
- **PrivateFlow** - Stack navigator containing:
  - **TabsFlow** - Bottom tabs: Home, Settings
  - Modal screens: Language, Scanner
- Route definitions in `types.ts` with typed param lists for type-safe navigation

### State Management
- **PreferencesContext** (`src/context/PreferencesProvider.tsx`) - User preferences (language, currency)
- `usePreferencesState()` hook to access context
- Preferences persisted via AsyncStorage (`src/utils/storage.ts`)

### Key Patterns

**Hooks** (`src/hooks/`):
- `usePreferences` - Manages language/currency with AsyncStorage persistence
- `useMnemonics` - Generates BIP39 mnemonics in multiple languages using @scure/bip39

**Internationalization**:
- i18next configured in `i18n.config.ts`
- Translations in `src/config/localization/translations/` (en.json, es.json)
- Languages enum in `src/types/index.ts` supports: en, es, cz, fr, it, ja, ko, pt, zh

**Storage Keys** (`src/types/index.ts`):
- `StorageKeys.CURRENCY` and `StorageKeys.LANGUAGE` for AsyncStorage

### Directory Structure
- `src/atoms/` - Reusable UI components (ScreenTemplate, QrCode)
- `src/screens/` - Screen components organized by flow (public/, private/)
- `src/styles/` - Design tokens (colors, shadows, spacing)
- `src/utils/` - Utilities (storage, clipboard)
- `src/config/` - Configuration (localization data)

## Configuration Notes

- SVG files are treated as source (not assets) via react-native-svg-transformer in `metro.config.js`
- Environment variables loaded via react-native-dotenv (configured in `babel.config.js`)
- Environment variable types declared in `src/types/env.d.ts`

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tatacoa Wallet Builder is a React Native mobile wallet foundation providing modular building blocks for wallet development. It uses TypeScript and targets both iOS and Android.

**Key versions:** React Native 0.84.1, React 19.2.3, TypeScript 5.8.3, Node >= 22.11.0

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
- `index.js` — App entry, wraps App with three providers: `PreferencesProvider` → `ResponseModalProvider` → `SecureStorageProvider`
- `App.tsx` — Root component with `NavigationContainer` (dynamic theme) and `SafeAreaProvider`, renders `StackFlow` and the global `ResponseModal`
- Toggles between `PublicFlow` (unauthenticated) and `PrivateFlow` (authenticated) — currently hardcoded to authenticated

### Navigation Structure (`src/navigation/`)
- **StackFlow** — Root stack navigator, switches between public/private flows
- **PublicFlow** — Stack navigator: Welcome → Login
- **PrivateFlow** — Stack navigator containing:
  - **TabsFlow** — Bottom tabs: Home, Settings (icons: wallet-bifold, cog; labels i18n translated)
  - Modal screens: Language, Currency, Scanner
- Route definitions in `types.ts` with typed param lists for type-safe navigation

### State Management (`src/context/`)
- **PreferencesProvider** (`PreferencesProvider.tsx`) — Language, currency, and theme mode; persisted via AsyncStorage
  - Hook: `usePreferencesState()` — access language, currency, themeMode, and their setters
- **ResponseModalProvider** (`ModalProvider.tsx`) — Global modal notifications (success/error/info)
  - Hook: `useResponseModal()` — `showModal(type, message)`, `hideModal()`, visibility state
- **SecureStorageProvider** (`SecureStorageProvider.tsx`) — Secure keychain operations with biometric support
  - Hook: `useSecureStorageState()` — store/retrieve/remove secure data, biometry detection
- **DeviceProvider** (`DeviceProvider.tsx`) — Device info, network status, IP address (defined but not in provider chain)
  - Hook: `useDeviceState()` — access device, network, ipAddress

### Key Patterns

**Hooks** (`src/hooks/`):
- `usePreferences` — Manages language, currency, and theme mode with AsyncStorage persistence
- `useMnemonics` — Generates BIP39 mnemonics in 9 languages using @scure/bip39
- `useSecureStorage` — Wraps react-native-keychain for secure storage with biometric auth
- `useThemeColors` — Returns theme colors based on system/user preference; also exports `useIsDarkTheme()`
- `useDeviceInfo` — Fetches device info (brand, OS, carrier, biometrics, etc.) via react-native-device-info
- `useNetworkInfo` — Monitors network connectivity via @react-native-community/netinfo
- `useIpAddress` — Fetches public IP from ip-api.com
- `useLocation` — Gets device GPS location with Android permission handling
- `useIsForeground` — Tracks whether app is in foreground via AppState
- `useSensitiveScreen` — Prevents screenshot/recording on sensitive screens via react-native-capture-protection
- `usePreventGoBack` — Prevents hardware back button navigation via BackHandler

**Theme System**:
- `ThemeMode` enum: `system`, `light`, `dark`
- `useThemeColors()` returns a `ThemeColors` object (17 color properties)
- `LightTheme`: Orange primary (#F7931A), gray text/surfaces
- `DarkTheme`: Lighter orange (#F89B2A), dark surfaces (#000000, #1A1A1A)

**Internationalization**:
- i18next configured in `i18n.config.ts`
- Translations in `src/config/localization/translations/` (en.json, es.json)
- `Languages` enum in `src/types/index.ts` supports: en, es, cz, fr, it, ja, ko, pt, zh
- 62 currencies supported in `src/config/localization/currencies.ts`

**Storage Keys** (`src/types/index.ts`):
- `StorageKeys.CURRENCY`, `StorageKeys.LANGUAGE`, `StorageKeys.THEME` — AsyncStorage keys
- `SecureStorageKeys.MNEMONIC`, `SecureStorageKeys.PRIVATE_KEY`, `SecureStorageKeys.PIN`, `SecureStorageKeys.WALLET_CREDENTIALS` — Keychain keys

### Directory Structure
- `src/atoms/` — Reusable UI components: `ScreenTemplate`, `QrCode`, `Animation` (Lottie wrapper)
- `src/molecules/` — Composite components: `ResponseModal` (global notification modal)
- `src/screens/` — Screen components organized by flow (public/, private/, private/settings/)
- `src/context/` — Context providers (Preferences, Modal, SecureStorage, Device)
- `src/hooks/` — Custom hooks (11 hooks for preferences, security, device, navigation)
- `src/navigation/` — Navigation flows and route type definitions
- `src/styles/` — Design tokens: `colors.ts` (themes), `spacing.ts`, `fonts.ts` (Inter family), `shadows.ts`
- `src/utils/` — Utilities: `storage.ts` (AsyncStorage), `secureStorage.ts` (Keychain), `clipboard.ts`
- `src/config/` — Configuration: localization (languages, currencies, translations), i18n setup
- `src/types/` — TypeScript types, enums, and env declarations

## Configuration Notes

- SVG files are treated as source (not assets) via react-native-svg-transformer in `metro.config.js`
- Environment variables loaded via react-native-dotenv (configured in `babel.config.js`)
- Environment variable types declared in `src/types/env.d.ts`
- Secure storage uses AES_GCM encryption on Android (SECURE_HARDWARE level), WHEN_PASSCODE_SET_THIS_DEVICE_ONLY on iOS

# Tatacoa Wallet Builder

A modular React Native template for building mobile wallets. Provides pre-wired security, theming, localization, device intelligence, and navigation — so you can skip the boilerplate and focus on your wallet's core logic.

Built with React Native 0.84.1, React 19, and TypeScript 5.8.

## Features

### Security

- **Secure storage** — Keychain/Keystore-backed storage with biometric authentication (Face ID, fingerprint, passcode fallback). AES-GCM on Android, Keychain access control on iOS.
- **BIP39 mnemonics** — Generate 12- or 24-word seed phrases in 9 languages via `@scure/bip39`.
- **Screen capture protection** — Block screenshots, screen recording, and app switcher previews per screen.
- **Back navigation prevention** — Lock users into critical flows (e.g., seed phrase backup).

### UI & Theming

- **Light/Dark/System themes** — Full color system with 15 semantic tokens. Follows system preference or manual override.
- **Lottie animations** — Drop-in `Animation` component wrapping `lottie-react-native`.
- **QR code generation** — Gradient-styled QR codes via `react-native-qrcode-styled`.
- **QR scanning** — Camera-based scanner screen using `react-native-vision-camera`.
- **Global response modals** — Success/error/info modals managed via context, callable from anywhere.
- **Custom fonts** — Inter font family (Regular, Medium, SemiBold) pre-configured.
- **Design tokens** — Spacing, font sizes, and shadow presets with consistent 4px base grid.

### Localization

- **Multi-language** — i18next with English and Spanish translations out of the box.
- **Multi-currency** — 62 fiat currencies with decimal configuration.

### Device & Network

- **Device info** — Brand, OS, carrier, emulator detection, biometric capability, and more.
- **Network monitoring** — Real-time connectivity status with connection type details.
- **IP geolocation** — Public IP lookup via ip-api.com.
- **GPS location** — Device coordinates with Android permission handling.
- **Foreground detection** — Track app active/background state.

### Infrastructure

- **Typed navigation** — React Navigation 7.x with fully typed stack and tab navigators.
- **Context-based state** — Preferences, secure storage, and modal state via React Context providers.
- **AsyncStorage persistence** — Language, currency, and theme preferences survive app restarts.
- **Environment variables** — `react-native-dotenv` integration with typed declarations.
- **SVG support** — Import `.svg` files as React components via `react-native-svg-transformer`.
- **Clipboard** — Copy/paste utility functions.

## Getting Started

```bash
# Install dependencies
yarn install

# iOS setup
cd ios && bundle exec pod install && cd ..

# Run
yarn ios      # iOS simulator
yarn android  # Android emulator
```

## Usage

### Screen Template

Wrap every screen with `ScreenTemplate` for consistent safe-area handling and theme-aware backgrounds:

```tsx
import { ScreenTemplate } from '../atoms';

function WalletScreen() {
  return (
    <ScreenTemplate>
      <Text>Your wallet content</Text>
    </ScreenTemplate>
  );
}
```

### Theme Colors

Access the current theme's color palette anywhere in your component tree:

```tsx
import { useThemeColors, useIsDarkTheme } from '../hooks/useThemeColors';

function Header() {
  const colors = useThemeColors();
  const isDark = useIsDarkTheme();

  return (
    <View style={{ backgroundColor: colors.surface }}>
      <Text style={{ color: colors.textPrimary }}>
        {isDark ? 'Dark mode' : 'Light mode'}
      </Text>
    </View>
  );
}
```

Switch themes programmatically via the preferences context:

```tsx
import { usePreferencesState } from '../context/PreferencesProvider';
import { ThemeMode } from '../types';

function ThemeToggle() {
  const { themeMode, themeSetup } = usePreferencesState();

  return (
    <Button
      title={`Current: ${themeMode}`}
      onPress={() => themeSetup(ThemeMode.dark)}
    />
  );
}
```

### Mnemonic Generation

Generate BIP39 seed phrases in multiple languages with configurable strength:

```tsx
import { useMnemonics } from '../hooks/useMnemonics';
import { Languages } from '../types';

function SeedPhraseScreen() {
  const { mnemonic, generate } = useMnemonics(Languages.en, 256); // 24 words

  return (
    <ScreenTemplate>
      <Text>{mnemonic}</Text>
      <Button title="Generate new" onPress={generate} />
    </ScreenTemplate>
  );
}
```

### Secure Storage

Store and retrieve sensitive data with biometric authentication:

```tsx
import { useSecureStorageState } from '../context/SecureStorageProvider';
import { SecureStorageKeys } from '../types';

function PinSetup() {
  const { storeSecurely, retrieveSecurely, isBiometryAvailable, biometryType } =
    useSecureStorageState();

  const savePin = async (pin: string) => {
    await storeSecurely(
      SecureStorageKeys.PIN,
      pin,
      SecureStorageKeys.PIN,
      'Authenticate to save your PIN',
    );
  };

  const loadPin = async () => {
    const result = await retrieveSecurely(SecureStorageKeys.PIN);
    if (result) {
      console.log('PIN retrieved:', result.value);
    }
  };

  return (
    <View>
      <Text>Biometry: {biometryType ?? 'none'}</Text>
      <Button title="Save PIN" onPress={() => savePin('1234')} />
      <Button title="Load PIN" onPress={loadPin} />
    </View>
  );
}
```

Store typed objects:

```tsx
type WalletCredentials = { address: string; publicKey: string };

const { storeObjectSecurely, retrieveObjectSecurely } = useSecureStorageState();

await storeObjectSecurely<WalletCredentials>(
  SecureStorageKeys.WALLET_CREDENTIALS,
  { address: '0x...', publicKey: '04...' },
  SecureStorageKeys.WALLET_CREDENTIALS,
);

const creds = await retrieveObjectSecurely<WalletCredentials>(
  SecureStorageKeys.WALLET_CREDENTIALS,
);
```

### Global Modals

Show success, error, or info modals from any component:

```tsx
import { useResponseModal } from '../context/ModalProvider';

function TransferScreen() {
  const { showModal } = useResponseModal();

  const handleTransfer = async () => {
    try {
      await sendTransaction();
      showModal('success', 'Transfer complete');
    } catch (e) {
      showModal('error', 'Transfer failed. Please try again.');
    }
  };

  return <Button title="Send" onPress={handleTransfer} />;
}
```

### QR Codes

Generate and scan QR codes:

```tsx
import { QrCode } from '../atoms';

// Generate a gradient-styled QR code
function ReceiveScreen({ address }: { address: string }) {
  return (
    <ScreenTemplate>
      <QrCode data={address} />
    </ScreenTemplate>
  );
}
```

The scanner is available as a modal screen via navigation:

```tsx
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../navigation/types';

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Button
      title="Scan QR"
      onPress={() => navigation.navigate(Routes.Scanner)}
    />
  );
}
```

### Animations

Play Lottie animations with full control:

```tsx
import { Animation } from '../atoms';
import successAnimation from '../assets/animations/success.json';

function SuccessScreen() {
  return (
    <Animation
      source={successAnimation}
      autoPlay
      loop={false}
      speed={1.5}
      onAnimationFinish={() => navigation.goBack()}
    />
  );
}
```

### Screen Capture Protection

Prevent screenshots and recording on sensitive screens:

```tsx
import { useSensitiveScreen } from '../hooks/useSensitiveScreen';

function SeedPhraseReveal() {
  useSensitiveScreen(true, {
    screenshot: true,
    record: true,
    appSwitcher: true, // blur in app switcher
  });

  return <Text>{seedPhrase}</Text>;
}
```

### Back Navigation Prevention

Lock users into critical flows:

```tsx
import { usePreventGoBack } from '../hooks/usePreventGoBack';

function BackupConfirmation({
  isBackupComplete,
}: {
  isBackupComplete: boolean;
}) {
  usePreventGoBack(!isBackupComplete); // prevent back until backup is done

  return <Text>Please confirm your seed phrase backup</Text>;
}
```

### Device, Network & IP

Access device capabilities, network state, and public IP through `DeviceProvider`:

```tsx
import { useDeviceState } from '../context/DeviceProvider';

function DiagnosticsScreen() {
  const { device, network, ipAddress } = useDeviceState();

  return (
    <View>
      <Text>
        Device: {device.brand} ({device.OS})
      </Text>
      <Text>Emulator: {device.isEmulator ? 'Yes' : 'No'}</Text>
      <Text>Biometric lock: {device.isPinOrFingerprintSet ? 'Yes' : 'No'}</Text>
      <Text>
        Network: {network.type} (connected: {network.isConnected ? 'Yes' : 'No'})
      </Text>
      <Text>IP: {ipAddress}</Text>
    </View>
  );
}
```

### Location

```tsx
import { useLocation } from '../hooks/useLocation';

function LocationScreen() {
  const { location, error, isLoading, getLocation } = useLocation();

  return (
    <View>
      {location && (
        <Text>
          GPS: {location.latitude}, {location.longitude}
        </Text>
      )}
      <Button title="Refresh location" onPress={getLocation} />
    </View>
  );
}
```

### Localization

Switch language and currency at runtime — changes persist across app restarts:

```tsx
import { usePreferencesState } from '../context/PreferencesProvider';
import { Languages } from '../types';
import { useTranslation } from 'react-i18next';

function LanguagePicker() {
  const { language, languageSetup } = usePreferencesState();
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t('settings.language')}</Text>
      <Button title="English" onPress={() => languageSetup(Languages.en)} />
      <Button title="Español" onPress={() => languageSetup(Languages.es)} />
    </View>
  );
}
```

### Clipboard

```tsx
import { copyToClipboard, getFromClipboard } from '../utils/clipboard';

// Copy a wallet address
copyToClipboard('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');

// Read clipboard contents
const contents = await getFromClipboard();
```

### AsyncStorage Utilities

```tsx
import { storeObject, getStoredObject } from '../utils/storage';

// Persist user settings
await storeObject('watchlist', { tokens: ['BTC', 'ETH'] });

// Retrieve later
const watchlist = await getStoredObject('watchlist');
```

### Foreground Detection

Pause background operations when the app is inactive:

```tsx
import { useIsForeground } from '../hooks/useIsForeground';

function LivePriceFeed() {
  const isForeground = useIsForeground();

  useEffect(() => {
    if (!isForeground) return;
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, [isForeground]);

  return <PriceList />;
}
```

## Project Structure

```
src/
  atoms/          Reusable UI primitives (ScreenTemplate, QrCode, Animation)
  molecules/      Composite components (ResponseModal)
  screens/        Screen components (public/, private/, private/settings/)
  navigation/     Stack and tab navigators, route type definitions
  context/        React Context providers (Preferences, Modal, SecureStorage, Device)
  hooks/          Custom hooks (11 hooks for security, device, theming, navigation)
  styles/         Design tokens (colors, spacing, fonts, shadows)
  utils/          Utility functions (storage, secureStorage, clipboard)
  config/         i18n setup, translations, currencies, languages
  types/          TypeScript enums, types, and env declarations
```

## Design Tokens

### Spacing (4px base grid)

| Token | px  |
| ----- | --- |
| xs    | 4   |
| sm    | 8   |
| smd   | 12  |
| md    | 16  |
| lg    | 24  |
| xl    | 32  |
| xxl   | 40  |

### Fonts

| Weight  | Family         |
| ------- | -------------- |
| regular | Inter-Regular  |
| medium  | Inter-Medium   |
| bold    | Inter-SemiBold |

## License

See [LICENSE](LICENSE) for details.

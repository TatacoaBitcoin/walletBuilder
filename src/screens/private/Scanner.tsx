import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {
  Camera,
  Code,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { Button } from '@react-navigation/elements';

import { useIsForeground } from '../../hooks/useIsForeground';

const Scanner = () => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const [torch, setTorch] = useState(false);

  const isFocused = useIsFocused();
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;
  const hasTorch = device?.hasTorch;

  const onCodeScanned = useCallback((codes: Code[]) => {
    const value = codes[0]?.value;
    if (value == null) return;
    console.log('Scanned', value);
  }, []);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: onCodeScanned,
  });

  const handleTorchPress = () => {
    if (hasTorch) {
      setTorch(!torch);
    }
  };

  if (hasPermission) {
    return (
      <View style={styles.container}>
        {device != null && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
            torch={torch ? 'on' : 'off'}
            enableZoomGesture={true}
          />
        )}
        {hasTorch && (
          <View style={styles.rightButtonRow}>
            <Button onPress={handleTorchPress}>Torch</Button>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.placeholderContainer}>
      <Text>This app needs your permission to use the camera</Text>
      <Button onPress={requestPermission}>Allow Camera</Button>
    </View>
  );
};

export { Scanner };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  rightButtonRow: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

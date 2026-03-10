import React, { useRef } from 'react';
import LottieView from 'lottie-react-native';

import success from '../../assets/animations/Success.json';

const Animation = () => {
  const animationRef = useRef<LottieView>(null);

  return (
    <LottieView
      ref={animationRef}
      source={success}
      autoPlay
      loop
      style={{ width: 200, height: 200 }}
    />
  );
};

export { Animation };

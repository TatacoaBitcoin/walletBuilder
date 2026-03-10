import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LottieView, { LottieViewProps } from 'lottie-react-native';

interface AnimationProps {
  source: LottieViewProps['source'];
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  style?: StyleProp<ViewStyle>;
  resizeMode?: 'cover' | 'contain' | 'center';
  onAnimationFinish?: (isCancelled: boolean) => void;
}

const Animation = React.forwardRef<LottieView, AnimationProps>(
  (
    {
      source,
      autoPlay = true,
      loop = false,
      speed,
      style = { width: 200, height: 200 },
      resizeMode,
      onAnimationFinish,
    },
    ref,
  ) => {
    return (
      <LottieView
        ref={ref}
        source={source}
        autoPlay={autoPlay}
        loop={loop}
        speed={speed}
        style={style}
        resizeMode={resizeMode}
        onAnimationFinish={onAnimationFinish}
      />
    );
  },
);

export { Animation };

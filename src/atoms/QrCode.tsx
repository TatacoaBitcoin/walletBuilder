import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

import { useThemeColors } from '../hooks/useThemeColors';

type Props = {
  data: string;
};

const QrCode = ({ data = 'example' }: Props) => {
  const colors = useThemeColors();

  return (
    <QRCodeStyled
      data={data}
      style={[styles.svg, { backgroundColor: colors.surface }]}
      padding={20}
      pieceBorderRadius={'50%'}
      isPiecesGlued
      preserveAspectRatio="none"
      gradient={{
        type: 'linear',
        options: {
          start: [0, 0],
          end: [1, 1],
          colors: ['#da0c8b', '#00bfff'],
          locations: [0, 1],
        },
      }}
    />
  );
};

export { QrCode };

const styles = StyleSheet.create({
  svg: {
    borderRadius: 16,
    overflow: 'hidden',
  },
});

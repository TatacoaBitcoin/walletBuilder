import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Button } from '@react-navigation/elements';

import { ModalType } from '../../types';
import { fontSize, margin } from '../../styles/spacing';
import fonts from '../../styles/fonts';
import { useThemeColors } from '../../hooks/useThemeColors';
import Icons from '../../../assets/icons';

interface Props {
  visible: boolean;
  type: ModalType;
  message: string;
  onClose: () => void;
}

const ResponseModal = ({ visible, type, message, onClose }: Props) => {
  const colors = useThemeColors();

  const modalConfig: Record<
    ModalType,
    { icon: keyof typeof Icons; color: string }
  > = {
    success: { icon: 'Check', color: colors.success },
    error: { icon: 'Cross', color: colors.error },
    info: { icon: 'Alert', color: colors.info },
  };

  const { icon, color } = modalConfig[type];
  const Icon = Icons[icon];

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={[styles.overlay, { backgroundColor: colors.overlay }]}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <Icon width={60} height={60} color={color} />
          <Text style={[styles.message, { color: colors.textSecondary }]}>
            {message?.toString()}
          </Text>
          <Button onPress={onClose}>Accept</Button>
        </View>
      </View>
    </Modal>
  );
};

export { ResponseModal };

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  message: {
    fontSize: fontSize.md,
    marginVertical: margin.lg,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
});

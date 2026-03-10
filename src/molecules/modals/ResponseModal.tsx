import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Button } from '@react-navigation/elements';

import { ModalType } from '../../types';
import { fontSize, margin } from '../../styles/spacing';
import fonts from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import Icons from '../../../assets/icons';

interface Props {
  visible: boolean;
  type: ModalType;
  message: string;
  onClose: () => void;
}

const modalConfig: Record<ModalType, { icon: keyof typeof Icons; color: string }> = {
  success: { icon: 'Check', color: Colors.success },
  error: { icon: 'Cross', color: Colors.error },
  info: { icon: 'Alert', color: Colors.info },
};

const ResponseModal = ({ visible, type, message, onClose }: Props) => {
  const { icon, color } = modalConfig[type];
  const Icon = Icons[icon];

  return (
    <Modal visible={visible} transparent animationType="none">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Icon width={60} height={60} color={color} />
          <Text style={styles.message}>{message?.toString()}</Text>
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
    backgroundColor: Colors.transparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  message: {
    color: Colors.secondary,
    fontSize: fontSize.md,
    marginVertical: margin.lg,
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
});

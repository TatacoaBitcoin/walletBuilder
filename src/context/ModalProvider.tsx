import React, { createContext, useContext, useState, ReactNode } from 'react';

import { ModalType } from '../types';

interface ModalState {
  visible: boolean;
  type: ModalType;
  message: string;
}

interface ModalContextType {
  showModal: (type: ModalType, message: string) => void;
  hideModal: () => void;
  state: ModalState;
}

const ResponseModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export const ResponseModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, setState] = useState<ModalState>({
    visible: false,
    type: 'success',
    message: '',
  });

  const showModal = (type: ModalType, message: string) => {
    setState({ visible: true, type, message });
  };

  const hideModal = () => {
    setState(prev => ({ ...prev, visible: false }));
  };

  return (
    <ResponseModalContext.Provider value={{ showModal, hideModal, state }}>
      {children}
    </ResponseModalContext.Provider>
  );
};

export const useResponseModal = (): ModalContextType => {
  const context = useContext(ResponseModalContext);
  if (!context) {
    throw new Error(
      'useResponseModal must be used within a ResponseModalProvider',
    );
  }
  return context;
};

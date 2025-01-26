import React, { useState } from 'react';
import { useModalContext } from '../../components/Modal/context/ModalContext';
import SplashModal from './components/SplashModal';
import ConsentModal from './components/ConsentModal';

function Login() {
  const { openModal } = useModalContext();

  const handleOpenFirstModal = () => {
    openModal(({ onClose }) => <SplashModal onClose={onClose} />);
  };

  return (
    <div>
      <button onClick={handleOpenFirstModal}>login</button>
    </div>
  );
}

export default Login;

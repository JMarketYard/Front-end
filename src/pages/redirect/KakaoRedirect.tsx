import { useEffect } from 'react';
import { useModalContext } from '../../components/Modal/context/ModalContext';
import ConsentModal from '../login/components/ConsentModal';
import styled from 'styled-components';

function KakaoRedirect() {
  const { openModal } = useModalContext();

  useEffect(() => {
    openModal(({ onClose }) => <ConsentModal onClose={onClose} />);
  }, []);

  return <Container></Container>;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default KakaoRedirect;

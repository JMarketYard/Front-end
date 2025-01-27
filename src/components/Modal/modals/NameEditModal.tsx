import React, { useState } from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import vector from '../../../assets/Vector.png';

interface ModalProps {
  onClose: () => void;
}

const NameEditModal: React.FC<ModalProps> = ({ onClose }) => {
  const [isError, setIsError] = useState('');
  const [name, setName] = useState('');

  const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    if (!regex.test(name)) {
      setIsError('닉네임은 2~10자의 한글 또는 영어만 사용 가능합니다.');
      return;
    } else {
      setIsError('');
      onClose();
    }
  };

  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={vector} />
        <Title>닉네임 변경하기</Title>
        <Error>{isError}</Error>
        <Input
          value={name}
          onChange={handleChangeName}
          placeholder="닉네임을 입력하세요. (한글, 숫자, 영어 2~10자)"
          isError={!!isError}
        />
        <Button disabled={!name} onClick={handleSubmit}>
          변경하기
        </Button>
      </Container>
    </Modal>
  );
};

const Error = styled.div`
  margin-top: 28px;
  width: 234px;
  height: 17px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #c908ff;
  font-family: 'Noto Sans KR';
  transform: translateX(-18px);
`;

const Button = styled.button`
  width: 302px;
  height: 39px;
  border-radius: 7px;
  background-color: #c908ff;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

const Input = styled.input<{ isError: boolean }>`
  margin-top: 4px;
  margin-bottom: 161px;
  border-radius: 5px;
  border: ${({ isError }) => (isError ? '1px solid #C908FF' : 'none')};
  background: #f7f7f7;
  width: 272px;
  height: 31px;
  display: inline-flex;
  padding: 3.2px 14px;
  justify-content: center;
  align-items: center;
  outline: none;
  &::placeholder {
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 300;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  font-family: Pretendard;
`;

const Img = styled.img`
  margin-top: 64px;
  width: 31px;
  height: 30px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default NameEditModal;

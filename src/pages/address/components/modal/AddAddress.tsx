import React, { PropsWithChildren } from "react";
import ReactDOM from 'react-dom';
import styled from "styled-components";
import { useModalContext } from "../../../../components/Modal/context/ModalContext";
import InputAddress from "../InputAddress";
import { ReactComponent as IcList } from "../../../../assets/icList.svg";
import { ReactComponent as closeModal } from  "../../../../assets/icCloseAddressModal.svg";

const AddAddress = ({ onClose }:PropsWithChildren<{ onClose: () => void }>) => {
  const { clearModals } = useModalContext();

  const onCloseModal = () => {
    onClose();
    clearModals();
  }
  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <CloseModal onClick={onCloseModal} />
        <TopContainer>
          <TitleBox>배송지 추가</TitleBox>
          <LineDiv />
        </TopContainer>
        <ContentsContainer>
          <InputAddress listColor="#C908FF" title="배송지명" />
          <InputAddress listColor="#C908FF" title="받는 사람" />
          <AddressBox>
            <FlexContainer>
              <IcList fill="#C908FF" width={7} height={7} />
              <AddressTextBox>주소</AddressTextBox>
            </FlexContainer>
            <FindAddressBox>
              <FindAddressDiv />
              <FindAddressDiv />
              <FindAddressDiv />
            </FindAddressBox>
          </AddressBox>
          <InputAddress listColor="#C908FF" title="연락처" inputType="tel" />
          <InputAddress listColor="#E4E4E4" title="휴대폰" inputType="tel" />
          <InputAddress listColor="#E4E4E4" title="주문 메시지" />
        </ContentsContainer>
        <AddBtn>추가하기</AddBtn>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default AddAddress;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 582px;
  height: auto;
  background-color: #fff;
  border-radius: 6px;
  padding: 58px 65px;
  box-sizing: border-box;
`

const CloseModal = styled(closeModal)`
  position: absolute;
  top: 0;
  right: 0;
  &:hover {
    cursor: pointer;
  }
`

const TopContainer = styled.div`
  width: 451px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-direction: row-reverse;
`
const TitleBox = styled.div`
  width: 127px;
  height: 40px;
  border-radius: 74px;
  background-color: #C908FF;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 100% */
  letter-spacing: -0.165px;
`
const LineDiv = styled.div`
  width: 426px;
  height: 5px;
  background-color: #C908FF;
`

const ContentsContainer = styled.div`
  width: 423px;
  display: flex;
  flex-direction: column;
  row-gap: 18px;
  padding: 29px 0 87px 0;
`

const AddressBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
`
const FlexContainer = styled.div`
  height: 38px;
  display: flex;
  align-items: center;
`
const AddressTextBox = styled.div`
  width: 84px;
  padding-left: 12px;
  color: #8F8E94;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
  letter-spacing: -0.165px;
  box-sizing: border-box;
`
const FindAddressBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 18px;
`
const FindAddressDiv = styled.div`
  width: 332px;
  height: 38px;
  border-radius: 3px;
  border: 0.5px solid #C1C1C1;
  background: #F7F7F7;
  padding: 0 5px;
  color: black;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 150% */
  letter-spacing: -0.165px;
  box-sizing: border-box;
`

const AddBtn = styled.button`
  width: 302px;
  height: 39px;
  border-radius: 7px;
  background: #C908FF;
  border: none;
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 128.571% */
  letter-spacing: -0.165px;
  &:hover {
    cursor: pointer;
  }
`
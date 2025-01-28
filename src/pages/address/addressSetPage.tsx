import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import Address from "./components/Address";

const AddressSetPage = () => {
  return (
    <Wrapper>
      <BigTitle>배송지 설정</BigTitle>
      <AddressList>
        <Address />
      </AddressList>
      <Button>새 배송지 추가하기</Button>
    </Wrapper>
  );
}

export default AddressSetPage;

const Wrapper = styled.div`
  padding-top: 63px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AddressList = styled.ul`
  padding-top: 63px;
  margin-bottom: 120px;
  display: flex;
  flex-direction: column;
  row-gap: 30px;
`

const Button = styled.button`
    width: 424px;
    height: 57px;
    border: none;
    border-radius: 7px;
    background: #C908FF;
    color: white;
    text-align: center;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.165px;
    margin-bottom: 150px;
    &:hover {
        cursor: pointer;
    }
`
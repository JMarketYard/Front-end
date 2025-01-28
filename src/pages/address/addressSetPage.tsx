import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import Address from "./components/Address";
import { useState } from "react";

const AddressSetPage = () => {
  const [isSelect, setIsSelect] = useState(false);

  return (
    <Wrapper>
      <BigTitle>
        배송지 설정
        {isSelect
        ? <SelectBtn onClick={()=>setIsSelect(false)}>선택</SelectBtn>
        : <>
        <SelectBtn
        $right={'128px'}
        >배송지 삭제</SelectBtn>
        <SelectBtn
        $background={'rgba(201, 8, 255, 0.20)'}
        color={'#C908FF'}
        onClick={()=>setIsSelect(true)}
        >선택 취소</SelectBtn>
        </>}
      </BigTitle>
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

const SelectBtn = styled.button<{$background?:string, color?:string, $right?:string}>`
  display: inline-flex;
  height: 31px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 11px;
  border: 1px solid #C908FF;
  background: ${props => props.$background ? props.$background : '#C908FF'};
  color: ${props => props.color ? props.color : '#FFF'};
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 204.622% */
  position: absolute;
  right: ${props => props.$right ? props.$right : '0'};
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  };
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
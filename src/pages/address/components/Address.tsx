import { useState } from "react";
import styled from "styled-components";

const Address = () => {
  // 임의의 default state: 후에 데이터 연결하면 삭제할 state
  const [isDefault, setIsDefault] = useState(false);
  return (
    <>
    <List>
      <ListIcon />
      <TitleSpan>우리집</TitleSpan>
      <AddressSpan>서울특별시 마포구 와우산로 94 홍익대학교 제2기숙사</AddressSpan>
      <SetBtn
      $default={isDefault}
      onClick={()=>setIsDefault(!isDefault)}
      >{
        isDefault
        ? '기본 배송지로 설정됨'
        : '기본 배송지로 설정하기'
      }</SetBtn>
    </List>
    </>
  );
};

export default Address;

const List = styled.li`
  display: flex;
  align-items: baseline;
  column-gap: 70px;
  width: 1000px;
  box-sizing: border-box;
`

const ListIcon = styled.span`
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: rgba(201, 8, 255, 0.20);
    border-radius: 100%;
    // margin-right: 78px;
`

const TitleSpan = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
`

const AddressSpan = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20.363px; /* 113.13% */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 460px;
`

const SetBtn = styled.button<{$default:boolean}>`
  display: flex;
  height: 31px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid #C908FF;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 230.199% */
  margin-right: 14px;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  };
  ${props => props.$default
    ? `background: rgba(201, 8, 255, 0.20);
      color: #C908FF;`
    : `background: #C908FF;
      color: #FFF;`
  }
`
/// <reference types="vite-plugin-svgr/client" />
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as checkbox } from "../../../assets/imgCheckbox.svg";
import media from "../../../styles/media";

const Address = ({isSelect}:{isSelect:boolean}) => {
  // 임의의 default state: 후에 데이터 연결하면 삭제할 state
  const [isDefault, setIsDefault] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
    <List>
      {isSelect ?
      <Checkbox
      onClick={()=>setIsClicked(!isClicked)}
      fill={isClicked ? "#C908FF" : "none"}
      />
    : <ListIcon />}
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
  align-items: center;
  // justify-content: space-between;
  column-gap: 74px;
  width: 845px;
  box-sizing: border-box;
  ${media.medium`
    width: 631px;
    column-gap: 50px;
    // justify-content: space-between;
  `}
`

const Checkbox = styled(checkbox)`
  width: 27.2px;
  height: 27.1px;
  &:hover {
    cursor: pointer;
  };

  ${media.medium`
    width: 21px;
    height: 21px;
  `}
`

const ListIcon = styled.span`
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 6.5px;
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
  // width: 100px;
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
  ${media.medium`
    width: 229px;
  `}
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
  // margin-right: 14px;
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
/// <reference types="vite-plugin-svgr/client" />
import styled from "styled-components";
import { ReactComponent as IcList } from "../../../assets/icList.svg";

type TInputAddress = {
  listColor:string,
  title:string,
  inputType?: 'tel',
  value:string,
  setValue:React.Dispatch<React.SetStateAction<string>>,
}

const InputAddress = ({listColor, title, inputType, value, setValue}:TInputAddress) => {
  return (
    <Container>
      <IcList fill={listColor} width={7} height={7} />
      <TitleBox>
        {title}
      </TitleBox>
      <Input type={inputType||"text"} value={value} 
      onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
      setValue(e.target.value)} />
    </Container>
  );
};

export default InputAddress;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const TitleBox = styled.div`
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

const Input = styled.input`
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
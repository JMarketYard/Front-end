import styled from 'styled-components';
import BigTitle from '../../components/BigTitle';
import grayDelivery from '../../assets/hostResult/grayDelivery.svg';

type Result = 'success' | 'less';
type IfLess = 'exit' | 'toSuccess' | 'later';
type IfSuccess = 'wait' | 'done' | 'timeover';

const ResultPage = () => {
  return (
    <Wrapper>
      <BigTitle>래플 결과</BigTitle>
      <ResultLayout>
        <ResultContainer>
          <TextBox>최소 마감 티켓</TextBox>
          <TextBox>100개</TextBox>
        </ResultContainer>
        <ResultContainer>
          <TextBox>현재 티켓</TextBox>
          <PurpleTextBox>132개</PurpleTextBox>
        </ResultContainer>
        <HorizonBox />
        <ResultContainer>
          <TextBox>배송 후 정산금액</TextBox>
          <PurpleTextBox>12,276 원</PurpleTextBox>
        </ResultContainer>
        <ResultContainer>
          <GrayTextBox>당첨자 배송비 결제 현황</GrayTextBox>
          <DeliveryStateBox>배송지 입력 대기</DeliveryStateBox>
        </ResultContainer>
        <GrayAddressBox>
          <img src={grayDelivery} />
        </GrayAddressBox>
      </ResultLayout>
      <ButtonContainer>
        <GrayButtonBox>운송장 입력하기</GrayButtonBox>
        <GrayButtonBox>나중에 입력하기 (입력기한 : 1/12)</GrayButtonBox>
      </ButtonContainer>
    </Wrapper>
  );
};

export default ResultPage;

const Wrapper = styled.div`
  width: 1080px;
  min-height: 1498px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 63px;
`;

const ResultLayout = styled.div`
  width: 636px;
  height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 105px auto 243px auto;
`;

const ResultContainer = styled.div`
  width: 100%;
  height: 25px;
  margin-bottom: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  height: 19.215px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 5 100%; /* 20px */
`;

const PurpleTextBox = styled.div`
  display: flex;
  height: 19.215px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #c908ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 20px */
`;

const HorizonBox = styled.hr`
  width: 100%;
  height: 1px;
  background: #000;
  margin: 2px 0 28px 0;
`;

const GrayTextBox = styled.div`
  display: flex;
  width: 200px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #8f8e94;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 18px */
`;

const DeliveryStateBox = styled.div`
  display: flex;
  height: 25px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;

  border-radius: 31px;
  border: 1px solid #8f8e94;

  color: #8f8e94;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 263.085% */
`;

const GrayAddressBox = styled.div`
  width: 636px;
  height: 59px;
  margin-top: 45px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 47px;
`;

const GrayButtonBox = styled.div`
  width: 474px;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  border: 1px solid #8f8e94;
  background: #e4e4e4;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 100% */
  letter-spacing: -0.165px;
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background-color: #8f8e94;
  margin-right: 10px;
`;

const DottedLine = styled.div`
  flex-grow: 1;
  height: 2px;
  border-bottom: 2px dashed #8f8e94;
`;

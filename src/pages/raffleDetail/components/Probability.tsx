import styled from 'styled-components';
import React from 'react';
import DonutChart from './DonutChart';
import NpDonutChart from './NpDonutChart';
import DonutText from './DonutText';

interface ItemProps {
  participant: number;
  atLeastParticipant: number;
  role: 'p' | 'np' | 'h';
  raffleStatus: string;
  result: 'success' | 'less' | 'failed';
  winner: 'y' | 'n' | 'idk';
}

const Probability = ({
  participant,
  atLeastParticipant,
  role,
  raffleStatus,
  result,
  winner,
}: ItemProps) => {
  return (
    <Wrapper>
      {raffleStatus === 'ongoing' && (
        <>
          {(role === 'np' || role === 'h') && (
            <CenteredContainer>
              <TitleBox>지금 참여하면 당첨될 확률은?</TitleBox>
              <NpDonutChart participant={participant} />
            </CenteredContainer>
          )}
          {role === 'p' && (
            <CenteredContainer>
              <TitleBox>지금 당신이 당첨될 확률은?</TitleBox>
              <DonutChart participant={participant} />
            </CenteredContainer>
          )}
          <InfoContainer>
            <ParticipantBox>현재 참여자 수 : {participant}명</ParticipantBox>
            <ParticipantBox>
              판매자 희망 최소 참여자 : {atLeastParticipant}명
            </ParticipantBox>
          </InfoContainer>
        </>
      )}
      {raffleStatus === 'ended' && (
        <>
          {result === 'success' && ( //DRAW 확인 전
            <>
              {(role === 'np' || role === 'h') && (
                <CenteredContainer>
                  <TitleBox>누군가 당첨될 확률은?</TitleBox>
                  <DonutChart participant={participant} />
                  <InfoContainer>
                    <ParticipantBox>
                      현재 참여자 수 : {participant}명
                    </ParticipantBox>
                    <ParticipantBox>
                      판매자 희망 최소 참여자 : {atLeastParticipant}명
                    </ParticipantBox>
                  </InfoContainer>
                </CenteredContainer>
              )}
              {role === 'p' && winner === 'idk' && (
                <CenteredContainer>
                  <TitleBox>지금 당신이 당첨될 확률은?</TitleBox>
                  <DonutChart participant={participant} />
                  <InfoContainer>
                    <ParticipantBox>
                      현재 참여자 수 : {participant}명
                    </ParticipantBox>
                    <ParticipantBox>
                      판매자 희망 최소 참여자 : {atLeastParticipant}명
                    </ParticipantBox>
                  </InfoContainer>
                </CenteredContainer>
              )}
              {role === 'p' && (winner === 'y' || 'n') && (
                <CenteredContainer>
                  <TitleBox>해당 래플은 종료되었습니다</TitleBox>
                  <DonutText text="래플 종료" />
                </CenteredContainer>
              )}
            </>
          )}
          {result === 'failed' && ( //DRAW 확인 전
            <FailedContainer>
              래플 종료
              <FailedBox>
                해당 래플은 판매자 희망 최소 참여자 이상 모이지 않아
                취소되었습니다. 취소된 래플에 대한 티켓은 다시 적립됩니다.
              </FailedBox>
            </FailedContainer>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Probability;

const Wrapper = styled.div`
  display: flex;
  width: 257px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

// 중앙 정렬을 위한 컨테이너
const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* ✅ 내부 요소를 중앙 정렬 */
  justify-content: center;
  width: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  width: 257px;
  height: 29px;
  margin-bottom: 32px;
  flex-direction: column;
  justify-content: center;

  color: #8d8d8d;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 31.6px;
`;

const ParticipantBox = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const FailedContainer = styled.div`
  width: 285px;
  height: 185px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 23px 0 30px 0;
  box-sizing: border-box;

  border: 1px solid #8f8e94;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
`;

const FailedBox = styled.div`
  width: 234px;
  height: 96px;
  margin: 19px auto 0 auto;
  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
`;

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
      {role === 'np' && (
        <>
          {raffleStatus === 'ongoing' && (
            <CenteredContainer>
              <TitleBox>지금 참여하면 당첨될 확률은?</TitleBox>
              <NpDonutChart participant={participant} />
            </CenteredContainer>
          )}
          {raffleStatus === 'ended' && (
            <CenteredContainer>
              <TitleBox>누군가 당첨될 확률은?</TitleBox>
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

      {role === 'p' && result === 'success' && (
        <>
          {raffleStatus === 'ongoing' && (
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
          {raffleStatus === 'ended' && winner === 'idk' && (
            <CenteredContainer>
              <TitleBox>당신이 당첨될 확률은?</TitleBox>
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
          {raffleStatus === 'ended' && (winner === 'y' || winner === 'n') && (
            <CenteredContainer>
              <TitleBox>해당 래플은 종료되었습니다</TitleBox>
              <DonutText text="래플 종료" />
            </CenteredContainer>
          )}
        </>
      )}

      {role === 'p' && raffleStatus === 'ended' && result === 'less' && (
        <CenteredContainer>
          <TitleBox>해당 래플은 종료되었습니다</TitleBox>
          <DonutText text="래플 종료" />
        </CenteredContainer>
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

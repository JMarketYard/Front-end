import styled from 'styled-components';
import React from 'react';
import DonutChart from './DonutChart';
import NpDonutChart from './NpDonutChart';
import DonutText from './DonutText';
import icMark from '../../../assets/raffleDetail/icon-mark.svg';
import RaffleDetailProps from '../../../components/RaffleDetailProps';

const Probability: React.FC<RaffleDetailProps> = (raffle) => {
  return (
    <Wrapper>
      {raffle.raffleStatus === 'UNOPENED' && (
        <UnOpenContainer>
          <img src={icMark} alt={'icMark'} />
          <UnOpenBox>해당 래플은 가직 개최되지 않았습니다.</UnOpenBox>
        </UnOpenContainer>
      )}

      {raffle.raffleStatus === 'ACTIVE' && (
        <>
          {(raffle.userStatus === 'nonParticipant' ||
            raffle.userStatus === 'host') && (
            <CenteredContainer>
              <TitleBox>지금 참여하면 당첨될 확률은?</TitleBox>
              <NpDonutChart participant={raffle.applyCount} />
            </CenteredContainer>
          )}
          {raffle.userStatus === 'participant' && (
            <CenteredContainer>
              <TitleBox>지금 당신이 당첨될 확률은?</TitleBox>
              <DonutChart participant={raffle.applyCount} />
            </CenteredContainer>
          )}
          <InfoContainer>
            <ParticipantBox>
              현재 참여자 수 : {raffle.applyCount}명
            </ParticipantBox>
            <ParticipantBox>
              판매자 희망 최소 참여자 : {raffle.minUser}명
            </ParticipantBox>
          </InfoContainer>
        </>
      )}

      {raffle.raffleStatus === 'ENDED' && ( //DRAW 확인 전
        <>
          {(raffle.userStatus === 'nonParticipant' ||
            raffle.userStatus === 'host') && (
            <CenteredContainer>
              <TitleBox>누군가 당첨될 확률은?</TitleBox>
              <DonutChart participant={raffle.applyCount} />
              <InfoContainer>
                <ParticipantBox>
                  현재 참여자 수 : {raffle.applyCount}명
                </ParticipantBox>
                <ParticipantBox>
                  판매자 희망 최소 참여자 : {raffle.minUser}명
                </ParticipantBox>
              </InfoContainer>
            </CenteredContainer>
          )}
          {raffle.isWinner === 'hope' && (
            <CenteredContainer>
              <TitleBox>지금 당신이 당첨될 확률은?</TitleBox>
              <DonutChart participant={raffle.applyCount} />
              <InfoContainer>
                <ParticipantBox>
                  현재 참여자 수 : {raffle.applyCount}명
                </ParticipantBox>
                <ParticipantBox>
                  판매자 희망 최소 참여자 : {raffle.minUser}명
                </ParticipantBox>
              </InfoContainer>
            </CenteredContainer>
          )}
          {(raffle.isWinner === 'yes' || raffle.isWinner === 'no') && (
            <CenteredContainer>
              <TitleBox>해당 래플은 종료되었습니다</TitleBox>
              <DonutText text="래플 종료" />
            </CenteredContainer>
          )}
        </>
      )}
      {raffle.raffleStatus === 'FINISHED' &&
        raffle.applyCount < raffle.minUser && ( //DRAW 확인 전
          <FailedContainer>
            래플 종료
            <FailedBox>
              해당 래플은 판매자 희망 최소 참여자 이상 모이지 않아
              취소되었습니다. 취소된 래플에 대한 티켓은 다시 적립됩니다.
            </FailedBox>
          </FailedContainer>
        )}
      {raffle.raffleStatus === 'UNFULFILLED' && (
        <LessContainer>
          <img src={icMark} alt={'icMark'} />
          <LessBox>
            해당 래플은 판매자가 설정한 최소 참여자 수에 미치지 못해, 현재
            판매자가 당첨자 선정 여부를 결정해야 하는 대기 상태에 있습니다.
          </LessBox>
        </LessContainer>
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

const UnOpenContainer = styled.div`
  width: 285px;
  height: 195px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 18px;
  box-sizing: border-box;

  border: 1px solid #8f8e94;
`;

const UnOpenBox = styled.div`
  display: flex;
  width: 234px;
  height: 83px;
  flex-direction: column;
  justify-content: center;
  margin: 12px auto 26px auto;
  box-sizing: border-box;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
`;

const LessContainer = styled.div`
  width: 285px;
  height: 233px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 18px;
  box-sizing: border-box;
  border: 1px solid #8f8e94;
`;

const LessBox = styled.div`
  display: flex;
  width: 234px;
  height: 120.908px;
  flex-direction: column;
  justify-content: center;
  margin: 12px auto 26px auto;
  box-sizing: border-box;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
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

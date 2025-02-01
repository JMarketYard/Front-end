import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import { useUser } from '../../components/RaffleDetail/context/userContext';
import styled from 'styled-components';
import Item from './components/Item';
import Market from './components/Market';
import Probability from './components/Probability';
import { raffleData } from '../../mocks/RaffleData';

type Role = 'p' | 'np' | 'h';
type Winner = 'y' | 'n' | 'idk';
type Result = 'success' | 'less' | 'failed';

const RaffleDetailPage = () => {
  const [role, setRole] = useState<Role>('np'); // 기본값: 미참여자
  const [winner, setWinner] = useState<Winner>('idk');
  const [result, setResult] = useState<Result>('success');
  const raffle = raffleData[1]; // 예제 데이터 사용
  const [participant, setParticipant] = useState(raffle.participant);
  const countParticipant = () => {
    setParticipant((prev) => prev + 1);
  };

  return (
    <Wrapper>
      <Item
        {...raffle}
        role={role}
        setRole={setRole}
        winner={winner}
        result={result}
        participant={participant}
        countParticipant={countParticipant}
      />
      <MoreInfoLayout>
        <Market {...raffle} />
        <Probability
          {...raffle}
          participant={participant}
          role={role}
          result={result}
          winner={winner}
        />
      </MoreInfoLayout>
    </Wrapper>
  );
};

export default RaffleDetailPage;

const Wrapper = styled.div`
  width: 1080px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 63px;
  margin: 0 auto;
`;

const MoreInfoLayout = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 157px;
`;

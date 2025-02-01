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
  const [role, setRole] = useState<Role>('p'); // 기본값: 미참여자
  const [winner, setWinner] = useState<Winner>('y');
  const [result, setResult] = useState<Result>('failed');
  const raffle = raffleData[0]; // 예제 데이터 사용

  return (
    <Wrapper>
      <Item
        {...raffle}
        role={role}
        setRole={setRole}
        winner={winner}
        result={result}
      />
      <MoreInfoLayout>
        <Market {...raffle} />
        <Probability {...raffle} role={role} result={result} winner={winner} />
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

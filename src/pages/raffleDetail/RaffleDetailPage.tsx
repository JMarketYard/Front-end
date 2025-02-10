import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './components/Item';
import Market from './components/Market';
import Probability from './components/Probability';
import { raffleData } from '../../mocks/RaffleData';
import axiosInstance from '../../apis/axiosInstance';
import { useParams, useLocation } from 'react-router-dom';
import RaffleDetailProps from '../../components/RaffleDetailProps';

const RaffleDetailPage: React.FC<RaffleDetailProps> = () => {
  const { type } = useParams<{ type?: string }>();
  // const [participant, setParticipant] = useState(raffle.participant);
  const [raffleData, setRaffleData] = useState<RaffleDetailProps | null>(null);

  const typeNumber = type ? parseInt(type, 10) : undefined;

  useEffect(() => {
    console.log('래플 상세보기 useEffect');
    const fetchRaffleData = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/permit/raffles/${typeNumber}`,
        );

        console.log('API Response:', data.result);
        setRaffleData(data.result);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };

    fetchRaffleData();
  }, []);

  return (
    <Wrapper>
      <Item {...raffleData} />
      <MoreInfoLayout>
        <Market />
        <Probability {...raffleData} />
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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './components/Item';
import Market from './components/Market';
import Probability from './components/Probability';
import { raffleData } from '../../mocks/RaffleData';
import axiosInstance from '../../apis/axiosInstance';
import { useParams, useLocation } from 'react-router-dom';
import RaffleDetailProps from '../../components/RaffleDetailProps';
import { TRaffleDetail } from '../../types/raffleDetails';

const RaffleDetailPage: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [raffleData, setRaffleData] = useState<RaffleDetailProps>({
    imageUrls: [],
    name: '',
    category: '',
    ticketNum: 0,
    startAt: '',
    endAt: '',
    description: '',
    minUser: 0,
    view: 0,
    likeCount: 0,
    applyCount: 0,
    nickname: '',
    followCount: 0,
    reviewCount: 0,
    userStatus: '',
    isWinner: '',
    raffleStatus: '',
    deliveryId: 0,
  });

  const typeNumber = type ? parseInt(type, 10) : undefined;

  useEffect(() => {
    console.log('래플 상세보기 useEffect');
    const fetchRaffleData = async () => {
      try {
        const { data }: { data: TRaffleDetail } = await axiosInstance.get(
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
        <Market {...raffleData} type={type} />
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

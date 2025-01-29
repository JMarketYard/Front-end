// pages/raffleDetail/RaffleDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from './userContext';
import 

type Raffle = {
  id: string;
  title: string;
  description: string;
  participants: string[];
  hostId: string;
};

// 🌟 가짜 래플 데이터 (API 없이 UI 개발 가능)
const mockRaffle: Raffle = {
  id: 'raffle-1',
  title: '테스트 래플 이벤트 🎉',
  description: '이 래플은 백엔드 없이 UI만 테스트하기 위해 만들어졌습니다.',
  participants: ['123', '456'], // 참가자 목록
  hostId: '789', // 개최자 ID
};

const RaffleDetail = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 래플 ID 가져오기
  const { user } = useUser();
  const [raffle, setRaffle] = useState<Raffle | null>(null);

  useEffect(() => {
    // 🌟 백엔드 없을 때 가짜 데이터로 채우기
    setTimeout(() => {
      setRaffle(mockRaffle);
    }, 500);
  }, [id]);

  if (!raffle) return <p>로딩 중...</p>;
  if (!user) return <p>로그인이 필요합니다.</p>;

  const isHost = user.id === raffle.hostId;
  const isParticipant = raffle.participants.includes(user.id);

  return (
    <div>
      <h1>{raffle.title}</h1>
      <p>{raffle.description}</p>

      {isHost && <HostView raffle={raffle} />}
      {!isHost && isParticipant && <ParticipantView raffle={raffle} />}
      {!isHost && !isParticipant && <NonParticipantView raffle={raffle} />}
    </div>
  );
};

const HostView = ({ raffle }: { raffle: Raffle }) => (
  <div>
    <h2>당신이 개최한 래플입니다.</h2>
    <p>참여자 목록:</p>
    <ul>
      {raffle.participants.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
    <button>래플 종료</button>
  </div>
);

const ParticipantView = ({ raffle }: { raffle: Raffle }) => (
  <div>
    <h2>당첨을 기다려 주세요!</h2>
    <p>이 래플에 참여하셨습니다.</p>
  </div>
);

const NonParticipantView = ({ raffle }: { raffle: Raffle }) => (
  <div>
    <h2>이 래플에 참여하시겠습니까?</h2>
    <button>참여하기</button>
  </div>
);

export default RaffleDetail;

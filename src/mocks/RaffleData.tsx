const getRaffleStatus = (closeTime: string): 'ongoing' | 'ended' => {
  return new Date(closeTime).getTime() > Date.now() ? 'ongoing' : 'ended';
};

export const raffleData = [
  {
    id: 1,
    marketId: 'm1',
    images: ['1', '2', '3', '4'], // ✅ image -> images (리스트로 변경)
    name: '한정판 스니커즈',
    ticket: 3,
    category: '신발',
    openTime: '2025-01-29T10:00:00Z',
    closeTime: '2025-01-30T22:00:00Z',
    description:
      '최고급 가죽과 세련된 디자인을 자랑하는 한정판 스니커즈입니다.',
    participant: 7,
    atLeastParticipant: 5,
    view: 25,
    like: 4,
    raffleStatus: 'ended', // ✅ 상태 자동 설정
  },
  {
    id: 2,
    marketId: 'm2',
    images: ['1', '2', '3', '4'], // ✅ 변경
    name: '럭셔리 시계',
    ticket: 5,
    category: '악세서리',
    openTime: '2025-02-03T09:00:00Z',
    closeTime: '2025-02-07T23:59:59Z',
    description: '고급스러운 디자인과 정교한 무브먼트가 특징인 시계입니다.',
    participant: 9,
    atLeastParticipant: 6,
    view: 47,
    like: 10,
    raffleStatus: getRaffleStatus('2025-02-07T23:59:59Z'),
  },
  {
    id: 3,
    marketId: 'm3',
    images: ['1', '2', '3', '4'], // ✅ 변경
    name: '프리미엄 백팩',
    ticket: 2,
    category: '가방',
    openTime: '2025-02-02T12:00:00Z',
    closeTime: '2025-02-06T20:00:00Z',
    description:
      '편안한 착용감과 넉넉한 수납공간을 제공하는 프리미엄 백팩입니다.',
    participant: 6,
    atLeastParticipant: 4,
    view: 53,
    like: 2,
    raffleStatus: getRaffleStatus('2025-02-06T20:00:00Z'),
  },
  {
    id: 4,
    marketId: 'm4',
    images: ['1', '2', '3', '4'], // ✅ 변경
    name: '스마트폰',
    ticket: 4,
    category: '전자기기',
    openTime: '2025-02-04T08:00:00Z',
    closeTime: '2025-02-08T21:00:00Z',
    description: '최신 기술이 적용된 고성능 스마트폰입니다.',
    participant: 8,
    atLeastParticipant: 7,
    view: 92,
    like: 15,
    raffleStatus: getRaffleStatus('2025-02-08T21:00:00Z'),
  },
];

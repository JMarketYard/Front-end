import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import moreList from '../assets/homePage/moreList.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Raffle {
  raffleId: number;
  imageUrl: string;
  name: string;
  ticketNum: number;
  timeUntilEnd: number;
  finish: boolean;
  participantNum: number;
  like: boolean;
}

interface HomeSectionProps {
  title: string;
  icon: string;
  apiKey: string;
  moreLink: string;
  products: Raffle[];
}

const RaffleListPage: React.FC<HomeSectionProps> = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const [title, setTitle] = useState<string>('래플 리스트');
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [page, setPage] = useState(1);

  const fetchMoreProducts = () => {
    const newProducts = Array(16)
      .fill(null)
      .map((_, index) => ({
        raffleId: raffles.length + index + 1, // ✅ raffleId 적용
        imageUrl: 'https://via.placeholder.com/150',
        name: `상품 ${raffles.length + index + 1}`,
        ticketNum: Math.floor(Math.random() * 100) + 1, // ✅ 랜덤 티켓 수
        timeUntilEnd: Math.floor(Math.random() * 5000) + 100, // ✅ 랜덤 시간 (초 단위)
        finish: false, // ✅ 기본값으로 false 설정
        participantNum: Math.floor(Math.random() * 10) + 1, // ✅ 랜덤 참가자 수
        like: Math.random() > 0.5, // ✅ 50% 확률로 좋아요 설정
      }));

    setRaffles((prevProducts) => [...prevProducts, ...newProducts]); // ✅ 기존 데이터에 추가
  };

  // 스크롤 감지 및 페이지 증가
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 페이지 변경 시 새로운 데이터 로드
  useEffect(() => {
    fetchMoreProducts();
  }, [page]);

  useEffect(() => {
    // 페이지 제목 설정
    switch (type) {
      // case `${apiKey}` :
      //   setTitle(`${title}`);

      case 'approaching':
        setTitle('마감임박 래플');
        break;
      case 'likes':
        setTitle('내가 찜한 래플');
        break;
      case 'following':
        setTitle('팔로우한 상점의 래플');
        break;
      case 'more':
        setTitle('래플 둘러보기');
        break;
      case 'category':
        setTitle('카테고리별 상품');
        break;
      default:
        setTitle('래플 둘러보기');
    }
    const fetchRaffleData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/permit/home/${type}`,
      );
      console.log('API Response:', data.result.raffles);
      setRaffles(data.result.raffles);
    };

    fetchRaffleData();
  }, [type]); // `type` 또는 `search`가 변경될 때마다 실행

  return (
    <Wrapper>
      <LookAroundContainer>
        <LookAroundBox>{title}</LookAroundBox>
        {title === 'following' && (
          <MoreListBox onClick={() => navigate('/')}>
            팔로우하는 상점 목록
            <img src={moreList} alt="moreList" />
          </MoreListBox>
        )}
      </LookAroundContainer>

      <Horizon />

      <ProductGrid>
        {(raffles ?? []).map((product) => (
          <ProductCard key={product.raffleId} {...product} />
        ))}
      </ProductGrid>

      <Observer ref={observerRef} />
    </Wrapper>
  );
};

export default RaffleListPage;

const Wrapper = styled.div`
  width: 1080px;
  min-height: 1498px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 63px;
`;

const LookAroundContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LookAroundBox = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MoreListBox = styled.a`
  width: 250px;
  height: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 36.832px; /* 230.199% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;

  img {
    width: 10px;
    height: 17px;
    margin-left: 35px;
  }

  cursor: pointer;
`;

const Horizon = styled.hr`
  width: 100%;
  border-top: 1px solid #8f8e94;
  margin-top: 42px;
  margin-bottom: 46px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  gap: 44px;
  width: 100%;
  max-width: 1080px;
`;

const Observer = styled.div`
  width: 100%;
  height: 20px;
`;

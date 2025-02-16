import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import moreList from '../../assets/homePage/moreList.svg';
import axiosInstance from '../../apis/axiosInstance';
import RaffleProps from '../../types/RaffleProps';

const RaffleListPage: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const [title, setTitle] = useState<string>('래플 리스트');
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [raffles, setRaffles] = useState<RaffleProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreProducts = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/api/permit/home/${type}`, {});

      const startIndex = (page - 1) * 16;
      const endIndex = startIndex + 16;
      const newRaffles = data.result.raffles.slice(startIndex, endIndex);

      console.log('API 응답 자른 데이터 개수:', newRaffles.length);
      console.log('API 응답 데이터:', newRaffles);

      if (newRaffles.length < 16) {
        setRaffles((prev) => [...prev, ...newRaffles]);
        setHasMore(false);
      } else {
        setRaffles((prev) => [...prev, ...newRaffles]);
      }
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        } else {
          console.log('hasmore:', hasMore);
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  // 페이지 변경 시 새로운 데이터 로드
  useEffect(() => {
    if (!hasMore) return;
    fetchMoreProducts();
  }, [page]);

  useEffect(() => {
    // 페이지 제목 설정
    switch (type) {
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
        {(raffles ?? []).map((raffle) => (
          <ProductCard key={raffle.raffleId} {...raffle} />
        ))}
      </ProductGrid>

      {hasMore && <Observer ref={observerRef} />}
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

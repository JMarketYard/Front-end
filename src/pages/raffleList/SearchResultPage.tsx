import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import RaffleProps from '../../components/RaffleProps';
import axiosInstance from '../../apis/axiosInstance';

const SearchResultPage: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [title, setTitle] = useState<string>('검색');
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [raffles, setRaffles] = useState<RaffleProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoreProducts = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await axiosInstance.get('/api/permit/search/raffles', {
        params: { page, limit: 16 },
      });

      if (data.length < 16) {
        setHasMore(false);
      } else {
        setRaffles((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.error('데이터를 불러오기 실패:', error);
    } finally {
      setIsLoading(false);
    }
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
    const fetchRaffleData = async () => {
      const { data } = await axiosInstance.get(`/api/permit/home/${type}`);
      console.log('API Response:', data.result.raffles);
      setRaffles(data.result.raffles);
    };

    fetchRaffleData();
  }, [type]);

  return (
    <Wrapper>
      <LookAroundContainer>
        <LookAroundBox>{title}</LookAroundBox>
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

export default SearchResultPage;

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

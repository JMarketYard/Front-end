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
        params: { keyword: type, page, limit: 16 },
      });
      const newRaffles = data.result.raffles;
      if (newRaffles.length < 16) {
        setHasMore(false);
      } else {
        setRaffles((prev) => [...prev, ...newRaffles]);
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
      const { data } = await axiosInstance.get('/api/permit/search/raffles', {
        params: { keyword: type, page, limit: 16 },
      });
      const newRaffles = data.result.raffles;
      console.log('API Response:', newRaffles);
      setRaffles(newRaffles);
    };

    fetchRaffleData();
  }, [type]);

  return (
    <Wrapper>
      <SearchContainer>
        <KeywordBox>'{type}'</KeywordBox>
        <SearchBox>검색 결과</SearchBox>
      </SearchContainer>

      <ProductGrid>
        {(raffles ?? []).map((newRaffles) => (
          <ProductCard key={newRaffles.raffleId} {...newRaffles} />
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
  padding-top: 64px;
  position: relative;
`;

const SearchContainer = styled.div`
  position: absolute;
  left: 0px;

  display: inline-flex;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 11px;
  border: 1px solid #8f8e94;

  margin-bottom: 44px;
`;

const KeywordBox = styled.div`
  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 184.159% */
`;

const SearchBox = styled.div`
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 36.832px;
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

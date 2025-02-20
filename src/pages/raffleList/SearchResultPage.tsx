import { useState, useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import RaffleProps from '../../types/RaffleProps';
import axiosInstance from '../../apis/axiosInstance';
import { useAuth } from '../../context/AuthContext';
import { useIsSearchCompleted } from '../../store/store';

const SearchResultPage: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [raffles, setRaffles] = useState<RaffleProps[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const isSearchCompleted = useIsSearchCompleted((v) => v.isSearchCompleted);
  const setIsCompleted = useIsSearchCompleted((v) => v.setIsSearchCompleted);

  const fetchMoreProducts = async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const apirequest = isAuthenticated
        ? '/api/member/search/raffles'
        : '/api/permit/search/raffles';

      const { data } = await axiosInstance.get(apirequest, {
        params: { keyword: type },
      });
      setIsCompleted(!isSearchCompleted); // Zustand 상태 업데이트

      const startIndex = (page - 1) * 16;
      const endIndex = startIndex + 16;
      const newRaffles = data.result.searchedRaffles.slice(
        startIndex,
        endIndex,
      );

      console.log('검색어:', type);

      if (newRaffles.length < 16) {
        setRaffles((prev) => [...prev, ...newRaffles]);
        setHasMore(false);
      } else {
        setRaffles((prev) => [...prev, ...newRaffles]);
      }
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }
     finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setRaffles([]);
    setPage(1);
    setHasMore(true);
    fetchMoreProducts();
  }, [type]);

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
  align-items: flex-start;
  flex-direction: column;
  padding-top: 64px;
  gap: 45px;
`;

const SearchContainer = styled.div`
  display: inline-flex;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 11px;
  border: 1px solid #8f8e94;
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
  /* margin-top: 145px; */
`;

const Observer = styled.div`
  width: 100%;
  height: 20px;
`;

import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import moreList from '../assets/homePage/moreList.svg';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const RaffleListPage: React.FC = () => {
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  // ✅ 가짜 데이터 생성
  const fetchMoreProducts = () => {
    const newProducts = Array(16)
      .fill(null)
      .map((_, index) => ({
        id: products.length + index + 1,
        name: `상품 ${products.length + index + 1}`,
        price: Math.floor(Math.random() * 10000) + 1000,
        imageUrl: 'https://via.placeholder.com/150',
      }));

    setProducts((prev) => [...prev, ...newProducts]);
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

  return (
    <Wrapper>
      <LookAroundContainer>
        <LookAroundBox>래플 둘러보기</LookAroundBox>
        <MoreListBox onClick={() => navigate('/')}>
          팔로우하는 상점 목록
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </LookAroundContainer>

      <Horizon />

      <ProductGrid>
        {products.map((product) => (
          <ProductCard
            id={product.id}
            onClick={() => navigate('/raffle-detail')}
          />
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

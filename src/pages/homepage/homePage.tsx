import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdBanner from './components/AdBanner';
import HomeSection from './components/HomeSection';
import clockIcon from '../../assets/homePage/clock.svg';
import likeIcon from '../../assets/homePage/like.svg';
import followIcon from '../../assets/homePage/follow.svg';
import moreList from '../../assets/homePage/moreList.svg';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Product {
  raffleId: number;
  imageUrl: string;
  name: string;
  ticketNum: number;
  timeUntilEnd: number;
  finish: boolean;
  participantNum: number;
  like: boolean;
}

interface HomeData {
  approaching: Product[];
  myLikeRaffles: Product[] | null; // ✅ 로그인 안 했을 경우 null 가능
  myFollowRaffles: Product[] | null; // ✅ 로그인 안 했을 경우 null 가능
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const products: null[] = Array(12).fill(null);
  const [homeData, setHomeData] = useState<HomeData | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('/api/permit/home');
        setHomeData(response.data.result);
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    fetchHomeData();
  }, []);

  if (!homeData) return <div>Loading...</div>;

  return (
    <>
      <AdBanner />
      <Wrapper>
        <HomeSection
          title="마감임박"
          icon={clockIcon}
          moreText="마감임박 상품 더보기"
          apiKey="approaching"
          moreLink="/approaching"
          products={homeData.approaching}
        />
        <HomeSection
          title="내가 찜한 래플"
          icon={likeIcon}
          moreText="내가 찜한 래플 더보기"
          apiKey="myLikeRaffles"
          moreLink="/my-likes"
          products={homeData.myLikeRaffles || []}
        />
        <HomeSection
          title="내가 팔로우한 상점"
          icon={followIcon}
          moreText="팔로우한 상점 래플 더보기"
          apiKey="myFollowRaffles"
          moreLink="/followed-stores"
          products={homeData.myFollowRaffles || []}
        />

        <LookAroundContainer>
          <LookAroundBox>래플 둘러보기</LookAroundBox>
          <MoreListBox onClick={() => navigate('/')}>
            래플 전체보기
            <img src={moreList} alt="moreList" />
          </MoreListBox>
        </LookAroundContainer>

        <Horizon />

        <ProductGrid>
          {products.map((_, index) => (
            <ProductCard key={index} />
          ))}
        </ProductGrid>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1080px;
  margin: 0 auto;
  align-items: center;
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

export default HomePage;

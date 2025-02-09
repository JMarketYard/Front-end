import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";
import BigTitle from "../../components/BigTitle";
import ProfileComponent from "../../components/ProfileComponent";
import { Link } from "react-router-dom";

const MyProfilePage: React.FC = () => {
  const [selectedToggle, setSelectedToggle] = useState("응모한 래플");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /** ✅ 더미 데이터 (10개 추가) */
  const dummyData = Array.from({ length: 10 }, (_, index) => ({
    raffle_id: index + 1,
    raffle_name: `상품 ${index + 1}`,
    raffle_image: "https://via.placeholder.com/200",
    ticket_num: Math.floor(Math.random() * 10) + 1,
    apply_num: Math.floor(Math.random() * 300) + 50,
    time_until_end: Math.floor(Math.random() * 86400),
    finished: Math.random() > 0.5,
    liked: Math.random() > 0.5,
  }));

  /** ✅ API 대신 더미 데이터 적용 */
  const fetchProducts = async () => {
    setLoading(true);
    try {
      setTimeout(() => {
        setProducts(dummyData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(`"${selectedToggle}" 데이터를 불러오는 중 오류 발생:`, error);
      setProducts([]);
      setLoading(false);
    }
  };

  /** ✅ 토글 변경 시 더미 데이터 업데이트 */
  useEffect(() => {
    fetchProducts();
  }, [selectedToggle]);

  return (
    <Container>
      <InnerContainer>
        <BigTitle>
          장마당 주최자
          <SettingsLink to="/mypage/setting">설정 및 내 정보 수정하기 &gt;</SettingsLink>
        </BigTitle>

        {/* ✅ 프로필 컴포넌트 */}
        <ProfileComponent
          username="송유림"
          followers={26}
          reviews={50}
          onEditProfile={() => alert("닉네임 변경")}
        />

        {/* ✅ 토글 버튼 */}
        <ToggleContainer>
          <ToggleIndicator selectedToggle={selectedToggle} />
          <ToggleOption
            selectedToggle={selectedToggle}
            value="응모한 래플"
            onClick={() => setSelectedToggle("응모한 래플")}
          >
            응모한 래플
          </ToggleOption>
          <ToggleOption
            selectedToggle={selectedToggle}
            value="주최하는 래플"
            onClick={() => setSelectedToggle("주최하는 래플")}
          >
            주최하는 래플
          </ToggleOption>
        </ToggleContainer>

        {/* ✅ 상품 목록 */}
        {loading ? (
          <LoadingMessage>상품을 불러오는 중...</LoadingMessage>
        ) : products.length > 0 ? (
          <ProductGrid>
            {products.map((product) => (
              <ProductCard
                key={product.raffle_id}
                raffleId={product.raffle_id}
                name={product.raffle_name}
                imageUrls={[product.raffle_image]}
                ticketNum={product.ticket_num}
                participantNum={product.apply_num}
                timeUntilEnd={product.time_until_end}
                finish={product.finished}
                like={product.liked}
              />
            ))}
          </ProductGrid>
        ) : (
          <NoProductsMessage>{selectedToggle}이 없습니다.</NoProductsMessage>
        )}
      </InnerContainer>
    </Container>
  );
};

export default MyProfilePage;

/* ✅ 전체 컨테이너 (가운데 정렬) */
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 1440px;
  background: white;
  margin-top: 64px;
`;

/* ✅ 내부 컨텐츠 중앙 배치 */
const InnerContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 0 20px;
`;



/* ✅ 네비게이션 링크 */
const SettingsLink = styled(Link)`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  font-weight: 400;
  color: #8f8e94;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

/* ✅ 토글 버튼 */
const ToggleContainer = styled.div`
  position: relative;
  width: 946px;
  height: 58px;
  flex-shrink: 0;
  border-radius: 50px;
  background: #f5f5f5;
  margin: 50px auto 76px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
`;

const ToggleIndicator = styled.div<{ selectedToggle: string }>`
  position: absolute;
  width: 50%;
  height: 100%;
  background: #c908ff;
  border-radius: 50px;
  top: 0;
  left: ${({ selectedToggle }) => (selectedToggle === "응모한 래플" ? "0" : "50%")};
  transition: left 0.3s ease;
`;

const ToggleOption = styled.div<{ selectedToggle: string; value: string }>`
  flex: 1;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  color: ${({ selectedToggle, value }) => (selectedToggle === value ? "#fff" : "#c908ff")};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  gap: 44px;
  width: 100%;
  max-width: 1080px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 19.2px;
  color: #666;
  margin-top: 20px;
`;

const NoProductsMessage = styled.div`
  text-align: center;
  font-size: 19.2px;
  color: #999;
  margin-top: 20px;
`;

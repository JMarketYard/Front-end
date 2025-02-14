import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";
import BigTitle from "../../components/BigTitle";
import ProfileComponent from "../../components/ProfileComponent";
import NameEditModal from "../../components/Modal/modals/NameEditModal";
import { Link } from "react-router-dom";
import axiosInstance from "../../apis/axiosInstance";

const MyProfilePage: React.FC = () => {
  const [selectedToggle, setSelectedToggle] = useState("응모한 래플");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState<string>("");
  const [followerNum, setFollowerNum] = useState<string>("-");
  const [reviewNum, setReviewNum] = useState<string>("-");
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 관리

  const fetchProfileData = async (toggle: string) => {
    setLoading(true);
    try {
      const endpoint =
        toggle === "응모한 래플" ? "/api/member/mypage" : "/api/member/myRaffles";
      const { data } = await axiosInstance.get(endpoint);

      if (data.isSuccess) {
        setNickname(data.result.nickname || "-");
        setFollowerNum(data.result.followerNum?.toString() || "-");
        setReviewNum(data.result.reviewNum?.toString() || "-");
        setProducts(data.result.raffles || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(`"${toggle}" 데이터를 불러오는 중 오류 발생:`, error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData(selectedToggle);
  }, [selectedToggle]);

  const handleModalClose = () => setIsModalOpen(false);

  return (
    <Container>
      <InnerContainer>
        <BigTitle>
          장마당 주최자
          <SettingsLink to="/mypage/setting">설정 및 내 정보 수정하기 &gt;</SettingsLink>
        </BigTitle>

        <ProfileComponent
          username={nickname || "-"}
          followers={parseInt(followerNum) || 0}
          reviews={parseInt(reviewNum) || 0}
          onEditProfile={() => setIsModalOpen(true)} // ✅ 모달 열기
        />

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

        {/* ✅ 닉네임 변경 모달 */}
        {isModalOpen && (
          <NameEditModal onClose={handleModalClose} currentNickname={nickname} />
        )}
      </InnerContainer>
    </Container>
  );
};

export default MyProfilePage;

/* ✅ 스타일링 */
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 1440px;
  background: white;
  margin-top: 64px;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 0 20px;
`;

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

const ToggleContainer = styled.div`
  position: relative;
  width: 946px;
  height: 58px;
  border-radius: 50px;
  background: #f5f5f5;
  margin: 50px auto 76px;
  display: flex;
  align-items: center;
  cursor: pointer;
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

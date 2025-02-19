import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import BigTitle from '../../components/BigTitle';
import ProfileComponent from '../../components/ProfileComponent';
import NameEditModal from '../../components/Modal/modals/NameEditModal';
import axiosInstance from '../../apis/axiosInstance';

interface ProfileData {
  nickname: string;
  followerNum: number;
  reviewNum: number;
  raffles: any[];
}

const MyProfilePage: React.FC = () => {
  const [selectedToggle, setSelectedToggle] = useState('응모한 래플');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNameEditModalOpen, setIsNameEditModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const endpoint =
        selectedToggle === "응모한 래플" ? "/api/member/mypage" : "/api/member/mypage/myRaffles";
      const { data } = await axiosInstance.get(endpoint);
  
      console.log("API 응답 데이터:", data); // 디버깅을 위해 로그 확인
  
      if (data.isSuccess) {
        setProfileData({
          nickname: data.result.nickname || "-",
          followerNum: data.result.followerNum || 0,
          reviewNum: data.result.reviewNum || 0,
          raffles: data.result.raffles ?? [],
        });
      } else {
        setProfileData(null);
      }
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProfileData();
  }, [selectedToggle]);

  const handleNicknameChange = (newNickname: string) => {
    if (profileData) {
      setProfileData((prev) => (prev ? { ...prev, nickname: newNickname } : null));
    }
    setIsNameEditModalOpen(false);
  };

  return (
    <Container>
      <InnerContainer>
        <BigTitle>
          장마당 주최자
          <SettingsLink to="/mypage/setting">설정 및 내 정보 수정하기 &gt;</SettingsLink>
        </BigTitle>
  
        {/* ✅ 프로필 컴포넌트는 항상 표시됨 */}
        {profileData && (
          <ProfileComponent
            username={profileData.nickname}
            followers={profileData.followerNum}
            reviews={profileData.reviewNum}
            onEditProfile={() => setIsNameEditModalOpen(true)}
          />
        )}
  
        {/* ✅ 토글 버튼 */}
        <ToggleContainer>
          <ToggleIndicator selectedToggle={selectedToggle} />
          <ToggleOption
            selectedToggle={selectedToggle}
            value="응모한 래플"
            onClick={() => setSelectedToggle('응모한 래플')}
          >
            응모한 래플
          </ToggleOption>
          <ToggleOption
            selectedToggle={selectedToggle}
            value="주최하는 래플"
            onClick={() => setSelectedToggle('주최하는 래플')}
          >
            주최하는 래플
          </ToggleOption>
        </ToggleContainer>
  
        {loading ? (
          <LoadingMessage>상품을 불러오는 중...</LoadingMessage>
        ) : profileData && profileData.raffles.length > 0 ? (
          <ProductGrid>
            {profileData.raffles.map((product) => (
              <ProductCard
                key={product.raffleId}
                raffleId={product.raffleId}
                name={product.raffleName}
                imageUrls={product.raffleImage ? [product.raffleImage] : [""]}
                ticketNum={product.ticketNum}
                participantNum={product.applyNum}
                timeUntilEnd={Number(product.timeUntilEnd) || 0}
                finish={product.finished}
                like={product.liked}
              />
            ))}
          </ProductGrid>
        ) : (
          <NoProductsMessage>{selectedToggle}이 없습니다.</NoProductsMessage>
        )}
      </InnerContainer>
  
      {isNameEditModalOpen && profileData && (
        <NameEditModal
          currentNickname={profileData.nickname || '-'}
          onClose={() => setIsNameEditModalOpen(false)}
          onNicknameChange={handleNicknameChange}
        />
      )}
    </Container>
  );
  


};

export default MyProfilePage;

/* ✅ 스타일 */
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
  left: ${({ selectedToggle }) => (selectedToggle === '응모한 래플' ? '0' : '50%')};
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
  color: ${({ selectedToggle, value }) => (selectedToggle === value ? '#fff' : '#c908ff')};
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

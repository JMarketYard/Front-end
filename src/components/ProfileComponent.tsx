import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ 추가
import styled from "styled-components";
import platinum3 from "../assets/mypages/platinum3.svg";
import profileDefault from "../assets/mypages/profileDefault.svg";
import editProfile from "../assets/mypages/editProfile.svg";
 
interface ProfileProps {
  username: string;
  followers: number;
  reviews: number;
  onEditProfile: () => void;
}

const ProfileComponent: React.FC<ProfileProps> = ({
  username,
  followers,
  reviews,
  onEditProfile,
}) => {
  const [profileImage, setProfileImage] = useState<string>(profileDefault);
  const navigate = useNavigate(); // ✅ 네비게이션 훅 추가

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <ProfileWrapper>
      <ProfileContent>
        {/* ✅ 프로필 이미지 */}
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="Profile" />
          <EditIcon htmlFor="profile-upload">
            <img src={editProfile} alt="Edit Profile" />
          </EditIcon>
          <HiddenFileInput
            id="profile-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </ProfileImageWrapper>

        {/* ✅ 사용자 정보 */}
        <UserDetails>
          <UserInfo>
            <RankIcon src={platinum3} alt="Platinum Rank" />
            <Username>{username}</Username>
            <EditButton onClick={onEditProfile}>닉네임 변경하기</EditButton>
          </UserInfo>

          {/* ✅ 팔로워 & 후기 프레임 */}
          <StatsContainer>
            <StatItem>
              팔로워 <StatNumber>{followers}</StatNumber>
            </StatItem>
            <Divider />
            <StatItem>
              후기 <StatNumber>{reviews}</StatNumber>
            </StatItem>
          </StatsContainer>

          <ButtonContainer>
            <StyledButton onClick={() => navigate("/mypage/following-list")}>
              팔로잉 목록
            </StyledButton>
            <StyledButton onClick={() => navigate("/mypage/my-review")}>상점 후기</StyledButton> 
          </ButtonContainer>
        </UserDetails>
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default ProfileComponent;

/* ✅ 전체 컴포넌트 */
const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 117px;
`;

/* ✅ 프로필 이미지 + 정보 담는 프레임 */
const ProfileContent = styled.div`
  display: flex;
  width: 555px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

/* ✅ 프로필 이미지 */
const ProfileImageWrapper = styled.div`
  position: relative;
  width: 222px;
  height: 222px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

/* ✅ 파일 선택 숨기기 */
const HiddenFileInput = styled.input`
  display: none;
`;

/* ✅ 편집 아이콘 */
const EditIcon = styled.label`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
`;

/* ✅ 사용자 정보 (오른쪽) */
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

/* ✅ 닉네임 + 랭크 */
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 23px;
`;

const RankIcon = styled.img`
  width: 42px;
  height: 39px;
  flex-shrink: 0;
`;

const Username = styled.div`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;

/* ✅ 닉네임 변경 버튼 */
const EditButton = styled.button`
  font-size: 13px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  color: #666;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background: #f9f9f9;
  }
`;

/* ✅ 팔로워 & 후기 프레임 */
const StatsContainer = styled.div`
  display: flex;
  width: 238px;
  justify-content: space-between;
  align-items: center;
`;

/* ✅ 팔로워 & 후기 개수 */
const StatItem = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-family: Pretendard;
  color: #000;
`;

/* ✅ 팔로워 & 후기 숫자 색상 */
const StatNumber = styled.span`
  color: #c908ff;
  font-size: 20px;
  font-weight: 500;
`;

/* ✅ 팔로워 & 후기 사이 구분 바 */
const Divider = styled.div`
  width: 1px;
  height: 43px;
  background-color: #000;
`;

/* ✅ 버튼 컨테이너 */
const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

/* ✅ 버튼 (팔로잉 목록 & 상점 후기) */
const StyledButton = styled.button`
  width: 138px;
  height: 39px;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  text-align: center;
  border-radius: 9px;
  border: 1px solid #8f8e94;
  background: #fff;
  color: #000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #f9f9f9;
  }
`;

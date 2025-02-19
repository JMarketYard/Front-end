import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import platinum3 from "../assets/mypages/platinum3.svg";
import profileDefault from "../assets/mypages/profileDefault.svg";
import editProfile from "../assets/mypages/editProfile.svg";
import axiosInstance from "../apis/axiosInstance";

interface ProfileProps {
  username: string;
  followers: number;
  reviews: number;
  isUserProfilePage?: boolean;
  followStatus?: boolean;
}

const ProfileComponent: React.FC<ProfileProps> = ({
  username,
  followers,
  reviews,
  isUserProfilePage = false,
  followStatus,
}) => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const [profileImage, setProfileImage] = useState<string>(profileDefault);
  const [isFollowing, setIsFollowing] = useState<boolean>(followStatus ?? false);

  /** ✅ 프로필 데이터 조회 */
  const fetchProfileData = async () => {
    try {
      const endpoint = isUserProfilePage
        ? `/api/permit/mypage/${userId}`
        : `/api/member/mypage`;

      const response = await axiosInstance.get(endpoint);

      if (response.data.isSuccess) {
        const { profileImageUrl, followStatus } = response.data.result;

        setProfileImage(profileImageUrl && profileImageUrl.startsWith("http") ? profileImageUrl : profileDefault);
        setIsFollowing(followStatus ?? false); 
      } else {
        console.warn("⚠️ 프로필 데이터 로드 실패:", response.data.message);
      }
    } catch (error) {
      console.error("❌ 프로필 데이터 불러오기 오류:", error);
    }
  };


  useEffect(() => {
    fetchProfileData();
  }, [userId]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isUserProfilePage) return;

    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await axiosInstance.patch("/api/member/mypage/profile-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.isSuccess) {
        const imageUrl = response.data.result;
        setProfileImage(imageUrl && imageUrl.startsWith("http") ? imageUrl : profileDefault);
      } else {
        alert(response.data.message || "프로필 변경 실패");
      }
    } catch (error) {
      console.error("❌ 프로필 변경 오류:", error);
      alert("프로필 변경 중 오류 발생");
    }
  };

  /** ✅ 팔로우 / 언팔로우 토글 */
  const handleFollowToggle = async () => {
    try {
      const endpoint = isFollowing
        ? `/api/member/follow/cancel?storeId=${userId}`
        : `/api/member/follow?storeId=${userId}`;

      const response = await axiosInstance.post(endpoint);

      if (response.data.isSuccess) {
        setIsFollowing(!isFollowing);
      } else {
        alert(response.data.message || "작업 수행 실패");
      }
    } catch (error) {
      console.error("❌ 팔로우 변경 오류:", error);
      alert("팔로우 변경 중 오류 발생");
    }
  };

  return (
    <ProfileWrapper>
      <ProfileContent>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="Profile" />
          {!isUserProfilePage && (
            <>
              <EditIcon htmlFor="profile-upload">
                <img src={editProfile} alt="Edit Profile" />
              </EditIcon>
              <HiddenFileInput
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </>
          )}
        </ProfileImageWrapper>

        <UserDetails>
          <UserInfo>
            <RankIcon src={platinum3} alt="Platinum Rank" />
            <Username>{username}</Username>
          </UserInfo>

          <StatsContainer>
            <StatItem>
              팔로워 <StatNumber>{followers === -1 ? "비공개" : followers}</StatNumber>
            </StatItem>
            <Divider />
            <StatItem>후기 <StatNumber>{reviews}</StatNumber></StatItem>
          </StatsContainer>

          <ButtonContainer>
            {isUserProfilePage ? (
              <>
                <FollowButton isFollowing={isFollowing} onClick={handleFollowToggle}>
                  {isFollowing ? "팔로우 취소" : "팔로우하기"}
                </FollowButton>
                <StyledReportButton onClick={() => alert("신고하기 기능 준비 중입니다.")}>
                  신고하기
                </StyledReportButton>
              </>
            ) : (
              <>
                <StyledButton onClick={() => navigate("/mypage/following-list")}>
                  팔로잉 목록
                </StyledButton>
                <StyledButton onClick={() => navigate("/mypage/my-review")}>
                  상점 후기
                </StyledButton>
              </>
            )}
          </ButtonContainer>
        </UserDetails>
      </ProfileContent>
    </ProfileWrapper>
  );
};

export default ProfileComponent;

const FollowButton = styled.button<{ isFollowing: boolean }>`
  width: 138px;
  height: 39px;
  font-size: 16px;
  border-radius: 9px;
  border: 1px solid #c908ff;
  background: ${({ isFollowing }) => (isFollowing ? "#fff" : "#c908ff")};
  color: ${({ isFollowing }) => (isFollowing ? "#c908ff" : "#fff")};
  cursor: pointer;
`;

const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
`;

const StyledButton = styled.button`
  width: 138px;
  height: 39px;
  font-size: 16px;
  border-radius: 9px;
  border: 1px solid #8f8e94;
  background: #fff;
  cursor: pointer;
`;

const StyledReportButton = styled.button`
  width: 138px;
  height: 39px;
  font-size: 16px;
  border-radius: 9px;
  border: 1px solid #8f8e94;
  background: #fff;
  color: #8f8e94;
  cursor: pointer;

  &:hover {
    background: #ffebeb;
  }
`;
const ProfileContent = styled.div`
  display: flex;
  width: 555px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

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

const HiddenFileInput = styled.input`
  display: none;
`;

const EditIcon = styled.label`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

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
  font-size: 24px;
  font-weight: 700;
`;

const StatsContainer = styled.div`
  display: flex;
  width: 238px;
  justify-content: space-between;
  align-items: center;
`;

const StatItem = styled.div`
  font-size: 20px;
`;

const StatNumber = styled.span`
  color: #c908ff;
`;

const Divider = styled.div`
  width: 1px;
  height: 43px;
  background-color: #000;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;


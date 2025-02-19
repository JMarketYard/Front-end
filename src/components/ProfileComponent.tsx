import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import platinum3 from "../assets/mypages/platinum3.svg";
import profileDefault from "../assets/mypages/profileDefault.svg";
import editProfile from "../assets/mypages/editProfile.svg";
import NameEditModal from "./Modal/modals/NameEditModal"; 
import axiosInstance from "../apis/axiosInstance";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ DB에서 프로필 정보 가져오기
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get("/api/member/mypage");
      if (response.data.isSuccess) {
        const profileData = response.data.result;
        setProfileImage(profileData.profileImageUrl || profileDefault);
      } else {
        console.error("프로필 정보를 불러오는 데 실패했습니다:", response.data.message);
      }
    } catch (error) {
      console.error("프로필 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // ✅ 컴포넌트 마운트 시 프로필 데이터 가져오기
  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file);

    try {
      const response = await axiosInstance.patch("/api/member/mypage/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });

      console.log("프로필 변경 응답:", response.data);

      if (response.data.isSuccess) {
        setProfileImage(response.data.result); // ✅ 변경된 이미지 업데이트
      } else {
        alert(response.data.message || "프로필 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("프로필 변경 중 오류 발생:", error);
      alert("프로필 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <ProfileWrapper>
      <ProfileContent>
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

        <UserDetails>
          <UserInfo>
            <RankIcon src={platinum3} alt="Platinum Rank" />
            <Username>{username}</Username>
            <EditButton onClick={() => setIsModalOpen(true)}>닉네임 변경하기</EditButton>
          </UserInfo>

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
            <StyledButton onClick={() => navigate("/mypage/my-review")}>
              상점 후기
            </StyledButton>
          </ButtonContainer>
        </UserDetails>
      </ProfileContent>

      {isModalOpen && (
      <NameEditModal
          currentNickname={username}  // ✅ 현재 닉네임 전달
          onClose={() => setIsModalOpen(false)}
          onNicknameChange={(newNickname) => {
            setIsModalOpen(false); // ✅ 모달 닫기
            // ✅ 변경된 닉네임을 부모 컴포넌트에서 반영할 수 있도록 전달
            navigate(0); // 또는 상태를 업데이트하여 반영
          }}
        />
      )}
    </ProfileWrapper>
  );
};

export default ProfileComponent;


const ProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 117px;
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
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
  }
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
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
`;

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

const StatsContainer = styled.div`
  display: flex;
  width: 238px;
  justify-content: space-between;
  align-items: center;
`;

const StatItem = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-family: Pretendard;
  color: #000;
`;

const StatNumber = styled.span`
  color: #c908ff;
  font-size: 20px;
  font-weight: 500;
`;

const Divider = styled.div`
  width: 1px;
  height: 43px;
  background-color: #000;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

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

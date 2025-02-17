import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import FollowingItem from "../../components/FollowingItem";
import FollowNoModal from "../../components/Modal/modals/FollowNoModal";
import axiosInstance from "../../apis/axiosInstance";

const FollowingList: React.FC = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [followingList, setFollowingList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const fetchFollowingList = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get("/api/member/follow/list", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}` // ✅ Authorization 헤더 추가
        }
      });
  
      if (data.isSuccess) {
        setFollowingList(data.result); // ✅ API 응답 값 반영
      } else {
        setFollowingList([]); // ✅ 응답 실패 시 빈 배열 처리
      }
    } catch (error) {
      console.error("팔로잉 목록을 불러오는 중 오류 발생:", error);
      setFollowingList([]); // ✅ 에러 발생 시 빈 리스트
    } finally {
      setLoading(false);
    }
  };

  /** ✅ 팔로우 취소 */
  const handleUnfollow = async () => {
    const storeIdsToUnfollow = Object.keys(checkedItems)
      .filter((key) => checkedItems[parseInt(key, 10)])
      .map((key) => parseInt(key, 10));

    if (storeIdsToUnfollow.length === 0) {
      alert("선택된 팔로우가 없습니다.");
      return;
    }

    try {
      for (const storeId of storeIdsToUnfollow) {
        await axiosInstance.delete(`/api/following/unfollow?storeId=${storeId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
      }
      setModalMessage("팔로우가 취소되었습니다.");
      fetchFollowingList();
    } catch (error) {
      console.error("팔로우 취소 중 오류 발생:", error);
      setModalMessage("팔로우 취소에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setCheckedItems({});
      setIsDeleteMode(false);
    }
  };

  /** ✅ 체크 토글 */
  const handleToggle = (storeId: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [storeId]: !prev[storeId],
    }));
  };

  /** ✅ 페이지 로드 시 팔로잉 목록 조회 */
  useEffect(() => {
    fetchFollowingList();
  }, []);

  return (
    <Container>
      <BigTitleWrapper>
        <BigTitle>팔로잉 목록</BigTitle>
        <ButtonWrapper>
          {isDeleteMode ? (
            <>
              <DeleteButton onClick={handleUnfollow}>팔로우 취소</DeleteButton>
              <CancelButton onClick={() => setIsDeleteMode(false)}>선택 취소</CancelButton>
            </>
          ) : (
            <SelectButton onClick={() => setIsDeleteMode(true)}>선택</SelectButton>
          )}
        </ButtonWrapper>
      </BigTitleWrapper>

      <ListContainer>
        {loading ? (
          <LoadingMessage>팔로잉 목록을 불러오는 중...</LoadingMessage>
        ) : followingList.length > 0 ? (
          followingList.map((store) => (
            <FollowingItem
              key={store.storeId}
              username={`상점 ${store.storeId}`}
              profileImage={store.profileImg}
              isDeleteMode={isDeleteMode}
              isChecked={!!checkedItems[store.storeId]}
              onToggle={() => handleToggle(store.storeId)}
            />
          ))
        ) : (
          <NoItemsMessage>팔로우한 상점이 없습니다.</NoItemsMessage>
        )}
      </ListContainer>

      {modalMessage && (
        <FollowNoModal onClose={() => setModalMessage(null)} message={modalMessage} />
      )}
    </Container>
  );
};

export default FollowingList;

/* ✅ 스타일 */
const Container = styled.div`
  background: white;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
  margin-top: 64px;
`;

const BigTitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 10px;
`;

const SelectButton = styled.button`
  display: inline-flex;
  height: 31px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 11px;
  background: #c908ff;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  border: 1px solid #c908ff;
  display: inline-flex;
  height: 31px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  background: rgba(201, 8, 255, 0.2);
  color: #c908ff;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  display: inline-flex;
  height: 31px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  background: #c908ff;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px 108px;
  width: 100%;
  margin-top: 50px;
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 20px;
`;

const NoItemsMessage = styled.div`
  font-size: 16px;
  color: #999;
  margin-top: 20px;
`;

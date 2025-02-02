import styled from 'styled-components';
import moreList from '../../../assets/homePage/moreList.svg';
import { useNavigate } from 'react-router-dom';

interface ItemProps {
  id: number;
  images: string[];
  name: string;
  ticket: number;
  category: string;
  openTime: string;
  closeTime: string;
  description: string;
}

const Market = ({
  images,
  name,
  ticket,
  category,
  openTime,
  closeTime,
  description,
}: ItemProps) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <BigTitleBox>
        <TitleIcon />
        <div>상점 정보</div>

        <MoreListBox onClick={() => navigate('/')}>
          프로필 보기
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </BigTitleBox>
    </Wrapper>
  );
};

export default Market;

const Wrapper = styled.div`
  width: 666px;
`;

const BigTitleBox = styled.div`
  width: 100%;
  height: 53px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  color: #000;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TitleIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #c908ff;
  border-radius: 50%;
  margin-right: 52px;
`;

const MoreListBox = styled.a`
  width: 220px;
  height: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
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

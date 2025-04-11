import React from 'react';
import styled from 'styled-components';

const Footer: React.FC = () => {
  const menuItems = [
    '장마당 소개',
    '공지사항',
    '운영정책',
    '개인정보처리방침',
    '이용약관',
  ];

  return (
    <FooterContainer>
      <DividerLine />
      <FooterContent>
      <Menu>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            isLast={index === menuItems.length - 1}
            isFirst={index === 0} // 첫번째 메뉴만 패딩 없게
          >
            {item}
          </MenuItem>
        ))}
      </Menu>

        <InfoSection>
          <InfoBlock>
            <BoldText>장마당(주) 사업자정보</BoldText>
            <Line>대표 : 송유림 ㅣ 사업자등록번호 : 000-00-00000</Line>
            <Line>통신판매업신고 : 0000-경기김포-0000</Line>
            <Line>호스팅서비스 제공자 : Amazon Web Services (AWS)</Line>
          </InfoBlock>
          <InfoBlock>
            <Spacer />
            <Line>EMAIL : 000@jangmadang.com ㅣ FAX : 000-0000-0000</Line>
            <Line>주소 : 경기도 김포시 김포한강9로75번길 66</Line>
            <Line>대표전화 : 010-7689-6108</Line>
          </InfoBlock>
          <CustomerCenter>
            <CenterTitle>고객센터</CenterTitle>
            <PhoneText>010-7690-6108</PhoneText>
          </CustomerCenter>
        </InfoSection>
      </FooterContent>

      <FooterContent>
        <FooterBottom>
          <Notice>
            <Line>
              장마당은 온라인 거래를 중개하는 플랫폼으로서, 직접 상품을 판매하는 사업자가 아닙니다. 따라서, 전자상거래 등에서의 소비자 보호에 관한 법률 및 장마당의 이용 약관에 따라,
            </Line>
            <Line>
              상품의 등록, 정보 제공, 거래 및 그로 인한 책임은 모두 개별 판매자에게 귀속됩니다. 장마당은 회원 간 이루어지는 거래에 대해 직접적인 책임을 부담하지 않으며, 거래 과정에서
            </Line>
            <Line>
              발생하는 사항은 해당 판매자와 구매자 간의 계약에 따라 처리됩니다.
            </Line>
          </Notice>

          <LogoArea>
            <img src="/src/assets/header/icon-logo.svg" alt="장마당 로고" />
          </LogoArea>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 1440px;
  height: 420px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 202px auto 0;
  position: relative;
`;

const FooterContent = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  color: #8F8E94;
  font-size: 13px;
  box-sizing: border-box;
`;

const DividerLine = styled.div`
  position: absolute;
  top: 7px;
  left: 50%;
  width: 100vw;
  margin: 0 auto 16px auto;
  transform: translateX(-50%); //화면 넓이에 맞춰서 선이 이어지도록
  height: 1px;
  background-color: #ddd;
  margin-bottom: 16px;
`;

const Menu = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 32px;
`;

const MenuItem = styled.li<{ isLast: boolean }>`
  position: relative;
  margin-left: ${({ isFirst }) => (isFirst ? '0' : '120px')};
  font-weight: 400;
  cursor: pointer;
  color: #8F8E94;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: ${({ isLast }) => (isLast ? "''" : "'|'")};
    position: absolute;
    right: -65px;
    color: #8F8E94;
  }
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 60px;
  margin-bottom: 10px;
`;

const InfoBlock = styled.div`
  flex: none;
  line-height: 1.8;
  min-width: 300px;
`;

const CustomerCenter = styled.div`
  text-align: right;
  margin-left: auto;
`;

const CenterTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #8F8E94;
  margin-bottom: 8px;
  letter-spacing: -0.3px;
`;

const PhoneText = styled.div`
  font-size: 25px;
  font-weight: 700;
  color: #8F8E94;
  line-height: 1.3;
  letter-spacing: -0.5px;
`;

const BoldText = styled.div`
  color: #8F8E94;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.165px;
  margin-bottom: 20px;
`;

const Spacer = styled.div`
  height: 16px;
`;

const Line = styled.div`
  font-size: 13px;
  line-height: 27px;
`;

const FooterBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
`;

const Notice = styled.div`
  font-size: 12px;
  color: #8F8E94;
  line-height: 1.6;
  margin-bottom: 16px;
`;

const LogoArea = styled.div`
  text-align: right;

  img {
    height: 64px;
    filter: grayscale(1) brightness(0.2);
    opacity: 0.4;
  }
`;
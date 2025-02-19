import React, { useState } from "react";
import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import SmallTitle from "../../components/SmallTitle";

const Payment: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("1주일");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <Container>
      <TitleWrapper>
        <BigTitle>결제 정보 설정</BigTitle>
      </TitleWrapper>

      <Section>
        <Row>
          <SmallTitle>내 계좌</SmallTitle>
          <AccountText>환전 시 해당 계좌로 정산됩니다.</AccountText>
        </Row>
        <AccountInfo>
          <AccountNumber>1122189896208 부산은행</AccountNumber>
          <ChangeButton>계좌 변경하기</ChangeButton>
        </AccountInfo>
      </Section>

      <TitleWrapper>
        <BigTitle>충전/환전 내역 조회하기</BigTitle>
      </TitleWrapper>

      <Section2>
        <TabContainer>
          {["1주일", "한 달", "3개월", "6개월"].map((tab) => (
            <Tab key={tab}>
              <TabInner
                isActive={selectedTab === tab}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </TabInner>
            </Tab>
          ))}
        </TabContainer>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>구매일자</TableHeader>
              <TableHeader>구매수량</TableHeader>
              <TableHeader>결제수단</TableHeader>
              <TableHeader>금액</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>2024.12.26</TableCell>
                <TableCell>100개</TableCell>
                <TableCell>무통장입금</TableCell>
                <TableCell>10,000원</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Section2>
    </Container>
  );
};

export default Payment;

/* 스타일 */
const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
`;

const TitleWrapper = styled.div`
  z-index: 10;
`;

const Section = styled.div`
  width: 100%;
  margin-top: 66px;
  text-align: left;
  padding-left: 110px;
`;

const Section2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 66px;

`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  margin-top: 40px;
  margin-bottom: 77px;
`;

const AccountText = styled.div`
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const AccountNumber = styled.div`
  display: flex;
  padding: 9px 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
  background: #f5f5f5;
  color: #c908ff;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
`;

const ChangeButton = styled.button`
  display: flex;
  height: 26px;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  background-color: white;
  border: 1px solid #8f8e94;
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  line-height: 36.832px;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 488px;
  height: 71px;
  background: #f5f5f5;
  border-radius: 8px;
`;

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 135px;
  height: 71px;
  background: #f5f5f5;
  border-radius: 7px;
`;

const TabInner = styled.button<{ isActive: boolean }>`
  width: 103px;
  height: 53px;
  flex-shrink: 0;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 600;
  color: ${({ isActive }) => (isActive ? "#c908ff" : "#8f8e94")};
  background: ${({ isActive }) => (isActive ? "#ffffff" : "#f5f5f5")};
  border: none;
  border-radius: 7px;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
    color: #c908ff;
  }
`;

const Table = styled.table`
  width: 918px;
  border-collapse: collapse;
  margin-top: 60px;
  text-align: center;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  text-align: center;
  padding: 12px;
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 36.832px;
  border-bottom: 1px solid #8f8e94;
  width: 918px;
  height: 2px;
`;

const TableCell = styled.td`
  text-align: center;
  padding: 12px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 52.15px; /* 260.748% */
  border-bottom: 1px solid #e4e4e4;
  width: 858px;
  height: 1px;
`;


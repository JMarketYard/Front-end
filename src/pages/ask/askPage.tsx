import React from 'react';
import BigTitle from '../../components/BigTitle';
import styled from 'styled-components';

function AskPage() {
  return (
    <Container>
      <BigTitle>문의 게시판</BigTitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
`;

export default AskPage;

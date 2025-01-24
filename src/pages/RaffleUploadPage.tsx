import styled from "styled-components";

const RaffleUploadPage = () => {
    return (
        <UploadContainer>
            <div>상품 정보</div>
            <div>거래 설정</div>
            <button>업로드</button>
        </UploadContainer>
    );
};

export default RaffleUploadPage;

const UploadContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`
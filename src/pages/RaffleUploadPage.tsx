import styled from "styled-components";
import BigTitle from "../components/BigTitle";

const RaffleUploadPage = () => {
    return (
        <UploadForm>
            <div>
                <BigTitle>상품 정보</BigTitle>
                <ItemInfoContainer>
                    <ImgContainer>
                        <ImgSpan>상품 이미지</ImgSpan>
                        <div style={{backgroundColor:"grey", width:261, height:261}}>이미지</div>
                    </ImgContainer>
                    <ItemInfoRightContainer>
                        <div>
                            <TitleSpan>카테고리</TitleSpan>
                            <ItemCategorySelect>
                                <option value="">- - 선택하세요 - -</option>
                                <option value="women">여성의류</option>
                            </ItemCategorySelect>
                        </div>
                        <div>
                            <TitleSpan>상품명</TitleSpan>
                            <InputBox width={635} type="text" />
                        </div>
                        <div>
                            <TitleSpan>상태</TitleSpan>
                            <ConditionBtn>미개봉</ConditionBtn>
                            <ConditionBtn>새상품</ConditionBtn>
                            <ConditionBtn>상태</ConditionBtn>
                            <ConditionBtn>상</ConditionBtn>
                            <ConditionBtn>중</ConditionBtn>
                            <ConditionBtn>하</ConditionBtn>
                        </div>
                        <TextareaDiv>
                            <TitleSpan>설명</TitleSpan>
                            <Textarea />
                        </TextareaDiv>
                    </ItemInfoRightContainer>
                </ItemInfoContainer>
            </div>
            <div>
                <BigTitle>
                    거래 설정
                </BigTitle>
                <SetConditionContainer>
                    <SetConditionBox>
                        <TitleSpan2>응모 티켓 개수</TitleSpan2>
                            <ConditionBtn>1개</ConditionBtn>
                            <ConditionBtn>2개</ConditionBtn>
                            <ConditionBtn>3개</ConditionBtn>
                            <ConditionBtn>직접입력</ConditionBtn>
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>최소 마감 티켓 개수</TitleSpan2>
                        <InputBox type="text" />
                        
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>시작 일시</TitleSpan2>
                        <InputBox type="text" />
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>종료 일시</TitleSpan2>
                        <InputBox type="text" />
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>배송비</TitleSpan2>
                        <InputBox type="text" />
                    </SetConditionBox>
                </SetConditionContainer>
            </div>
            <SubmitBtn type="submit" value={"업로드"} />
        </UploadForm>
    );
};

export default RaffleUploadPage;


const UploadForm = styled.form`
    width: 1080px;
    min-height: 1498px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 63px;
`

const ItemInfoContainer = styled.div`
    display: flex;
    column-gap: 73px;
`

const ImgContainer = styled.div`
    padding-top: 44px;
`

const ImgSpan = styled.span`
    display: inline-block;
    color: #8F8E94;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 36.832px; /* 184.159% */
`

const ItemInfoRightContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 23px;
    padding-top: 77px;
`

const TitleSpan = styled.div`
    min-width: 100px;
    display: inline-block;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 36.832px; /* 184.159% */
`
const TitleSpan2 = styled.div`
    min-width: 221px;
    display: inline-block;
    color: #000;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 36.832px; /* 184.159% */
`

const ItemCategorySelect = styled.select`
    width: 635px;
    height: 45px;
    border-radius: 7px;
    border: 1px solid #8F8E94;
    color: #000;
    font-family: Pretendard;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 36.832px; /* 184.159% */
    padding: 0 5px;
`

const ConditionBtn = styled.button`
    padding: 0 14px;
    height: 37px;
    border-radius: 11px;
    border: 1px solid #8F8E94;
    background: transparent;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 36.832px; /* 184.159% */
    margin-right: 13px;
    &:hover {
        cursor: pointer;
    }
`

const Textarea = styled.textarea`
    width: 635px;
    height: 197px;
    resize: none;
`

const TextareaDiv = styled.div`
    display: flex;

`

const SetConditionContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 23px;
    align-items: center;
    padding-top: 60px;
`

const SetConditionBox = styled.div`
    width: 857px;
    display: flex;
`

const InputBox = styled.input<{width?:number}>`
    width: ${ props => props.width ? `${props.width}px` : '636px'};
    height: 45px;
    border-radius: 7px;
    border: 1px solid #8F8E94;
`

const SubmitBtn = styled.input`
    width: 424px;
    height: 57px;
    border: none;
    border-radius: 7px;
    background: #C908FF;
    color: white;
    text-align: center;
    font-family: Pretendard;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.165px;
    margin-top: 154px;
    &:hover {
        cursor: pointer;
    }
`
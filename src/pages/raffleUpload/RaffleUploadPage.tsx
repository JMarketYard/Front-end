import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import imgUpload from "../../assets/imgUpload.svg";
import imgArrow from "../../assets/imgSelectArrow.png";
import React, { ReactElement, useState } from "react";
import { useModalContext } from "../../components/Modal/context/ModalContext";
import UploadModal from "./components/UploadModal";
import TicketModal from "./components/TicketModal";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const RaffleUploadPage = () => {
    const itemStates = [
        { key: "state-1", text: "새상품" },
        { key: "state-2", text: "상태" },
        { key: "state-3", text: "상" },
        { key: "state-4", text: "중" },
        { key: "state-5", text: "하" },
    ];
    const tickets = [
        { key: "one", text: "1개" },
        { key: "two", text: "2개" },
        { key: "three", text: "3개" },
        { key: "more", text: "직접 입력" },
    ];
    const care = [
        { key: "care", text: "사용" },
        { key: "no", text: "미사용" }
    ];
    const [itemState, setItemState] = useState<string>("");
    const [ticketNum, setTicketNum] = useState<string>("");
    const [jcare, setJcare] = useState<string>("");
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const { openModal } = useModalContext();

    const handleTicketModal = () => {
        openModal(({ onClose }) => <TicketModal onClose={onClose} />);
    };

    const handleSubmit = (e:React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        openModal(({ onClose }) => <UploadModal onClose={onClose} />);
    };

    const handleItemState = (key:string) => {
        setItemState(key);
    };
    const handleTicketNum = (key:string) => {
        setTicketNum(key);
        if (key==="more") handleTicketModal();
    };
    const handleJcare = (key:string) => {
        setJcare(key);
    };

    return (
        <UploadForm>
            <div>
                <BigTitle>상품 정보</BigTitle>
                <ItemInfoContainer>
                    <ImgContainer>
                        <ImgSpan>상품 이미지</ImgSpan>
                        <ImgFileLabel htmlFor="img-file">
                            <ImgFileIcon src={imgUpload} />
                        </ImgFileLabel>
                        <InputImgFile
                        type="file"
                        id="img-file"
                        accept="image/*"
                        multiple
                        />
                    </ImgContainer>
                    <ItemInfoRightContainer>
                        <div>
                            <TitleSpan>카테고리</TitleSpan>
                            <ItemCategorySelect>
                                <option value="">- - 선택하세요 - -</option>
                                <option value="women">여성의류</option>
                                <option value="men">남성의류</option>
                                <option value="shoes">신발</option>
                                <option value="accessories">악세사리</option>
                                <option value="digital">디지털</option>
                                <option value="appliances">가전제품</option>
                                <option value="sports">스포츠/레저</option>
                                <option value="vehicle">차량/오토바이</option>
                                <option value="md">굿즈</option>
                                <option value="art">예술/희귀/수집품</option>
                                <option value="music">음반/악기</option>
                                <option value="stationery">도서/티켓/문구</option>
                                <option value="beauty">뷰티</option>
                                <option value="interior">인테리어</option>
                                <option value="household">생활용품</option>
                                <option value="tools">공구/산업용품</option>
                                <option value="grocery">식품</option>
                                <option value="infant">유아</option>
                                <option value="pet">반려동물</option>
                                <option value="others">기타</option>
                                <option value="talent">재능</option>
                            </ItemCategorySelect>
                        </div>
                        <div>
                            <TitleSpan>상품명</TitleSpan>
                            <InputBox width={635} type="text" />
                        </div>
                        <div>
                            <TitleSpan>상태</TitleSpan>
                            {itemStates.map(item => (
                                <ConditionBtn
                                type="button"
                                key={item.key}
                                onClick={()=>handleItemState(item.key)}
                                $clicked={String(item.key===itemState)}
                                >
                                    {item.text}
                                </ConditionBtn>
                            ))}
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
                        {tickets.map(t => (
                            <ConditionBtn
                            type="button"
                            key={t.key}
                            onClick={()=>handleTicketNum(t.key)}
                            $clicked={String(t.key===ticketNum)}
                            >
                                {t.text}
                            </ConditionBtn>
                        ))}
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>장마당 케어</TitleSpan2>
                        {care.map(v => (
                            <ConditionBtn
                            type="button"
                            key={v.key}
                            onClick={()=>handleJcare(v.key)}
                            $clicked={String(v.key===jcare)}
                            >
                                {v.text}
                            </ConditionBtn>
                        ))}
                        {/* <ConditionBtn type="button">사용</ConditionBtn>
                        <ConditionBtn type="button">미사용</ConditionBtn> */}
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>최소 마감 티켓 개수</TitleSpan2>
                        <InputBox type="text" />
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>시작 일시</TitleSpan2>
                        <DatePickerBox>
                            <DatePicker
                                onKeyDown={(e)=>{e.preventDefault()}}
                                dateFormat="yyyy년 MM월 dd일"
                                dateFormatCalendar="yyyy년 MM월"
                                selected={startDate}
                                onChange={(date) => date && setStartDate(date)}
                            />
                        </DatePickerBox>
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>종료 일시</TitleSpan2>
                        <DatePickerBox>
                            <DatePicker
                                onKeyDown={(e)=>{e.preventDefault()}}
                                dateFormat="yyyy년 MM월 dd일"
                                dateFormatCalendar="yyyy년 MM월"
                                selected={endDate}
                                onChange={(date) => date && setEndDate(date)}
                            />
                        </DatePickerBox>
                    </SetConditionBox>
                    <SetConditionBox>
                        <TitleSpan2>배송비</TitleSpan2>
                        <InputBox type="text" />
                    </SetConditionBox>
                </SetConditionContainer>
            </div>
            <SubmitBtn type="submit" value={"업로드"} onClick={handleSubmit} />
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

const ImgFileLabel = styled.label`
    display: inline-block;
    position: relative;
    width: 261px;
    height: 261px;
    border-radius: 5px;
    border: 1px solid #8F8E94;
    background: #F5F5F5;
    &:hover {
        cursor: pointer;
    }
`
const ImgFileIcon = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const InputImgFile = styled.input`
    display: none;
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
    padding: 0 10px;
    background: url(${imgArrow}) no-repeat right 18px center;
    background-size: 16px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    &::-ms-expand {
        display: none;
    };
`

const ConditionBtn = styled.button<{$clicked:string}>`
    padding: 0 14px;
    height: 37px;
    border-radius: 11px;
    text-align: center;
    font-family: Pretendard;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 36.832px; /* 184.159% */
    margin-right: 13px;
    &:hover {
        cursor: pointer;
    };
    ${props => props.$clicked==="true" ?
        `
        border: 1px solid #C908FF;
        background: rgba(201, 8, 255, 0.20);
        color: #C908FF;
        ` :
        `
        border: 1px solid #8F8E94;
        background: transparent;
        color: #000;
        `
    };
`

const Textarea = styled.textarea`
    width: 635px;
    height: 197px;
    resize: none;
    font-size: 18px;
    font-family: Pretendard;
    font-style: normal;
    line-height: 18px;
    letter-spacing: -0.165px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 7px;
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
    box-sizing: border-box;
    padding: 0 10px;
    font-size: 18px;
    font-family: Pretendard;
    font-style: normal;
    line-height: 18px;
    letter-spacing: -0.165px;
`

const DatePickerBox = styled.div`
    .react-datepicker__input-container {
        width: 636px;
        height: 45px;
        border-radius: 7px;
        border: 1px solid #8F8E94;
        box-sizing: border-box;
        padding: 0 10px;
        display: flex;
    };

    input {
        width: 100%;
        font-size: 18px;
        font-family: Pretendard;
        font-style: normal;
        line-height: 18px;
        letter-spacing: -0.165px;
        border: none;
        outline: none;
        readOnly: true;
        caret-color: transparent;
    };
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
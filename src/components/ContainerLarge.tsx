import styled from "styled-components";
import media from "../styles/media";
import imgLogo from '../assets/searchBox/logo.png';
import icHamburger from '../assets/searchBox/icon-hamburger.svg';
import ticket from '../assets/searchBox/ticket.png';
import icNotice from '../assets/searchBox/icon-notice.svg';
import icSetting from '../assets/searchBox/icon-setting.svg';
import icSearch from '../assets/searchBox/icon-search.svg';
import icHeart from '../assets/searchBox/icon-heart.svg';
import icMyPage from '../assets/searchBox/icon-mypage.svg';
import chargeTicket from '../assets/searchBox/img-charge-ticket.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CategoryMenu from './CategoryMenu';

const ContainerLarge = ({isLoggedIn}:{isLoggedIn:boolean}) => {
    const navigate = useNavigate();
    const [isCatClicked, setIsCatClicked] = useState<boolean>(false);
    return (
        <Wrapper>
            <TopContainer>
                <LoginBtn state={String(isLoggedIn)}>
                    {isLoggedIn ? '로그아웃' : '로그인'}
                </LoginBtn>
                <LineDiv height={'27px'} margin={'0 32px'} />
                <SmallIconDiv>
                    <img src={icNotice} />
                    <IconTextDiv fontSize={'14px'}>알림</IconTextDiv>
                </SmallIconDiv>
                <LineDiv height={'27px'} margin={'0 32px'} />
                <SmallIconDiv>
                    <img src={icSetting} />
                    <IconTextDiv fontSize={'14px'}>설정</IconTextDiv>
                </SmallIconDiv>
            </TopContainer>
            <SearchBoxContainer>
                <LogoImg src={imgLogo} onClick={()=>navigate('/')} />
                <CategoryContainer>
                    <IconHamburgerDiv onClick={()=>setIsCatClicked(!isCatClicked)}>
                        <img src={icHamburger} width={24} />
                        <IconTextDiv fontSize={'14px'}>카테고리</IconTextDiv>
                    </IconHamburgerDiv>
                    <CategoryMenu clicked={isCatClicked} />
                </CategoryContainer>
                <SearchBoxDiv>
                    <TicketImg src={ticket} width={88} />
                    <SearchInput type="text" />
                    <SearchIcon src={icSearch} />
                </SearchBoxDiv>
                <IconDiv>
                    <img src={icHeart} width={24} />
                    <IconTextDiv fontSize={'13px'}>관심</IconTextDiv>
                </IconDiv>
                <IconDiv>
                    <img src={icMyPage} width={24} />
                    <IconTextDiv fontSize={'13px'}>마이페이지</IconTextDiv>
                </IconDiv>
                <IconDiv>
                    <img src={chargeTicket} width={28.952} />
                    <IconTextDiv fontSize={'13px'}>충전/환전</IconTextDiv>
                </IconDiv>
            </SearchBoxContainer>
        </Wrapper>
    );
};

export default ContainerLarge;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 188px;
    border-bottom: 1px solid #E4E4E4;
    // background-color: green;
    ${media.medium`
        display: none;
    `}
`

const TopContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 34px 26px 0;
`

const LoginBtn = styled.button<{state:string}>`
    width: 99.355px;
    height: 26.644px;
    border-radius: 40px;
    ${props => props.state==='true' ?
        `border: 1px solid #8F8E94;
        background-color: transparent;
        color: #8F8E94;`
        :
        `border: 1px solid #C908FF;
        background: rgba(201, 8, 255, 0.20);
        color: #C908FF;`
    }
    font-family: Pretendard;
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: -0.165px;
    cursor: pointer;
`

const IconTextDiv = styled.div<{fontSize:string, color?:string, fontWeight?:string}>`
    font-size: ${props => props.fontSize};
    color: ${props => props.color || '#8F8E94'};
    text-align: center;
    font-family: Pretendard;
    font-style: normal;
    font-weight: ${props => props.fontWeight || '600'};
    line-height: 18px;
    letter-spacing: -0.165px;
`

const SearchBoxContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LogoImg = styled.img`
    width: 133px;
    height: 64px;
    margin-right: 39px;
    &:hover {
        cursor: pointer;
    }
    ${media.medium`
        width: 98px;
        height: 46.518px;
    `}
    ${media.small`
        width: 71.62px;
        height: 33.995px;
    `}
`

const CategoryContainer = styled.div`
    position: relative;
`

const SearchBoxDiv = styled.div`
    position: relative;
    width: 560px;
    height: 42px;
    border-radius: 51px;
    border: 2px solid #8F8E94;
    box-sizing: border-box;
    padding: 3px 20px;
    display: flex;
    margin: 0 26px 0 0;
`

const TicketImg = styled.img`
    position: absolute;
    bottom: 105%;
    left: 50%;
    transform: translateX(-50%);
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 18px;
    font-family: Pretendard;
    font-style: normal;
    line-height: 18px;
    letter-spacing: -0.165px;
`

const SearchIcon = styled.img`
    cursor: pointer;
    width: 20.975px;
`

const SmallIconDiv = styled.div`
    display: flex;
    column-gap: 11px;
    align-items: center;
    justify-content: space-evenly;
    height: 65px;
    cursor: pointer;
`

const IconDiv = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    align-items: center;
    justify-content: space-evenly;
    height: 56px;
    min-width: 61px;
    margin: 0 25px 0 0;
    cursor: pointer;
`

const IconHamburgerDiv = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    min-width: 61px;
    margin: 0 25px 0 0;
    cursor: pointer;
`

// const UploadBtn = styled.button`
//     color: white;
//     background-color: #C908FF;
//     border-radius: 15px;
//     border: none;
//     width: 98.897px;
//     height: 99px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-evenly;
//     padding: 10px 10px 8px 11px;
//     cursor: pointer;
//     margin-left: 13px;
// `

const LineDiv = styled.div<{height:string, margin:string}>`
    width: 1px;
    height: ${props => props.height};
    background: #8F8E94;
    margin: ${props => props.margin};
`
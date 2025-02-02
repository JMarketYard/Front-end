import styled from "styled-components";
import media from "../styles/media";
import imgLogo from '../assets/logo.png';
import icHamburger from '../assets/searchBox/icon-hamburger.svg';
import ticket from '../assets/ticketLogo.png';
import { ReactComponent as IcNotice } from '../assets/searchBox/icon-notice.svg';
import icSetting from '../assets/searchBox/icon-setting.svg';
import icSearch from '../assets/searchBox/icon-search.svg';
import icHeart from '../assets/searchBox/icon-heart.svg';
import icMyPage from '../assets/searchBox/icon-mypage.svg';
import icUpload from '../assets/searchBox/icon-upload.svg';
import imgTicket from '../assets/ticket.svg';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import CategoryMenu from './CategoryMenu';
import { useModalContext } from './Modal/context/ModalContext';
import SplashModal from '../pages/login/components/SplashModal';
import imgVector from '../assets/Vector.png';
import { ReactComponent as IcList } from '../assets/icList.svg';
import icDel from '../assets/icDel.svg';

const recentKeywords = ['애플워치','애플워치','애플워치','애플워치',
    '애플워치','애플워치','애플워치','애플워치','애플워치','애플워치',
];

const ContainerLarge = ({isLoggedIn}:{isLoggedIn:boolean}) => {
    const navigate = useNavigate();
    const [isCatClicked, setIsCatClicked] = useState<boolean>(false);
    const { openModal } = useModalContext();
    const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e:MouseEvent) => {
        const currentSearchRef = searchRef.current;
        if (currentSearchRef && !currentSearchRef.contains(e.target as Node)) {
            setIsSearchClicked(false);
        }
    }

    const handleOpenModal = () => {
        openModal(({ onClose }) => <SplashModal onClose={onClose} />);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        console.log('start');
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [searchRef.current]);
    
    return (
        <Wrapper>
            <TopContainer>
                <LoginBtn onClick={handleOpenModal} state={String(isLoggedIn)}>
                    {isLoggedIn ? '로그아웃' : '로그인'}
                </LoginBtn>
                <LineDiv height={'27px'} margin={'0 32px'} />
                <SmallIconDiv>
                    <IcNotice width={18.65} height={21.32} fill={"#8F8E94"} />
                    <IconTextDiv fontSize={'14px'}>알림</IconTextDiv>
                </SmallIconDiv>
                <LineDiv height={'27px'} margin={'0 32px'} />
                <SmallIconDiv>
                    <img src={icSetting} width={22} />
                    <IconTextDiv fontSize={'14px'}>설정</IconTextDiv>
                </SmallIconDiv>
            </TopContainer>
            <SearchBoxContainer>
                <LogoImg src={imgLogo} onClick={()=>navigate('/')} />
                <CategoryContainer>
                    <IconHamburgerDiv onClick={()=>setIsCatClicked(!isCatClicked)}>
                        <img src={icHamburger} width={22} />
                        <IconTextDiv fontSize={'10px'}>카테고리</IconTextDiv>
                    </IconHamburgerDiv>
                    <CategoryMenu clicked={isCatClicked} />
                </CategoryContainer>
                <SearchBoxDiv>
                    <TicketImg src={ticket} width={88} />
                    <SearchInput
                    type="text"
                    onClick={()=>setIsSearchClicked(true)} />
                    <SearchIcon src={icSearch} />
                    <KeywordContainer
                    ref={searchRef}
                    $show={String(isSearchClicked)}
                    >
                        <KeywordBox>
                            <KeywordTitle>
                                <img src={imgVector} width={15} height={15} />
                                <Span>최근 검색</Span>
                            </KeywordTitle>
                            <RecentKeywordsBox>
                            {recentKeywords.map((v,_) => (
                                <RecentKeyword key={_}>
                                    {v}
                                    <DelImg src={icDel} width={9.096} height={8.901} />
                                </RecentKeyword>
                            ))}
                            </RecentKeywordsBox>
                        </KeywordBox>
                        <KeywordBox>
                            <KeywordTitle>
                                <img src={imgVector} width={15} height={15} />
                                <Span>현재 인기있는 검색어</Span>
                            </KeywordTitle>
                            <HotKeywordsBox>
                                {recentKeywords.map((v,_) => (
                                    <HotKeyword key={_}>
                                        <IcList width={9} height={9} fill={"rgba(201, 8, 255, 0.20)"} />
                                        {v}
                                    </HotKeyword>
                                ))}
                            </HotKeywordsBox>
                        </KeywordBox>
                    </KeywordContainer>
                </SearchBoxDiv>
                <IconDiv>
                    <img src={icHeart} width={22} />
                    <IconTextDiv fontSize={'10px'}>관심</IconTextDiv>
                </IconDiv>
                <IconDiv>
                    <img src={icMyPage} width={22} />
                    <IconTextDiv fontSize={'10px'}>마이페이지</IconTextDiv>
                </IconDiv>
                <IconDiv>
                    <Img src={imgTicket} height={18} />
                    <IconTextDiv fontSize={'10px'}>충전/환전</IconTextDiv>
                </IconDiv>
                <UploadBtn onClick={()=>navigate('/raffle-upload')}>
                    <img src={icUpload} width={17} />
                    래플 업로드
                </UploadBtn>
            </SearchBoxContainer>
        </Wrapper>
    );
};

export default ContainerLarge;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 188px;
    padding: 0 25px;
    box-sizing: border-box;
    z-index: 100;
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
    margin-bottom: 5px;
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
    border: 1.5px solid #C908FF;
    box-sizing: border-box;
    padding: 3px 20px;
    display: flex;
    margin: 0 26px 0 0;
`

const Img = styled.img`
    margin: 3px 0;
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

const KeywordContainer = styled.div<{$show:string}>`
    width: 560px;
    height: 386px;
    border-radius: 18px;
    border: 1px solid #E4E4E4;
    background-color: #FFF;
    position: absolute;
    left: 0;
    top: 120%;
    padding: 38px 43px 5px 43px;
    box-sizing: border-box;
    display: ${props => props.$show==='true'
        ? 'box'
        : 'none'
    };
`
const KeywordBox = styled.div`
    box-sizing: border-box;
    min-height: 129px;
    padding-bottom: 37px;
`
const KeywordTitle = styled.div`
    display: flex;
    align-items: baseline;
`
const Span = styled.span`
    padding-left: 18px;
    padding-bottom: 19px;
    color: #000;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 128.571% */
    letter-spacing: -0.165px;
`
const RecentKeywordsBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    row-gap: 17px;
    column-gap: 16px;
`
const RecentKeyword = styled.div`
    width: 81px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    gap: 9px;
    padding: 3px 7px;
    border-radius: 12px;
    background: #E4E4E4;
    box-sizing: border-box;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 36.832px; /* 306.932% */

    &:hover {
        cursor: default;
    }
`
const DelImg = styled.img`
    &:hover {
        cursor: pointer;
    }
`
const HotKeywordsBox = styled.div`
    height: 148px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 17px;
`
const HotKeyword = styled.div`
    width: 228px;
    display: flex;
    align-items: center;
    gap: 17px;

    color: #000;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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
    height: 45px;
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
    height: 46px;
    min-width: 61px;
    margin: 0 25px 0 0;
    cursor: pointer;
`

const UploadBtn = styled.button`
    color: white;
    text-align: center;
    font-family: Pretendard;
    font-size: 8px;
    font-style: normal;
    font-weight: 600;
    line-height: 18px; /* 225% */
    letter-spacing: -0.165px;
    box-sizing: border-box;
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    background-color: #C908FF;
    border-radius: 9px;
    border: 1px solid #C908FF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding-top: 9px 0 3px 0;
    margin-bottom: 8px;
    cursor: pointer;
`

const LineDiv = styled.div<{height:string, margin:string}>`
    width: 1px;
    height: ${props => props.height};
    background: #8F8E94;
    margin: ${props => props.margin};
`
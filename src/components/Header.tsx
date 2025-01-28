import styled from 'styled-components';
import imgLogo from '../assets/logo.png';
import icHamburger from '../assets/searchBox/icon-hamburger.svg';
import icNotice from '../assets/searchBox/icon-notice.svg';
import icSearch from '../assets/searchBox/icon-search.svg';
import icHeart from '../assets/searchBox/icon-heart.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import media from '../styles/media';
import ContainerLarge from './ContainerLarge';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    return (
        <>
            <ContainerLarge isLoggedIn={isLoggedIn} />
            <ContainerSmall>
                <TopLeft>
                    <img src={icHamburger} width={14} />
                    <SearchBox>
                        <SearchInput />
                        <SearchIcon src={icSearch} />
                    </SearchBox>
                </TopLeft>
                <TopCenter>
                    <LogoImg src={imgLogo} onClick={()=>navigate('/')} />
                </TopCenter>
                <TopRight>
                    <img src={icNotice} width={16} />
                    <img src={icHeart} width={16} />
                </TopRight>
            </ContainerSmall>
            <Line />
        </>
    );
}

export default Header;

const ContainerSmall = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #E4E4E4;
    box-sizing: border-box;
    position: relative;
    ${media.large`
        display: none;
    `}
    ${media.medium`
        height: 101px;
        padding: 36.91px 12px 17.57px 12px;
    `}
    ${media.small`
        height:81px;
        padding: 37px 33px 10px 35px;
    `}
`

const TopLeft = styled.div`
    display: flex;
`
const TopCenter = styled.div`
    text-align: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: 553px) {
        left: 268px;
    };
    ${media.small`
        left: 50%;
        transform: translateX(-50%)
    `}
`;
const TopRight = styled.div`
    display: flex;
    column-gap: 20px;
    ${media.small`
        column-gap: 19px
    `}
`

const SearchBox = styled.div`
    width: 123px;
    height: 33px;
    border-radius: 49px;
    border: 1.3px solid #C908FF;
    padding: 9px 15px 9px 15px;
    margin-left: 21px;
    box-sizing: border-box;
    display: flex;
    ${media.small`
        display: none;
    `}
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
    width: 14.205px;
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

const Line = styled.div`
    width: 100%;
    height: 1px;
    background: #E4E4E4;
`